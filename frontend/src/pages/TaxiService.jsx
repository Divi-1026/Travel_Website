import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Car, Clock, Users, ArrowRight, X, ChevronRight, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useBookingStore from '../store/useBookingStore';
import api from '../api/axios';

const bookingSchema = z.object({
  pickup: z.string().min(2, { message: "Pickup location is required" }),
  drop: z.string().min(2, { message: "Drop destination is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  passengers: z.string().min(1, { message: "Number of passengers is required" }),
  distance: z.string().optional(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  specialRequests: z.string().optional()
});

const TaxiService = () => {
  const { setEstimatedFare } = useBookingStore();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [calculatedFare, setCalculatedFare] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const fetchedRef = useRef(false);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickup: '',
      drop: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      passengers: '1-2',
      distance: '',
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  });

  const formValues = watch();

  // Fetch vehicles - ONLY ONCE when component mounts
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/payment/vehicles', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000
        });
        
        if (response.data.success) {
          setVehicles(response.data.vehicles || []);
          // Preload images
          (response.data.vehicles || []).forEach(vehicle => {
            if (vehicle.image) {
              const img = new Image();
              img.src = vehicle.image;
            }
          });
        }
      } catch (err) {
        console.error('Error:', err);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, []);

  const handleBookNow = useCallback((vehicle) => {
    setSelectedVehicle(vehicle);
    setShowBookingModal(true);
    setCalculatedFare(null);
  }, []);

  const calculateFare = useCallback(async () => {
    const distance = parseFloat(formValues.distance);
    if (!distance || distance <= 0 || !selectedVehicle) {
      setCalculatedFare(null);
      return;
    }

    setIsCalculating(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/api/payment/calculate-fare', {
        vehicleId: selectedVehicle._id,
        distance: distance,
        duration: Math.ceil(distance / 40),
        travelDate: formValues.date ? new Date(`${formValues.date}T${formValues.time || '10:00'}`).toISOString() : new Date().toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 8000
      });
      
      if (response.data.success) {
        setCalculatedFare(response.data.breakdown);
        setEstimatedFare(response.data.breakdown.totalAmount);
      }
    } catch (error) {
      const baseFare = distance * (selectedVehicle.pricePerKm || 12);
      const gst = baseFare * 0.05;
      setCalculatedFare({
        distanceCharge: baseFare,
        gst: gst,
        totalAmount: baseFare + gst
      });
      setEstimatedFare(baseFare + gst);
    } finally {
      setIsCalculating(false);
    }
  }, [formValues.distance, formValues.date, formValues.time, selectedVehicle, setEstimatedFare]);

  // Debounced fare calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formValues.distance && parseFloat(formValues.distance) > 0 && selectedVehicle) {
        calculateFare();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [formValues.distance, selectedVehicle, calculateFare]);

  const handleFinalBooking = useCallback(async (data) => {
    if (!calculatedFare) {
      alert("Please enter distance to calculate fare");
      return;
    }

    setIsProcessing(true);
    
    const dateTime = new Date(`${data.date}T${data.time}`);
    const passengerRange = data.passengers.split('-');
    const maxPassengers = parseInt(passengerRange[1]) || parseInt(passengerRange[0]) || 1;
    const distanceNum = parseFloat(data.distance);
    const duration = Math.ceil(distanceNum / 40);
    
    const bookingData = {
      vehicleId: selectedVehicle._id,
      pickupLocation: data.pickup,
      dropLocation: data.drop,
      travelDate: dateTime.toISOString(),
      distance: distanceNum,
      duration: duration,
      numberOfTravelers: maxPassengers,
      specialRequests: data.specialRequests || "",
      totalAmount: calculatedFare.totalAmount,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone
    };

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/api/payment/create-booking', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000
      });
      
      if (response.data.success && response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.response?.data?.message || 'Failed to create booking. Please try again.');
      setIsProcessing(false);
    }
  }, [calculatedFare, selectedVehicle]);

  // Vehicle Card Component - Pure component, no re-renders on scroll
  const VehicleCard = useMemo(() => ({ vehicle, index }) => {
    const [imgError, setImgError] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl flex flex-col group border border-gray-100 dark:border-white/10 transition-all duration-300 cursor-pointer will-change-transform"
        onClick={() => handleBookNow(vehicle)}
      >
        <div className="relative h-52 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">{vehicle.category}</span>
            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{vehicle.seats} SEATS</span>
          </div>
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={imgError ? 'https://placehold.co/600x400/e2e8f0/64748b?text=Car' : (vehicle.image || 'https://placehold.co/600x400/e2e8f0/64748b?text=Car')} 
            alt={vehicle.name} 
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(true);
            }}
          />
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{vehicle.name}</h3>
          
          <div className="space-y-2 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Per Km</span>
              <span className="text-lg font-bold text-amber-500">₹{vehicle.pricePerKm}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Per Hour</span>
              <span className="text-lg font-bold text-amber-500">₹{vehicle.pricePerHour}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Night Charge</span>
              <span className="text-lg font-bold text-amber-500">₹{vehicle.nightCharge}</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2.5 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-md">
            <span>BOOK NOW</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    );
  }, [handleBookNow]);

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-white/10 animate-pulse">
      <div className="h-52 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-5">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section Skeleton */}
        <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-16 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-3 animate-pulse"></div>
              <div className="h-12 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
              <div className="h-5 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Vehicles Skeleton */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-16 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold tracking-wide uppercase mb-3 block">PREMIUM FLEET</span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your <span className="text-amber-500">Perfect Ride</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our premium fleet of vehicles. Professional drivers, clean cars, and best prices.
            </p>
          </div>
        </div>
      </section>

      {/* Features Bar - Sticky */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm">
            {[
              { icon: Shield, text: "Safe & Secure" },
              { icon: Clock, text: "On-Time" },
              { icon: Wifi, text: "Free WiFi" },
              { icon: Coffee, text: "Complimentary Water" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                <feature.icon className="w-3.5 h-3.5 text-amber-500" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Vehicles Section - Static, no scroll loading */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <Car size={20} />
            <span className="font-semibold text-gray-900 dark:text-white">Our Premium Fleet</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Available <span className="text-amber-500">Vehicles</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{vehicles.length} cars available</p>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No vehicles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#1E293B] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-700 px-5 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <Car size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Book {selectedVehicle.name}</h2>
                    <p className="text-xs text-gray-500">Fill in your trip details</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5">
                {/* Selected Vehicle Info */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-5 flex items-center gap-3">
                  <img 
                    src={selectedVehicle.image || 'https://placehold.co/80x80/e2e8f0/64748b?text=Car'} 
                    alt={selectedVehicle.name} 
                    className="w-14 h-14 rounded-lg object-cover"
                    loading="eager"
                    onError={(e) => { e.target.src = 'https://placehold.co/80x80/e2e8f0/64748b?text=Car'; }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selectedVehicle.name}</h3>
                    <p className="text-xs text-gray-500">{selectedVehicle.category} • {selectedVehicle.seats} Seats</p>
                    <p className="text-xs text-amber-500">₹{selectedVehicle.pricePerKm}/km + ₹{selectedVehicle.pricePerHour}/hr</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(handleFinalBooking)} className="space-y-3">
                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup *</label>
                      <input
                        {...register('pickup')}
                        type="text"
                        placeholder="Enter pickup"
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      />
                      {errors.pickup && <p className="text-red-500 text-xs mt-1">{errors.pickup.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Drop *</label>
                      <input
                        {...register('drop')}
                        type="text"
                        placeholder="Enter destination"
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      />
                      {errors.drop && <p className="text-red-500 text-xs mt-1">{errors.drop.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Distance (km) *</label>
                    <input
                      {...register('distance')}
                      type="number"
                      step="0.1"
                      placeholder="Enter distance"
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
                      <input
                        {...register('date')}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Time *</label>
                      <input
                        {...register('time')}
                        type="time"
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Passengers *</label>
                    <select
                      {...register('passengers')}
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
                    >
                      <option value="1-2">1-2 Passengers</option>
                      <option value="3-4">3-4 Passengers</option>
                      <option value="5-6">5-6 Passengers</option>
                      <option value="7+">7+ Passengers</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Full name"
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  {/* Fare Display */}
                  {isCalculating && (
                    <div className="text-center py-2">
                      <div className="inline-block w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs text-gray-500 mt-1">Calculating...</p>
                    </div>
                  )}

                  {calculatedFare && !isCalculating && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Fare Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Distance Charge</span>
                          <span className="font-medium">₹{Math.round(calculatedFare.distanceCharge)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">GST (5%)</span>
                          <span className="font-medium">₹{Math.round(calculatedFare.gst)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-amber-200 dark:border-amber-700/30 font-bold">
                          <span>Total</span>
                          <span className="text-amber-600 text-base">₹{Math.round(calculatedFare.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || !calculatedFare}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        <span>Proceed to Payment</span>
                        <ChevronRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add missing icon imports
const Shield = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const Wifi = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
const Coffee = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;

export default TaxiService;