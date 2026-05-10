import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { mockPackages } from '../data/mockData';

const TourPackages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxBudget, setMaxBudget] = useState(35000);
  const [sortBy, setSortBy] = useState('popular');

  const filteredPackages = mockPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pkg.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = pkg.price <= maxBudget;
    return matchesSearch && matchesBudget;
  }).sort((a, b) => {
    if (sortBy === 'low') return a.price - b.price;
    if (sortBy === 'high') return b.price - a.price;
    return b.rating - a.rating; // default to popular/highest rating
  });

  return (
    <div className="pt-32 pb-24 bg-background dark:bg-darkBackground min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">COMPLETE NEPAL & INDIA COLLECTION</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white max-w-2xl">
            Explore Our <span className="text-accent italic">Exclusive</span> Packages
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-4 text-lg max-w-xl">
            No need to look further. Here are our most loved and carefully crafted travel plans.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-card dark:bg-darkCard p-6 rounded-3xl shadow-premium border border-borderLight dark:border-borderDark sticky top-28">
              <div className="flex items-center space-x-2 text-accent mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                <span className="font-bold tracking-wider uppercase text-sm">Filters</span>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-textPrimary dark:text-white mb-2">Search</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Destination or trip name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-backgroundSoft dark:bg-darkBackground border border-borderLight dark:border-borderDark rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent text-textPrimary dark:text-white"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-textPrimary dark:text-white">Max budget</label>
                  <span className="text-xs font-bold text-accent">₹{maxBudget.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="1000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-bold text-textPrimary dark:text-white mb-2">Sort by</label>
                <div className="flex space-x-2 bg-backgroundSoft dark:bg-darkBackground p-1 rounded-full border border-borderLight dark:border-borderDark">
                  {['popular', 'low', 'high'].map(sortType => (
                    <button
                      key={sortType}
                      onClick={() => setSortBy(sortType)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-full capitalize transition-colors ${
                        sortBy === sortType 
                          ? 'bg-accent text-darkBackground shadow-sm' 
                          : 'text-textSecondary dark:text-gray-400 hover:text-textPrimary dark:hover:text-white'
                      }`}
                    >
                      {sortType === 'low' ? '₹ Low' : sortType === 'high' ? '₹ High' : sortType}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Package Grid */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6 text-sm text-textSecondary dark:text-gray-400">
              Showing <span className="font-bold text-textPrimary dark:text-white">{filteredPackages.length}</span> packages
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPackages.map((pkg) => (
                <motion.div key={pkg.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="bg-white dark:bg-[#1E293B] rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-hover flex flex-col group border border-borderLight dark:border-white/5 transition-all duration-300">
                  
                  {/* Image Section */}
                  <Link to={`/packages/${pkg.tag.toLowerCase()}`} className="relative h-64 overflow-hidden block">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {/* Popular badge */}
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-accent text-darkBackground text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">★ Popular</span>
                      </div>
                    )}
                    {/* Badges Overlapping Image Bottom */}
                    <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
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
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-accent text-accent" />
                        ))}
                        <span className="text-sm text-textSecondary dark:text-darkTextSecondary ml-2">({pkg.rating} Rating)</span>
                      </div>
                      <p className="text-sm text-textSecondary dark:text-darkTextSecondary leading-relaxed mb-6 line-clamp-3">{pkg.subtitle}</p>
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <span className="text-[10px] text-textMuted dark:text-darkTextMuted font-bold uppercase tracking-wider block mb-1">STARTING FROM</span>
                        <span className="text-2xl font-bold text-accentGold">₹{pkg.price.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-4">
                        <Link 
                          to={`/packages/${pkg.tag.toLowerCase()}`} 
                          className="relative flex-1 bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-3.5 rounded-full text-center transition-all duration-300 flex items-center justify-center text-sm shadow-md shadow-accent/20 hover:shadow-accent/40 group overflow-hidden"
                        >
                          <span className="absolute left-3 w-7 h-7 rounded-full bg-darkBackground/10 dark:bg-darkBackground/20 flex items-center justify-center group-hover:bg-darkBackground/20 dark:group-hover:bg-darkBackground/30 transition-colors">
                            <ArrowRight size={14} className="text-darkBackground group-hover:translate-x-0.5 transition-transform" />
                          </span>
                          <span className="uppercase tracking-wider">EXPLORE DETAILS</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredPackages.length === 0 && (
                <div className="col-span-1 md:col-span-2 py-12 text-center">
                  <p className="text-textSecondary dark:text-gray-400">No packages found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourPackages;