import { stripe } from "../config/stripe.js";
import { TaxiOrder } from "../models/TaxiOrder.js";
import { Vehicle } from "../models/Vechile.js";
import User from "../models/user.js";

// ============ GET ALL VEHICLES ============
export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ isAvailable: true });
        res.json({ success: true, vehicles });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ============ CALCULATE TAXI FARE ============
export const calculateFare = async (req, res) => {
    try {
        const { vehicleId, distance, duration, travelDate } = req.body;
        
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        
        let total = 0;
        
        // Distance charge
        const distanceCharge = distance * vehicle.pricePerKm;
        total += distanceCharge;
        
        // Hourly charge
        const hourlyCharge = duration * vehicle.pricePerHour;
        total += hourlyCharge;
        
        // Night charge (10 PM to 6 AM)
        let nightCharge = 0;
        if (travelDate) {
            const hour = new Date(travelDate).getHours();
            if (hour >= 22 || hour < 6) {
                nightCharge = vehicle.nightCharge;
                total += nightCharge;
            }
        }
        
        // GST 5%
        const gst = total * 0.05;
        total += gst;
        
        res.json({
            success: true,
            breakdown: {
                distanceCharge,
                hourlyCharge,
                nightCharge,
                gst,
                totalAmount: total
            }
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ============ CREATE TAXI BOOKING (Stripe Checkout) ============
export const createTaxiBooking = async (req, res) => {
    try {
        const {
            vehicleId,
            pickupLocation,
            dropLocation,
            travelDate,
            distance,
            duration,
            numberOfTravelers,
            specialRequests,
            totalAmount
        } = req.body;
        
        // Validation
        if (!vehicleId || !pickupLocation || !dropLocation || !travelDate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        
        // Create Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `${vehicle.name} - Taxi Booking`,
                            description: `${pickupLocation} to ${dropLocation} | ${distance}km | ${duration}hrs`,
                            images: vehicle.image ? [vehicle.image] : [],
                        },
                        unit_amount: Math.round(totalAmount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                userId: req.user._id.toString(),
                vehicleId: vehicleId.toString(),
                pickupLocation: pickupLocation,
                dropLocation: dropLocation,
                travelDate: travelDate,
                distance: distance?.toString() || "0",
                duration: duration?.toString() || "0",
                numberOfTravelers: numberOfTravelers?.toString() || "1",
                totalAmount: totalAmount.toString(),
                specialRequests: specialRequests || ""
            }
        });
        
        res.json({
            success: true,
            url: session.url,
            sessionId: session.id
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ============ HANDLE SUCCESSFUL PAYMENT ============
export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        
        if (!sessionId) {
            return res.status(400).json({ message: "Session ID required" });
        }
        
        // Check if order already exists
        const existingOrder = await TaxiOrder.findOne({ stripeSessionId: sessionId });
        if (existingOrder) {
            return res.json({ message: "Order already exists", orderId: existingOrder._id });
        }
        
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.payment_status === "paid") {
            const meta = session.metadata;
            
            // Create new taxi order
            const order = new TaxiOrder({
                user: meta.userId,
                vehicle: meta.vehicleId,
                pickupLocation: meta.pickupLocation,
                dropLocation: meta.dropLocation,
                travelDate: new Date(meta.travelDate),
                distance: parseInt(meta.distance) || 0,
                duration: parseInt(meta.duration) || 0,
                numberOfTravelers: parseInt(meta.numberOfTravelers) || 1,
                specialRequests: meta.specialRequests || "",
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId,
                paymentStatus: "paid",
                bookingStatus: "confirmed"
            });
            
            await order.save();
            
            res.json({
                success: true,
                message: "Booking confirmed!",
                orderId: order._id
            });
        } else {
            res.status(400).json({ message: "Payment not completed" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ============ GET USER'S BOOKINGS ============
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await TaxiOrder.find({ user: req.user._id })
            .populate('vehicle', 'name category image')
            .sort({ createdAt: -1 });
        
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ============ CANCEL BOOKING ============
export const cancelBooking = async (req, res) => {
    try {
        const { orderId } = req.params;
        
        const order = await TaxiOrder.findOne({ _id: orderId, user: req.user._id });
        
        if (!order) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        if (order.bookingStatus === "cancelled") {
            return res.status(400).json({ message: "Booking already cancelled" });
        }
        
        order.bookingStatus = "cancelled";
        order.cancelledAt = new Date();
        order.cancelReason = req.body.reason || "Cancelled by user";
        
        await order.save();
        
        res.json({ success: true, message: "Booking cancelled successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};