import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">CONTACT</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-textPrimary dark:text-white">
            Let's plan your <span className="text-accent italic">perfect trip</span>
          </h1>
          <p className="text-textSecondary dark:text-gray-400 mt-4 text-lg">
            Send us a message and we'll get back within an hour.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card dark:bg-darkCard rounded-3xl p-8 md:p-12 shadow-premium border border-borderLight dark:border-borderDark"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-2">FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-backgroundSoft dark:bg-darkBackground border border-borderLight dark:border-borderDark rounded-full py-3.5 px-6 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-2">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    className="w-full bg-backgroundSoft dark:bg-darkBackground border border-borderLight dark:border-borderDark rounded-full py-3.5 px-6 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-2">PHONE</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-backgroundSoft dark:bg-darkBackground border border-borderLight dark:border-borderDark rounded-full py-3.5 px-6 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-textSecondary dark:text-gray-400 tracking-wider uppercase mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your trip — destination, dates, group size."
                  required
                  rows={4}
                  className="w-full bg-backgroundSoft dark:bg-darkBackground border border-borderLight dark:border-borderDark rounded-3xl py-4 px-6 text-sm text-textPrimary dark:text-white focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-yellow-500 text-darkBackground font-bold py-4 rounded-full transition-all flex justify-center items-center space-x-2 shadow-lg shadow-accent/20"
              >
                <span>Send message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            {/* Office Details */}
            <div className="bg-card dark:bg-darkCard rounded-3xl p-8 md:p-12 shadow-premium border border-borderLight dark:border-borderDark flex-grow relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h2 className="text-2xl font-serif font-bold text-textPrimary dark:text-white mb-8">Office</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                    <MapPin size={20} className="text-darkBackground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-textPrimary dark:text-white mb-1">Visit us</h4>
                    <p className="text-textSecondary dark:text-gray-400">Lakhnauti Road, Ayodhya, UP 224001</p>
                  </div>
                </div>
 
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                    <Phone size={20} className="text-darkBackground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-textPrimary dark:text-white mb-1">Call us</h4>
                    <p className="text-textSecondary dark:text-gray-400">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                    <Mail size={20} className="text-darkBackground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-textPrimary dark:text-white mb-1">Email us</h4>
                    <p className="text-textSecondary dark:text-gray-400">hello@starlinetravel.in</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-10 pt-8 border-t border-borderLight dark:border-borderDark">
                <a href="#" className="w-10 h-10 rounded-full border border-borderLight dark:border-borderDark flex items-center justify-center hover:bg-accent hover:text-darkBackground hover:border-accent transition-colors text-gray-500 dark:text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-borderLight dark:border-borderDark flex items-center justify-center hover:bg-accent hover:text-darkBackground hover:border-accent transition-colors text-gray-500 dark:text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-borderLight dark:border-borderDark flex items-center justify-center hover:bg-accent hover:text-darkBackground hover:border-accent transition-colors text-gray-500 dark:text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
            </div>

            {/* Quick WhatsApp Chat */}
            <div className="bg-card dark:bg-darkCard rounded-3xl p-6 shadow-premium border border-borderLight dark:border-borderDark flex justify-between items-center transition-all duration-300">
              <div>
                <h3 className="text-xl font-serif font-bold text-textPrimary dark:text-white mb-1">Quick WhatsApp chat</h3>
                <p className="text-sm text-textSecondary dark:text-gray-400">Average reply in 5 minutes</p>
              </div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center transition-colors shadow-lg shadow-[#25D366]/30">
                <MessageCircle size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full h-96 bg-backgroundSoft dark:bg-darkSecondary rounded-3xl overflow-hidden shadow-premium border border-borderLight dark:border-borderDark"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.38541916362!2d81.9329774!3d26.7915555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07937e6d2823%3A0x5fc8f74fc9589df4!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
            className="filter grayscale dark:opacity-80"
          ></iframe>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;