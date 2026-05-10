import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-darkBackground text-textSecondary dark:text-gray-300 pt-16 pb-8 border-t border-borderLight dark:border-borderDark transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-darkBackground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3l1.9 5.8a1 1 0 00.6.6L20.3 11.3a1 1 0 010 1.4l-5.8 1.9a1 1 0 00-.6.6L12 21a1 1 0 01-1.4 0l-1.9-5.8a1 1 0 00-.6-.6L2.3 12.7a1 1 0 010-1.4l5.8-1.9a1 1 0 00.6-.6L10.6 3a1 1 0 011.4 0z" />
                </svg>
              </div>
              <span className="font-serif font-bold text-xl text-textPrimary dark:text-white">Starline Travel</span>
            </div>
            <p className="text-sm text-textSecondary dark:text-gray-400 mb-6 leading-relaxed">
              Premium car rentals and curated journeys across India and Nepal. Drive beyond destinations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-borderLight dark:border-borderDark flex items-center justify-center hover:bg-accent hover:text-darkBackground hover:border-accent transition-all text-textSecondary dark:text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderLight dark:border-borderDark flex items-center justify-center hover:bg-accent hover:text-darkBackground hover:border-accent transition-all text-textSecondary dark:text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderLight dark:border-borderDark flex items-center justify-center hover:bg-accent hover:text-darkBackground hover:border-accent transition-all text-textSecondary dark:text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/packages" className="hover:text-accent text-textSecondary dark:text-gray-400 transition-colors">Tour Packages</Link></li>
              <li><Link to="/taxi" className="hover:text-accent text-textSecondary dark:text-gray-400 transition-colors">Taxi Service</Link></li>
              <li><Link to="/wedding" className="hover:text-accent text-textSecondary dark:text-gray-400 transition-colors">Wedding Rentals</Link></li>
              <li><Link to="/about" className="hover:text-accent text-textSecondary dark:text-gray-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent text-textSecondary dark:text-gray-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start space-x-3 text-textSecondary dark:text-gray-400">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span>Lakhnauti Road, Ayodhya, UP 224001</span>
              </li>
              <li className="flex items-center space-x-3 text-textSecondary dark:text-gray-400">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-textSecondary dark:text-gray-400">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span>hello@starlinetravel.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-sm text-textSecondary dark:text-gray-400 mb-4 font-medium">
              Get curated travel deals straight to your inbox.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-backgroundSoft dark:bg-darkSecondary border border-borderLight dark:border-borderDark rounded-full py-3 pl-4 pr-24 text-sm focus:outline-none focus:border-accent text-textPrimary dark:text-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-accent hover:bg-yellow-500 text-darkBackground font-bold px-4 rounded-full text-sm transition-colors shadow-sm"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-borderLight dark:border-borderDark flex flex-col md:flex-row justify-between items-center text-xs text-textMuted dark:text-gray-500">
          <p>© 2026 Starline Travel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-textPrimary dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-textPrimary dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-textPrimary dark:hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;