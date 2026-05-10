import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { mockPackages } from '../data/mockData';

const DestinationDetails = () => {
  const { destination } = useParams();
  
  // Find all packages for this destination, or find the specific package if it's a direct match
  const destinationPackages = mockPackages.filter(
    pkg => pkg.tag.toLowerCase() === destination?.toLowerCase() || pkg.title.toLowerCase() === destination?.toLowerCase()
  );

  // If no exact match, just show the first package as a fallback for the demo
  const mainPackage = destinationPackages.length > 0 ? destinationPackages[0] : mockPackages[0];

  const itinerary = [
    { day: 1, title: 'Arrival & Welcome', desc: 'Transfer from airport to your luxury hotel. Evening at leisure.' },
    { day: 2, title: 'City Sightseeing', desc: 'Guided tour of the iconic landmarks and historical sites.' },
    { day: 3, title: 'Adventure Day', desc: 'Optional excursions including trekking or cultural experiences.' },
    { day: 4, title: 'Departure', desc: 'Morning shopping and transfer to the airport.' },
  ];

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen">
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 h-[60vh] flex items-end bg-background dark:bg-[#0F172A]">
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <img src={mainPackage.image} alt={mainPackage.title} className="w-full h-full object-cover" />
          {/* Smooth Bottom Fade Only to eliminate separation line */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background dark:from-darkBackground to-transparent pointer-events-none"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex space-x-3 mb-4">
              <span className="bg-accent text-darkBackground text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">{mainPackage.tag}</span>
              <span className="bg-white/40 dark:bg-white/10 backdrop-blur-md text-textPrimary dark:text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center border border-black/5 dark:border-white/10 shadow-sm"><Clock size={12} className="mr-1"/> {mainPackage.duration}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-textPrimary dark:text-white mb-4">{mainPackage.title}</h1>
            <p className="text-lg text-textSecondary dark:text-gray-300 max-w-2xl font-medium">{mainPackage.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content Split */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            
            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-textPrimary dark:text-white mb-6">Overview</h2>
              <p className="text-textSecondary dark:text-gray-400 leading-relaxed text-lg mb-6">
                Immerse yourself in the breathtaking beauty and rich culture of {mainPackage.title}. This carefully curated package ensures you experience the very best, from comfortable stays to guided tours, with all the logistics handled by our expert team.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-textPrimary dark:text-gray-300">
                  <CheckCircle2 size={20} className="text-accent" />
                  <span>Premium Accommodation</span>
                </div>
                <div className="flex items-center space-x-3 text-textPrimary dark:text-gray-300">
                  <CheckCircle2 size={20} className="text-accent" />
                  <span>Daily Breakfast & Dinner</span>
                </div>
                <div className="flex items-center space-x-3 text-textPrimary dark:text-gray-300">
                  <CheckCircle2 size={20} className="text-accent" />
                  <span>Private Transportation</span>
                </div>
                <div className="flex items-center space-x-3 text-textPrimary dark:text-gray-300">
                  <CheckCircle2 size={20} className="text-accent" />
                  <span>Guided Sightseeing</span>
                </div>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-textPrimary dark:text-white mb-8">Day-wise Itinerary</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
                
                {itinerary.map((day, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0B1120] bg-accent text-darkBackground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                      {day.day}
                    </div>
                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card dark:bg-darkCard shadow-premium border border-borderLight dark:border-borderDark">
                      <h3 className="font-bold text-textPrimary dark:text-white text-lg mb-2">{day.title}</h3>
                      <p className="text-textSecondary dark:text-gray-400 text-sm leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            
          </div>

          {/* Sticky Sidebar Booking */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card dark:bg-darkCard rounded-3xl p-8 shadow-premium border border-borderLight dark:border-borderDark sticky top-28">
              <div className="flex justify-between items-start border-b border-gray-100 dark:border-white/5 pb-6 mb-6">
                <div>
                  <span className="text-xs font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase block mb-1">Starting from</span>
                  <div className="text-3xl font-bold text-accentGold">₹{mainPackage.price.toLocaleString()}</div>
                  <span className="text-xs text-textSecondary dark:text-gray-400">per person</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center">
                  <Star size={12} className="mr-1 fill-current" />
                  {mainPackage.rating}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-accent/40 flex justify-center items-center space-x-2">
                  <span>Proceed to Book</span>
                  <ArrowRight size={18} />
                </button>
                <a href={`https://wa.me/919876543210?text=I'm interested in booking the ${mainPackage.title} package.`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-[#25D366]/40 flex justify-center items-center space-x-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              <div className="bg-gray-50 dark:bg-[#0B0F19] rounded-xl p-4 flex items-start space-x-3">
                <Calendar size={20} className="text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-textSecondary dark:text-gray-400 leading-relaxed">
                  <span className="font-bold text-textPrimary dark:text-gray-300">Flexible Dates.</span> Book now and choose your travel dates later. Valid for 6 months.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ADDITIONAL SERVICES SECTION */}
      <section className="py-24 md:py-32 bg-backgroundSoft dark:bg-darkSecondary border-t border-borderLight dark:border-borderDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Upgrade Your Experience</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
              🍽 Additional <span className="text-accent italic">Services</span>
            </h2>
            <p className="text-textSecondary dark:text-gray-400 mt-2 max-w-lg mx-auto">Enhance your luxury vacation with our pre-vetted premium local culinary delights and elite accommodation options.</p>
          </div>

          {/* 🍴 FOOD SECTION */}
          <div className="mb-24">
            <h3 className="text-3xl font-serif font-bold text-textPrimary dark:text-white mb-8 flex items-center">
              <span className="text-2xl mr-3">🍴</span> Premium Local Dining
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Nepali Thali', cuisine: 'Traditional Nepalese', price: '₹450 / Thali', img: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&q=80&w=800', desc: 'An authentic multi-course platter with local ghee, black lentils, wild greens, and organic rice.' },
                { title: 'Steamed Momos', cuisine: 'Local Himalayan', price: '₹220 / Plate', img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800', desc: 'Juicy, hand-folded dumplings served with our hot home-made roasted tomato and sesame chutney.' },
                { title: 'Mountain Cafe Specials', cuisine: 'Continental Fusion', price: '₹350 / Person', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', desc: 'Rich artisanal single-origin mountain coffee paired with fresh alpine pastries and pancakes.' },
                { title: 'Thukpa Noodle Soup', cuisine: 'Tibetan Delicacy', price: '₹280 / Bowl', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', desc: 'A hearty hand-pulled noodle soup prepared with slow-simmered mountain herbs and fresh vegetables.' },
              ].map((food, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden bg-white dark:bg-darkCard border border-borderLight dark:border-borderDark shadow-premium hover:-translate-y-2 hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Image section with glassmorphism overlays */}
                    <div className="h-56 relative overflow-hidden">
                      <img src={food.img} alt={food.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                        {food.cuisine}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <span className="text-accentGold font-bold text-lg font-serif">{food.price}</span>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="p-6 relative">
                      <h4 className="text-xl font-serif font-bold text-textPrimary dark:text-white mb-2">{food.title}</h4>
                      <p className="text-sm text-textSecondary dark:text-gray-400 leading-relaxed line-clamp-3">{food.desc}</p>
                    </div>
                  </div>

                  {/* WhatsApp & Contact Buttons */}
                  <div className="p-6 pt-0 space-y-2.5">
                    <a 
                      href={`https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20adding%20the%20${encodeURIComponent(food.title)}%20(${encodeURIComponent(food.cuisine)})%20dining%20experience%20to%20my%20${encodeURIComponent(mainPackage.title)}%20trip.`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center space-x-2 text-sm shadow-md"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      <span>WhatsApp Book</span>
                    </a>
                    <a 
                      href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20get%20more%20information%20about%20the%20${encodeURIComponent(food.title)}%20dining%20packages%20for%20our%20${encodeURIComponent(mainPackage.title)}%20itinerary.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-transparent border border-borderLight dark:border-borderDark hover:bg-gray-100 dark:hover:bg-white/5 text-textPrimary dark:text-white font-bold py-2.5 rounded-xl transition-all flex justify-center items-center text-sm"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🏨 HOTEL STAY SECTION */}
          <div>
            <h3 className="text-3xl font-serif font-bold text-textPrimary dark:text-white mb-8 flex items-center">
              <span className="text-2xl mr-3">🏨</span> Luxurious Room Upgrades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Deluxe Room', rating: '4.8', price: '₹4,500 / Night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', amenities: ['King Bed', 'Free Wi-Fi', 'Garden Balcony', 'Hot Tub'], desc: 'Elegant and spacious rooms overlooking beautifully manicured courtyard gardens, ideal for relaxation.' },
                { title: 'Mountain View Suite', rating: '4.9', price: '₹7,500 / Night', img: 'https://images.unsplash.com/photo-1582719478250-c894e4dc240e?auto=format&fit=crop&q=80&w=800', amenities: ['Panoramic Deck', 'Smart TV', 'Private Mini-Bar', 'Premium Spa Tub'], desc: 'Wake up to glorious golden sunrises over snow-capped Himalayan ridges directly from your luxury bed.' },
                { title: 'Executive Luxury Suite', rating: '5.0', price: '₹12,000 / Night', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', amenities: ['Master Bedroom', 'Private Lounge', '24/7 Butler Service', 'Plunge Pool'], desc: 'Uncompromised royal living featuring an attached fireplace parlor, private pool deck, and elite dining lounge.' },
              ].map((hotel, i) => (
                <div key={i} className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-darkCard border border-borderLight dark:border-borderDark shadow-premium hover:-translate-y-2 hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Image section */}
                    <div className="h-64 relative overflow-hidden">
                      <img src={hotel.img} alt={hotel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center shadow-lg border border-white/10">
                        <Star size={12} className="text-accent fill-accent mr-1" /> {hotel.rating} Rating
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <span className="text-white font-bold text-xl font-serif">{hotel.price}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8">
                      <h4 className="text-2xl font-serif font-bold text-textPrimary dark:text-white mb-2">{hotel.title}</h4>
                      <p className="text-sm text-textSecondary dark:text-gray-400 mb-6 leading-relaxed">{hotel.desc}</p>
                      
                      {/* Amenities badging */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {hotel.amenities.map((amenity, idx) => (
                          <span key={idx} className="bg-backgroundSoft dark:bg-[#1E293B] text-textSecondary dark:text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase border border-borderLight dark:border-borderDark/50">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="p-8 pt-0 flex space-x-4">
                    <a 
                      href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20upgrade%20to%20the%20${encodeURIComponent(hotel.title)}%20(${encodeURIComponent(hotel.price)})%20for%20my%20${encodeURIComponent(mainPackage.title)}%20tour.`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[#25D366]/30 flex justify-center items-center space-x-2 text-sm"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      <span>WhatsApp</span>
                    </a>
                    <a 
                      href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20get%20more%20details%20about%20the%20${encodeURIComponent(hotel.title)}%20upgrade%20options%20for%20my%20${encodeURIComponent(mainPackage.title)}%20stay.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-textPrimary dark:text-white font-bold py-3.5 rounded-xl transition-all text-sm border border-borderLight dark:border-borderDark flex justify-center items-center"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other places in this destination */}
      <section className="py-16 bg-backgroundSoft dark:bg-darkBackground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-textPrimary dark:text-white mb-8">
            More in {mainPackage.tag}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinationPackages.filter(p => p.id !== mainPackage.id).map(pkg => (
              <Link to={`/packages/${pkg.tag.toLowerCase()}`} key={pkg.id} className="group block">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-3 left-3 bg-[#0B1120]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {pkg.duration}
                  </div>
                </div>
                <h3 className="font-bold text-textPrimary dark:text-white text-lg group-hover:text-accent transition-colors">{pkg.title}</h3>
                <p className="text-accent font-bold text-sm">₹{pkg.price.toLocaleString()}</p>
              </Link>
            ))}
            {destinationPackages.filter(p => p.id !== mainPackage.id).length === 0 && (
              <p className="text-textSecondary dark:text-gray-400 text-sm">No other packages found for this destination.</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DestinationDetails;