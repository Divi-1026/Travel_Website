import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import TaxiService from './pages/TaxiService';
import TourPackages from './pages/TourPackages';
import WeddingRentals from './pages/WeddingRentals';
import DestinationDetails from './pages/DestinationDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Book } from 'lucide-react';
import BookingPage from './pages/Booking';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="taxi" element={<TaxiService />} />
            <Route path="packages" element={<TourPackages />} />
            <Route path="packages/:destination" element={<DestinationDetails />} />
            <Route path="wedding" element={<WeddingRentals />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="booking" element={<BookingPage/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
