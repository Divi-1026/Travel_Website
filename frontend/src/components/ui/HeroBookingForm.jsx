import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Car, Search, Zap } from 'lucide-react';
import useBookingStore from '../../store/useBookingStore';

const HeroBookingForm = () => {
  const navigate = useNavigate();
  const { searchDetails, updateSearchDetails } = useBookingStore();
  const [formData, setFormData] = useState(searchDetails);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchDetails(formData);
    navigate('/taxi');
  };

  return (
    <div className="bg-[#1E293B] p-8 rounded-3xl shadow-2xl max-w-md w-full ml-auto border-0">
      <div className="flex items-center space-x-2 text-accent mb-2">
        <Zap size={16} className="fill-accent text-accent" />
        <span className="text-xs font-bold tracking-widest uppercase">Quick Booking</span>
      </div>
      <h3 className="text-3xl font-serif font-bold text-white mb-6">Plan your ride</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Pickup */}
        <div>
          <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-1.5">Pickup</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full bg-[#0F172A] border border-transparent rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>
        </div>

        {/* Drop */}
        <div>
          <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-1.5">Drop</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
            <input
              type="text"
              name="drop"
              value={formData.drop}
              onChange={handleChange}
              placeholder="Enter destination"
              className="w-full bg-[#0F172A] border border-transparent rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-1.5">Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-[#0F172A] border border-transparent rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors [color-scheme:dark]"
                required
              />
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-1.5">Vehicle</label>
            <div className="relative">
              <Car size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full bg-[#0F172A] border border-transparent rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-3.5 rounded-full mt-2 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-accent/20 hover:shadow-accent/40"
        >
          <Search size={18} />
          <span>Search availability</span>
        </button>
      </form>
    </div>
  );
};

export default HeroBookingForm;
