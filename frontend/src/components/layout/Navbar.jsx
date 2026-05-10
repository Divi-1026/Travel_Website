import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, User } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode based on screens

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Taxi Service', path: '/taxi' },
    { name: 'Wedding Rentals', path: '/wedding' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/80 dark:bg-darkBackground/80 backdrop-blur-xl border border-borderLight dark:border-borderDark rounded-full shadow-premium py-3 px-6 transition-all duration-300 animate-fade-in"
    >
      <div className="mx-auto w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-darkBackground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3l1.9 5.8a1 1 0 00.6.6L20.3 11.3a1 1 0 010 1.4l-5.8 1.9a1 1 0 00-.6.6L12 21a1 1 0 01-1.4 0l-1.9-5.8a1 1 0 00-.6-.6L2.3 12.7a1 1 0 010-1.4l5.8-1.9a1 1 0 00.6-.6L10.6 3a1 1 0 011.4 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none text-textPrimary dark:text-darkTextPrimary">
                Starline
              </span>
              <span className="text-[10px] tracking-[0.2em] font-medium text-textSecondary dark:text-darkTextSecondary">
                TRAVEL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors hover:text-accent relative group py-1 ${
                    isActive
                      ? 'text-accent'
                      : 'text-textPrimary dark:text-darkTextPrimary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent rounded-full animate-width-expand" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 text-textPrimary dark:text-white"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-textPrimary dark:text-white">
                  <User size={18} />
                  <span className="text-sm font-bold">{user?.name}</span>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-sm font-semibold text-textSecondary dark:text-gray-300 hover:text-accent transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="text-sm font-semibold text-textSecondary dark:text-gray-300 hover:text-accent transition-colors"
              >
                Sign Up
              </Link>
            )}

            <Link
              to="/taxi"
              className="bg-accent hover:bg-yellow-500 text-darkBackground font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-textPrimary dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-textPrimary dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-darkBackground/95 backdrop-blur-xl shadow-premium absolute top-full left-4 right-4 mt-3 rounded-3xl border border-borderLight dark:border-borderDark overflow-hidden animate-fade-in-up">
          <div className="px-4 py-5 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-textPrimary dark:text-darkTextPrimary hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="pt-4 px-4 space-y-3 border-t border-borderLight dark:border-borderDark">
                <div className="flex items-center space-x-2 text-textPrimary dark:text-white">
                  <User size={18} />
                  <span className="text-sm font-bold">{user?.name}</span>
                </div>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/'); }}
                  className="block w-full text-left text-textSecondary dark:text-gray-400 hover:text-accent font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 px-1">
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-xl text-base font-semibold text-textPrimary dark:text-darkTextPrimary hover:bg-black/5 dark:hover:bg-white/5"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <div className="pt-4 px-1">
              <Link
                to="/taxi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex justify-center bg-accent text-darkBackground font-bold px-6 py-3.5 rounded-full shadow-md"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;