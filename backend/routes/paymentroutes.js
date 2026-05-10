import express from 'express';
import {
    getAllVehicles,
    calculateFare,
    createTaxiBooking,
    checkoutSuccess,
    getUserBookings,
    cancelBooking
} from '../controller/paymentcontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const paymentrouter = express.Router();

// Public routes
paymentrouter.get('/vehicles', getAllVehicles);

// Protected routes (need login)
paymentrouter.post('/calculate-fare', protect, calculateFare);
paymentrouter.post('/create-booking', protect, createTaxiBooking);
paymentrouter.post('/checkout-success', protect, checkoutSuccess);
paymentrouter.get('/my-bookings', protect, getUserBookings);
paymentrouter.put('/cancel-booking/:orderId', protect, cancelBooking);

export default paymentrouter;