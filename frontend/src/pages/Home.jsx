import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Map, Clock, Car } from 'lucide-react';
import HeroBookingForm from '../components/ui/HeroBookingForm';
import { mockPackages, mockVehicles } from '../data/mockData';

const Home = () => {
  // Fade up animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-background dark:bg-darkBackground">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-background dark:bg-[#0F172A]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic Mountains" 
            className="w-full h-full object-cover"
          />
          {/* Smooth Bottom Fade Only to eliminate separation line */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background dark:from-darkBackground to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 bg-white/40 dark:bg-[#1E293B]/80 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-black/5 dark:border-white/10 shadow-sm">
                <Star size={14} className="fill-accent text-accent" />
                <span className="text-sm font-medium text-textPrimary dark:text-white">Trusted by 12,000+ travellers</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl md:text-[5.5rem] font-serif font-bold text-textPrimary dark:text-white leading-[1.05] mb-6">
                Premium Car<br/>
                Rentals<br/>
                & <span className="text-accent italic">Travel</span><br/>
                Experiences
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg text-textSecondary dark:text-gray-300 mb-10 max-w-xl leading-relaxed font-medium">
                Explore destinations with comfort, luxury and safety. Curated journeys, verified drivers, and a premium fleet — all in one place.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
                <Link to="/packages" className="bg-accent hover:bg-yellow-500 text-darkBackground font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5">
                  <span>Explore Packages</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/taxi" className="bg-transparent border border-gray-300 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-textPrimary dark:text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-2">
                  <span>Book Taxi</span>
                  <Car size={18} className="ml-1" />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-white/20">
                <div>
                  <div className="text-3xl font-serif font-bold text-accent mb-1">12K+</div>
                  <div className="text-xs text-textSecondary dark:text-gray-400 font-bold uppercase tracking-wider">Happy travellers</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-accent mb-1">120+</div>
                  <div className="text-xs text-textSecondary dark:text-gray-400 font-bold uppercase tracking-wider">Destinations</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-accent flex items-center mb-1">4.9<Star size={20} className="fill-accent ml-1" /></div>
                  <div className="text-xs text-textSecondary dark:text-gray-400 font-bold uppercase tracking-wider">Avg rating</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroBookingForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED DESTINATIONS */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Featured</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
              Iconic <span className="text-accent italic">destinations</span> we love
            </h2>
            <p className="text-textSecondary dark:text-gray-400 mt-4 text-lg">
              Hand-picked places where Starline delivers an unforgettable journey.
            </p>
          </div>
          <Link to="/packages" className="hidden md:flex items-center space-x-2 text-accent font-semibold hover:text-yellow-500 transition-colors group">
            <span>View all</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockPackages.slice(0, 3).map((pkg) => (
            <motion.div key={pkg.id} variants={fadeUp} className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-premium border border-borderLight dark:border-borderDark">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent transition-opacity duration-300 h-1/2 mt-auto"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="bg-[#121826]/80 backdrop-blur-md px-3 py-1 rounded-lg flex items-center space-x-1">
                  <Star size={12} className="text-accent fill-accent" />
                  <span className="text-xs font-bold text-white">{pkg.rating}</span>
                </div>
                <div className="bg-[#121826]/80 backdrop-blur-md px-3 py-1 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">{pkg.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-sm text-gray-300 mb-6 truncate">{pkg.shortDesc}</p>
                
                <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">FROM</span>
                    <span className="text-xl font-bold text-accentGold">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <Link to={`/packages/${pkg.tag.toLowerCase()}`} className="bg-[#1E293B] hover:bg-[#334155] border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center space-x-2">
                    <span>Explore</span>
                    <ArrowRight size={14} className="-rotate-45" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2.5 CURATED TOUR PACKAGES */}
      <section className="py-24 md:py-32 bg-backgroundSoft dark:bg-darkBackground border-t border-borderLight dark:border-borderDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Curated tour</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
                <span className="text-accent italic">packages</span>
              </h2>
              <p className="text-textSecondary dark:text-gray-400 mt-4 text-lg">
                Everything you need — stays, drives, sightseeing and more.
              </p>
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mockPackages.slice(3, 6).map((pkg) => (
              <motion.div key={pkg.id} variants={fadeUp} className="bg-white dark:bg-[#1E293B] rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-hover flex flex-col group border border-borderLight dark:border-white/5 transition-all duration-300">
                
                {/* Image Section */}
                <Link to={`/packages/${pkg.tag.toLowerCase()}`} className="relative h-64 overflow-hidden block">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {/* Badges Overlapping Image Bottom */}
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <div className="bg-white/90 dark:bg-[#121826]/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1 border border-borderLight dark:border-white/10">
                      <span className="text-[10px] font-bold text-textPrimary dark:text-gray-300 tracking-wider uppercase">📍 {pkg.tag}</span>
                    </div>
                    <div className="bg-white/90 dark:bg-[#121826]/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1 border border-borderLight dark:border-white/10">
                      <span className="text-[10px] font-bold text-textPrimary dark:text-gray-300 tracking-wider uppercase">🕒 {pkg.duration}</span>
                    </div>
                  </div>
                </Link>
                
                {/* Details Section */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/packages/${pkg.tag.toLowerCase()}`}>
                      <h3 className="text-[1.35rem] font-serif font-bold text-textPrimary dark:text-white leading-snug mb-3 pr-4 hover:text-accent transition-colors">{pkg.title}</h3>
                    </Link>
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-accent text-accent" />
                      ))}
                      <span className="text-sm text-textSecondary dark:text-darkTextSecondary ml-2">({pkg.rating} Rating)</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <span className="text-[10px] text-textMuted dark:text-darkTextMuted font-bold uppercase tracking-wider block mb-1">STARTING FROM</span>
                      <span className="text-2xl font-bold text-accentGold">₹{pkg.price.toLocaleString()}</span>
                    </div>
                    <Link 
                      to={`/packages/${pkg.tag.toLowerCase()}`} 
                      className="relative w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-4 rounded-full text-center transition-all duration-300 flex items-center justify-center shadow-md shadow-accent/20 hover:shadow-accent/40 group overflow-hidden"
                    >
                      <span className="absolute left-4 w-8 h-8 rounded-full bg-darkBackground/10 dark:bg-darkBackground/20 flex items-center justify-center group-hover:bg-darkBackground/20 dark:group-hover:bg-darkBackground/30 transition-colors">
                        <ArrowRight size={16} className="text-darkBackground group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <span className="uppercase tracking-wider text-sm">EXPLORE PACKAGE</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PREMIUM FLEET */}
      <section className="py-24 md:py-32 bg-background dark:bg-darkSecondary border-t border-borderLight dark:border-borderDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Premium Fleet</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
                Available <span className="text-accent italic">vehicles</span>
              </h2>
            </div>
            <p className="hidden md:block text-textSecondary dark:text-gray-400 mt-4 text-sm font-medium max-w-xs text-right">
              {mockVehicles.length} cars • All driver included
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mockVehicles.slice(0, 3).map((vehicle) => (
              <motion.div key={vehicle.id} variants={fadeUp} className="bg-white dark:bg-[#1E293B] rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-hover flex flex-col group border border-borderLight dark:border-white/5 transition-all duration-300">
                
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
                    className="relative w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-4 rounded-full text-center transition-all duration-300 flex items-center justify-center shadow-md shadow-accent/20 hover:shadow-accent/40 group overflow-hidden"
                  >
                    <span className="absolute left-4 w-8 h-8 rounded-full bg-darkBackground/10 dark:bg-darkBackground/20 flex items-center justify-center group-hover:bg-darkBackground/20 dark:group-hover:bg-darkBackground/30 transition-colors">
                      <ArrowRight size={16} className="text-darkBackground group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="uppercase tracking-wider text-sm">BOOK NOW</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. MARQUEE TESTIMONIALS */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto overflow-hidden border-t border-borderLight dark:border-borderDark">
        <div className="text-center mb-16 px-4">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
            What our <span className="text-accent italic">travellers</span> say
          </h2>
        </div>

        <div className="relative w-full flex overflow-hidden">
          {/* Gradients for smooth fade effect on edges */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background dark:from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background dark:from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>

          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex space-x-6 shrink-0 py-4"
          >
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
              <div key={index} className="w-[350px] bg-card dark:bg-darkCard p-8 rounded-3xl shadow-premium border border-borderLight dark:border-borderDark shrink-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-12 h-12 rounded-full object-cover shadow-md" />
                    <div>
                      <h4 className="text-sm font-bold text-textPrimary dark:text-white">Traveler {i}</h4>
                      <span className="text-xs text-textSecondary dark:text-gray-400">@traveler{i}</span>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                      {/* Twitter/X style badge */}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </div>
                  </div>
                  <p className="text-textSecondary dark:text-gray-300 mb-6 leading-relaxed">
                    "Starline Travel made our trip absolutely unforgettable. The driver was professional, the car was pristine, and the itinerary was perfect. Highly recommended!"
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-wider font-bold pt-4 border-t border-gray-100 dark:border-white/5">
                  <span>Posted on X</span>
                  <span>May 10, 2026</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 dark:from-[#1E293B] dark:to-[#0F172A] rounded-[2.5rem] p-10 md:p-16 border border-borderLight dark:border-white/5 shadow-premium flex flex-col lg:flex-row justify-between items-center gap-12 transition-all duration-300">
          <div className="text-left max-w-2xl">
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-3 block">READY WHEN YOU ARE</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white mb-6 leading-tight">
              Ready for your <span className="text-accent italic">next journey?</span>
            </h2>
            <p className="text-textSecondary dark:text-darkTextSecondary text-base md:text-lg leading-relaxed font-medium">
              Tell us where you'd like to go. We'll handle the rest — from the perfect ride to the perfect itinerary.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 w-full lg:w-auto shrink-0">
            <Link 
              to="/contact" 
              className="flex-1 sm:flex-none bg-accent hover:bg-yellow-500 text-darkBackground font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              <span>Get a free quote</span>
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/taxi" 
              className="flex-1 sm:flex-none bg-transparent border border-gray-300 dark:border-white/20 hover:bg-white/10 text-textPrimary dark:text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center space-x-2"
            >
              <span>Book a taxi</span>
              <Car size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;