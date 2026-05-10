import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Hotel, Utensils, Check, ChevronRight, ChevronLeft, 
  Calendar, Users, Clock, Star, MapPin, ArrowRight, 
  ShoppingCart, Trash2, CreditCard, Wallet, AlertCircle,
  Phone, Mail, User, MessageCircle
} from 'lucide-react';
import { mockPackages, mockVehicles } from '../data/mockData';

const BookingPage = () => {
  const navigate = useNavigate();
  const { destination } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    travelers: 1,
    specialRequests: ''
  });

  // Mock data for additional services (same as in DestinationDetails)
  const foodItems = [
    { id: 1, title: 'Nepali Thali', cuisine: 'Traditional Nepalese', price: 450, img: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&q=80&w=800', desc: 'Authentic multi-course platter.' },
    { id: 2, title: 'Steamed Momos', cuisine: 'Local Himalayan', price: 220, img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800', desc: 'Juicy hand-folded dumplings.' },
    { id: 3, title: 'Mountain Cafe Specials', cuisine: 'Continental Fusion', price: 350, img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', desc: 'Artisanal coffee and pastries.' },
    { id: 4, title: 'Thukpa Noodle Soup', cuisine: 'Tibetan Delicacy', price: 280, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', desc: 'Hearty noodle soup.' },
  ];

  const hotelItems = [
    { id: 1, title: 'Deluxe Room', rating: 4.8, price: 4500, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', amenities: ['King Bed', 'Free Wi-Fi', 'Garden Balcony'], desc: 'Elegant rooms with garden views.' },
    { id: 2, title: 'Mountain View Suite', rating: 4.9, price: 7500, img: 'https://images.unsplash.com/photo-1582719478250-c894e4dc240e?auto=format&fit=crop&q=80&w=800', amenities: ['Panoramic Deck', 'Smart TV', 'Spa Tub'], desc: 'Breathtaking Himalayan views.' },
    { id: 3, title: 'Executive Luxury Suite', rating: 5.0, price: 12000, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', amenities: ['Butler Service', 'Plunge Pool', 'Private Lounge'], desc: 'Royal living experience.' },
  ];

  // Get the package info
  const mainPackage = mockPackages.find(p => p.tag.toLowerCase() === destination?.toLowerCase()) || mockPackages[0];

  const steps = [
    { number: 1, title: 'Select Vehicle', icon: Car },
    { number: 2, title: 'Hotel (Optional)', icon: Hotel },
    { number: 3, title: 'Food (Optional)', icon: Utensils },
    { number: 4, title: 'Your Details', icon: User },
    { number: 5, title: 'Confirm', icon: Check }
  ];

  const calculateTotal = () => {
    let total = 0;
    if (selectedVehicle) total += selectedVehicle.pricePerKm * 200; // Assume 200km travel
    if (selectedHotel) total += selectedHotel.price * formData.travelers;
    selectedFoods.forEach(food => total += food.price * formData.travelers);
    return total;
  };

  const handleFoodToggle = (food) => {
    setSelectedFoods(prev => 
      prev.find(f => f.id === food.id) 
        ? prev.filter(f => f.id !== food.id)
        : [...prev, food]
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedVehicle) {
      alert('Please select a vehicle to continue');
      return;
    }
    if (currentStep === 4) {
      // Validate form
      if (!formData.name || !formData.phone || !formData.travelDate) {
        alert('Please fill all required fields');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = () => {
    const bookingDetails = {
      package: mainPackage.title,
      vehicle: selectedVehicle,
      hotel: selectedHotel,
      foods: selectedFoods,
      total: calculateTotal(),
      customer: formData,
      bookingDate: new Date().toISOString()
    };
    
    // Store in localStorage for demo
    localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
    
    // Redirect to WhatsApp with booking summary
    const message = `*NEW BOOKING REQUEST*%0A%0A*Package:* ${mainPackage.title}%0A*Travel Date:* ${formData.travelDate}%0A*Travelers:* ${formData.travelers}%0A%0A*Selected Services:*%0A${selectedVehicle ? `🚗 Vehicle: ${selectedVehicle.name} - ₹${selectedVehicle.pricePerKm}/km` : ''}%0A${selectedHotel ? `🏨 Hotel: ${selectedHotel.title} - ₹${selectedHotel.price}/night` : ''}%0A${selectedFoods.length > 0 ? `🍽️ Food: ${selectedFoods.map(f => f.title).join(', ')}` : ''}%0A%0A*Total Amount:* ₹${calculateTotal().toLocaleString()}%0A%0A*Customer Details:*%0A👤 ${formData.name}%0A📞 ${formData.phone}%0A📧 ${formData.email || 'Not provided'}%0A%0A*Special Requests:* ${formData.specialRequests || 'None'}%0A%0APlease confirm availability.`;
    
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    navigate('/booking-success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#0A0A0F] dark:to-[#0F0F15] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0F] dark:text-white mb-4">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Journey</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {mainPackage.title} • Flexible booking with no hidden charges
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${currentStep >= step.number 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-[#0A0A0F] shadow-lg shadow-amber-500/30' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500'
                  }
                  ${currentStep === step.number ? 'ring-4 ring-amber-500/30 scale-110' : ''}
                `}>
                  {currentStep > step.number ? <Check size={20} /> : <step.icon size={18} />}
                </div>
                <span className="text-xs font-medium mt-2 text-gray-600 dark:text-gray-400 hidden sm:block">{step.title}</span>
                {idx < steps.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-0.5 mx-2 ${currentStep > step.number ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-[#14141C] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden">
          
          {/* STEP 1: VEHICLE SELECTION */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-[#0A0A0F] dark:text-white mb-6 flex items-center">
                <Car className="mr-3 text-amber-500" size={28} />
                Select Your Vehicle
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Choose from our premium fleet. All vehicles come with professional chauffeurs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`
                      cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden
                      ${selectedVehicle?.id === vehicle.id 
                        ? 'border-amber-500 shadow-lg shadow-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5' 
                        : 'border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700'
                      }
                    `}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                      {selectedVehicle?.id === vehicle.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-[#0A0A0F]" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[#0A0A0F] dark:text-white">{vehicle.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{vehicle.category}</span>
                        <span>{vehicle.seats} Seats</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Per km</span>
                          <span className="font-bold text-amber-500">₹{vehicle.pricePerKm}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600 dark:text-gray-400">Extra hour</span>
                          <span className="font-bold text-amber-500">₹{vehicle.extraHours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: HOTEL SELECTION (Optional) */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-[#0A0A0F] dark:text-white mb-6 flex items-center">
                <Hotel className="mr-3 text-amber-500" size={28} />
                Select Hotel (Optional)
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Skip this if you have your own accommodation arranged.
              </p>
              
              <button
                onClick={() => setSelectedHotel(null)}
                className="mb-6 text-sm text-amber-500 hover:text-amber-600 font-medium flex items-center space-x-1"
              >
                <span>✕</span>
                <span>Skip hotel selection</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelItems.map(hotel => (
                  <div
                    key={hotel.id}
                    onClick={() => setSelectedHotel(hotel)}
                    className={`
                      cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden
                      ${selectedHotel?.id === hotel.id 
                        ? 'border-amber-500 shadow-lg shadow-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5' 
                        : 'border-gray-200 dark:border-gray-800 hover:border-amber-300'
                      }
                    `}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={hotel.img} alt={hotel.title} className="w-full h-full object-cover" />
                      {selectedHotel?.id === hotel.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-[#0A0A0F]" />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs ml-1">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[#0A0A0F] dark:text-white">{hotel.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{hotel.desc}</p>
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Per night</span>
                          <span className="font-bold text-amber-500 text-lg">₹{hotel.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hotel.amenities.slice(0, 3).map(amenity => (
                            <span key={amenity} className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FOOD SELECTION (Optional) */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-[#0A0A0F] dark:text-white mb-6 flex items-center">
                <Utensils className="mr-3 text-amber-500" size={28} />
                Select Food Experiences (Optional)
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose from our curated local dining experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foodItems.map(food => (
                  <div
                    key={food.id}
                    onClick={() => handleFoodToggle(food)}
                    className={`
                      cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden flex
                      ${selectedFoods.find(f => f.id === food.id)
                        ? 'border-amber-500 shadow-lg shadow-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5'
                        : 'border-gray-200 dark:border-gray-800 hover:border-amber-300'
                      }
                    `}
                  >
                    <div className="w-28 h-28 flex-shrink-0">
                      <img src={food.img} alt={food.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#0A0A0F] dark:text-white">{food.title}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{food.cuisine}</p>
                        </div>
                        {selectedFoods.find(f => f.id === food.id) && (
                          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-[#0A0A0F]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{food.desc}</p>
                      <div className="mt-2 font-bold text-amber-500 text-sm">₹{food.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedFoods.length > 0 && (
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Selected: {selectedFoods.map(f => f.title).join(', ')}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-[#0A0A0F] dark:text-white mb-6 flex items-center">
                <User className="mr-3 text-amber-500" size={28} />
                Your Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A24] text-[#0A0A0F] dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A24] text-[#0A0A0F] dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A24] text-[#0A0A0F] dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Travel Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A24] text-[#0A0A0F] dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A24] text-[#0A0A0F] dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A24] text-[#0A0A0F] dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="Any specific requirements or preferences..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: CONFIRMATION */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-[#0A0A0F] dark:text-white mb-6 flex items-center">
                <Check className="mr-3 text-amber-500" size={28} />
                Confirm Your Booking
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking Summary */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 dark:bg-[#1A1A24] rounded-xl p-5">
                    <h3 className="font-bold text-lg text-[#0A0A0F] dark:text-white mb-4">Package Details</h3>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Destination</span>
                      <span className="font-medium text-[#0A0A0F] dark:text-white">{mainPackage.title}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Travel Date</span>
                      <span className="font-medium text-[#0A0A0F] dark:text-white">{formData.travelDate || 'To be confirmed'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Travelers</span>
                      <span className="font-medium text-[#0A0A0F] dark:text-white">{formData.travelers} person(s)</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1A24] rounded-xl p-5">
                    <h3 className="font-bold text-lg text-[#0A0A0F] dark:text-white mb-4">Selected Services</h3>
                    
                    {selectedVehicle && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">🚗 Vehicle</span>
                          <p className="text-sm font-medium text-[#0A0A0F] dark:text-white">{selectedVehicle.name}</p>
                        </div>
                        <span className="font-bold text-amber-500">₹{selectedVehicle.pricePerKm}/km</span>
                      </div>
                    )}
                    
                    {selectedHotel && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">🏨 Hotel</span>
                          <p className="text-sm font-medium text-[#0A0A0F] dark:text-white">{selectedHotel.title}</p>
                        </div>
                        <span className="font-bold text-amber-500">₹{selectedHotel.price}/night</span>
                      </div>
                    )}
                    
                    {selectedFoods.length > 0 && (
                      <div className="py-2 border-b border-gray-200 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-400 block mb-2">🍽️ Food Experiences</span>
                        {selectedFoods.map(food => (
                          <div key={food.id} className="flex justify-between items-center text-sm py-1">
                            <span>{food.title}</span>
                            <span className="font-medium">₹{food.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {!selectedVehicle && !selectedHotel && selectedFoods.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">No services selected</p>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1A24] rounded-xl p-5">
                    <h3 className="font-bold text-lg text-[#0A0A0F] dark:text-white mb-4">Customer Details</h3>
                    <div className="space-y-2">
                      <p className="flex items-center space-x-2 text-sm">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{formData.name || 'Not provided'}</span>
                      </p>
                      <p className="flex items-center space-x-2 text-sm">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{formData.phone || 'Not provided'}</span>
                      </p>
                      <p className="flex items-center space-x-2 text-sm">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{formData.email || 'Not provided'}</span>
                      </p>
                      {formData.specialRequests && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                          <span className="font-medium">Special Requests:</span> {formData.specialRequests}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Summary & Action */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-400 rounded-xl p-6 sticky top-28">
                    <h3 className="font-bold text-xl text-[#0A0A0F] mb-4">Price Summary</h3>
                    
                    <div className="space-y-2 text-[#0A0A0F]/80">
                      {selectedVehicle && (
                        <div className="flex justify-between text-sm">
                          <span>Vehicle (est. 200km)</span>
                          <span>₹{(selectedVehicle.pricePerKm * 200).toLocaleString()}</span>
                        </div>
                      )}
                      {selectedHotel && (
                        <div className="flex justify-between text-sm">
                          <span>Hotel ({formData.travelers} night)</span>
                          <span>₹{(selectedHotel.price * formData.travelers).toLocaleString()}</span>
                        </div>
                      )}
                      {selectedFoods.map(food => (
                        <div key={food.id} className="flex justify-between text-sm">
                          <span>{food.title}</span>
                          <span>₹{(food.price * formData.travelers).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#0A0A0F]/20 my-4 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#0A0A0F]">Total Amount</span>
                        <span className="text-2xl font-bold text-[#0A0A0F]">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-[#0A0A0F]/60 mt-1">*Excludes GST and toll charges</p>
                    </div>

                    <button
                      onClick={handleConfirmBooking}
                      className="w-full bg-[#0A0A0F] hover:bg-[#1A1A24] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 mt-4"
                    >
                      <MessageCircle size={18} />
                      <span>Confirm & Send to WhatsApp</span>
                    </button>
                    
                    <p className="text-xs text-center text-[#0A0A0F]/60 mt-4">
                      You'll be redirected to WhatsApp to confirm your booking
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-6 flex justify-between">
            <button
              onClick={handleBack}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center space-x-2
                ${currentStep === 1 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </button>
            
            {currentStep < 5 && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-400 text-[#0A0A0F] hover:shadow-lg hover:shadow-amber-500/30"
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Current Selection Summary */}
        <div className="mt-8 bg-white dark:bg-[#14141C] rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Current Selection:</span>
              {selectedVehicle ? (
                <span className="text-sm font-medium text-[#0A0A0F] dark:text-white">🚗 {selectedVehicle.name}</span>
              ) : (
                <span className="text-sm text-gray-400">No vehicle selected</span>
              )}
              {selectedHotel && (
                <span className="text-sm font-medium text-[#0A0A0F] dark:text-white">🏨 {selectedHotel.title}</span>
              )}
              {selectedFoods.length > 0 && (
                <span className="text-sm font-medium text-[#0A0A0F] dark:text-white">🍽️ {selectedFoods.length} item(s)</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Estimate:</span>
              <span className="ml-2 text-lg font-bold text-amber-500">₹{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;