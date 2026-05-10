import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Car, Search, Clock, Users, MessageCircle, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useBookingStore from '../store/useBookingStore';
import { mockVehicles } from '../data/mockData';

const schema = z.object({
  pickup: z.string().min(2, { message: "Pickup location is required" }),
  drop: z.string().min(2, { message: "Drop destination is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  vehicle: z.string(),
  passengers: z.string()
});

const TaxiService = () => {
  const { searchDetails, updateSearchDetails, setEstimatedFare, estimatedFare } = useBookingStore();
  const [isEstimating, setIsEstimating] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      pickup: searchDetails.pickup || '',
      drop: searchDetails.drop || '',
      date: searchDetails.date || '',
      time: searchDetails.time || '',
      vehicle: searchDetails.vehicle || 'Sedan',
      passengers: searchDetails.passengers || '1-2'
    }
  });

  // Keep Zod form in sync if searchDetails change externally
  useEffect(() => {
    setValue('pickup', searchDetails.pickup);
    setValue('drop', searchDetails.drop);
    setValue('date', searchDetails.date);
  }, [searchDetails, setValue]);

  const onSubmit = (data) => {
    updateSearchDetails(data);
    setIsEstimating(true);
    
    // Mock fare calculation based on vehicle type
    setTimeout(() => {
      let baseFare = 1500;
      if (data.vehicle === 'SUV') baseFare = 2500;
      if (data.vehicle === 'Luxury') baseFare = 5000;
      
      // Random variance for realism
      const variance = Math.floor(Math.random() * 500);
      setEstimatedFare(baseFare + variance);
      setIsEstimating(false);
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const filteredVehicles = mockVehicles;

  return (
    <div className="bg-background dark:bg-darkBackground">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[80vh] flex items-center bg-background dark:bg-[#0F172A]">
        {/* Background */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury SUV" 
            className="w-full h-full object-cover"
          />
          {/* Smooth Bottom Fade Only to eliminate separation line */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background dark:from-darkBackground to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">PREMIUM FLEET</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-textPrimary dark:text-white leading-tight mb-6">
                Choose your <span className="text-accent italic">perfect ride</span>
              </h1>
              <p className="text-lg text-textSecondary dark:text-gray-300 mb-8 max-w-lg font-medium">
                Real-time fare estimates, verified drivers, and rides for every occasion.
              </p>
            </motion.div>

            {/* Right Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card/90 dark:bg-darkCard/90 backdrop-blur-xl p-8 rounded-3xl shadow-premium border border-borderLight dark:border-borderDark w-full max-w-lg ml-auto"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Pickup & Drop */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Pickup</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                      <input
                        {...register('pickup')}
                        type="text"
                        placeholder="Enter pickup"
                        className={`w-full bg-backgroundSoft dark:bg-darkBackground border ${errors.drop ? 'border-red-500' : 'border-borderLight dark:border-borderDark'} rounded-full py-3 pl-12 pr-4 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors`}
                      />
                    </div>
                    {errors.pickup && <p className="text-red-500 text-xs mt-1 ml-4">{errors.pickup.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Drop</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                      <input
                        {...register('drop')}
                        type="text"
                        placeholder="Enter destination"
                        className={`w-full bg-backgroundSoft dark:bg-darkBackground border ${errors.drop ? 'border-red-500' : 'border-borderLight dark:border-borderDark'} rounded-full py-3 pl-12 pr-4 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors`}
                      />
                    </div>
                    {errors.drop && <p className="text-red-500 text-xs mt-1 ml-4">{errors.drop.message}</p>}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                      <input
                        {...register('date')}
                        type="date"
                        className={`w-full bg-backgroundSoft dark:bg-darkBackground border ${errors.date ? 'border-red-500' : 'border-borderLight dark:border-borderDark'} rounded-full py-3 pl-12 pr-4 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent [color-scheme:light] dark:[color-scheme:dark]`}
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-xs mt-1 ml-4">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Time</label>
                    <div className="relative">
                      <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                      <input
                        {...register('time')}
                        type="time"
                        className={`w-full bg-backgroundSoft dark:bg-darkBackground border ${errors.time ? 'border-red-500' : 'border-borderLight dark:border-borderDark'} rounded-full py-3 pl-12 pr-4 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent [color-scheme:light] dark:[color-scheme:dark]`}
                      />
                    </div>
                    {errors.time && <p className="text-red-500 text-xs mt-1 ml-4">{errors.time.message}</p>}
                  </div>
                </div>

                {/* Vehicle & Passengers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Vehicle</label>
                    <div className="relative">
                      <Car size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                      <select
                        {...register('vehicle')}
                        className="w-full bg-backgroundSoft dark:bg-darkBackground border border-borderLight dark:border-borderDark rounded-full py-3 pl-12 pr-4 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent appearance-none"
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="SUV">SUV</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Passengers</label>
                    <div className="relative">
                      <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                      <select
                        {...register('passengers')}
                        className="w-full bg-[#0B1120] border border-gray-700 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent appearance-none"
                      >
                        <option value="1-2">1-2</option>
                        <option value="3-4">3-4</option>
                        <option value="5-6">5-6</option>
                        <option value="7+">7+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {estimatedFare && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="space-y-3 mt-4"
                  >
                    <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 text-center">
                      <p className="text-green-400 text-sm font-medium">Estimated Fare</p>
                      <p className="text-2xl font-bold text-white">₹{estimatedFare.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 mt-1">Final fare may vary based on traffic &amp; actual distance</p>
                    </div>
                    <a
                      href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20book%20a%20ride%20on%20StarLine%20Travel.%0A%0A*Pickup:*%20${encodeURIComponent(useBookingStore.getState().searchDetails.pickup)}%0A*Drop:*%20${encodeURIComponent(useBookingStore.getState().searchDetails.drop)}%0A*Date:*%20${encodeURIComponent(useBookingStore.getState().searchDetails.date)}%0A*Time:*%20${encodeURIComponent(useBookingStore.getState().searchDetails.time)}%0A*Vehicle:*%20${encodeURIComponent(useBookingStore.getState().searchDetails.vehicle)}%0A*Estimated%20Fare:*%20%E2%82%B9${estimatedFare.toLocaleString()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 transition-colors shadow-lg"
                    >
                      <MessageCircle size={18} />
                      <span>Book on WhatsApp</span>
                    </a>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isEstimating}
                  className="w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-3.5 rounded-full mt-4 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-70"
                >
                  {isEstimating ? (
                    <span className="animate-pulse">Calculating...</span>
                  ) : (
                    <>
                      <Search size={18} />
                      <span>Estimate fare</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Available Vehicles Section */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-accent mb-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <Car size={16} className="text-darkBackground" />
            </div>
            <span className="font-serif font-bold text-xl text-textPrimary dark:text-white">Starline</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
            Available <span className="text-gray-400 italic">vehicles</span>
          </h2>
          <p className="text-textSecondary dark:text-gray-400 mt-2 text-sm">11 cars · all driver included</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <motion.div key={vehicle.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-[#1E293B] rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-hover flex flex-col group border border-borderLight dark:border-white/5 transition-all duration-300">
              
              {/* Vehicle Image section */}
              <div className="relative h-56 overflow-hidden bg-[#121826]/40">
                <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                  <span className="bg-black/60 backdrop-blur-md border border-white/10 text-gray-200 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">{vehicle.category}</span>
                  <span className="bg-accent text-darkBackground text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">{vehicle.seats} SEATER</span>
                </div>
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1E293B] via-transparent to-black/10 z-0"></div>
              </div>
              
              {/* Details Section */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <h3 className="text-2xl font-serif font-bold text-textPrimary dark:text-white mb-8 border-b border-borderLight dark:border-white/10 pb-4">{vehicle.name}</h3>
                
                <div className="space-y-5 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-textSecondary dark:text-gray-400 font-medium">Price</span>
                    <span className="text-sm font-bold text-accentGold">Rs.{vehicle.pricePerKm}/- Per Km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-textSecondary dark:text-gray-400 font-medium">Extra Hours</span>
                    <span className="text-sm font-bold text-accentGold">Rs.{vehicle.extraHours}/- Per Hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-textSecondary dark:text-gray-400 font-medium">Night Charge</span>
                    <span className="text-sm font-bold text-accentGold">Rs.{vehicle.nightCharge}/-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-textSecondary dark:text-gray-400 font-medium">Daily Limit</span>
                    <span className="text-sm font-bold text-accentGold">{vehicle.dailyLimit}</span>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/919876543210?text=I'm interested in booking the ${vehicle.name}.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-4 rounded-full text-center transition-colors flex items-center justify-center space-x-2 shadow-md shadow-accent/20"
                >
                  <span>BOOK NOW</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Banner */}
        <div className="mt-16 bg-darkCard rounded-3xl p-8 md:p-12 border border-borderDark flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="relative z-10 mb-6 md:mb-0">
            <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-2 block">NEED A CUSTOM QUOTE?</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Talk to us on WhatsApp</h3>
            <p className="text-gray-400">Outstation, multi-day, or large groups — we'll tailor a fare in minutes.</p>
          </div>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="relative z-10 w-full md:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2 transition-colors">
            <MessageCircle size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
};

export default TaxiService;