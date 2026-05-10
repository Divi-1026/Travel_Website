import { motion } from 'framer-motion';
import { Heart, Car, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockVehicles } from '../data/mockData';

const WeddingRentals = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const luxuryVehicles = mockVehicles.filter(v => v.category === 'Luxury' || v.category === 'SUV');

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen">
      
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-background dark:bg-[#0F172A]">
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          {/* Using a premium wedding/luxury car image */}
          <img 
            src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding Car" 
            className="w-full h-full object-cover"
          />
          {/* Smooth Bottom Fade Only to eliminate separation line */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background dark:from-darkBackground to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-black/5 dark:border-white/20">
              <Heart size={16} className="text-accent fill-accent" />
              <span className="text-sm font-semibold text-textPrimary dark:text-white tracking-widest uppercase">STARLINE WEDDINGS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-textPrimary dark:text-white leading-tight mb-6">
              Arrive in <span className="text-accent italic">style</span> on your big day
            </h1>
            <p className="text-lg text-textSecondary dark:text-gray-300 mb-10 max-w-xl leading-relaxed font-medium">
              Premium luxury cars with professional chauffeurs for weddings, pre-wedding shoots, and special events. Impeccable service for unforgettable moments.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-accent hover:bg-yellow-500 text-darkBackground font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5 flex items-center space-x-2">
                <span>Book your fleet</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-backgroundSoft dark:bg-darkBackground border-b border-borderLight dark:border-borderDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Car size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-textPrimary dark:text-white mb-3">Immaculate Fleet</h3>
              <p className="text-textSecondary dark:text-gray-400">Pristine, showroom-condition luxury vehicles dressed beautifully for the occasion.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-textPrimary dark:text-white mb-3">Professional Chauffeurs</h3>
              <p className="text-textSecondary dark:text-gray-400">Uniformed, verified, and highly trained drivers ensuring a smooth, stress-free ride.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Star size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-textPrimary dark:text-white mb-3">Tailored Packages</h3>
              <p className="text-textSecondary dark:text-gray-400">Customized hourly or full-day packages accommodating the bride, groom, and family.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Fleet Showcase */}
      <section className="py-24 md:py-32 bg-backgroundSoft dark:bg-darkSecondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">THE COLLECTION</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
              Premium <span className="text-accent italic">Wedding</span> Cars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {luxuryVehicles.map((vehicle, index) => (
              <motion.div 
                key={vehicle.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1E293B] rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-hover flex flex-col group border border-borderLight dark:border-white/5 transition-all duration-300"
              >
                
                {/* Vehicle Image section */}
                <div className="relative h-56 overflow-hidden bg-[#121826]/40">
                  <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-gray-200 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">{vehicle.type}</span>
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
                      <span className="text-sm font-bold text-accentGold">Rs.800/-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-textSecondary dark:text-gray-400 font-medium">Daily Limit</span>
                      <span className="text-sm font-bold text-accentGold">Rs.{vehicle.pricePerKm}/km (250/Day)</span>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/919876543210?text=I'm interested in booking the ${vehicle.name} for a wedding event.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-4 rounded-full text-center transition-colors items-center justify-center space-x-2 shadow-md shadow-accent/20"
                  >
                    <span>BOOK NOW</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default WeddingRentals;