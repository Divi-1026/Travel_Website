import mongoose from 'mongoose';

const taxiOrderSchema = new mongoose.Schema({
    // User who booked
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    
    // Vehicle booked
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
        index: true
    },
    
    // Customer Details (snapshot at booking time)
    customerDetails: {
        name: {
            type: String,
            required: true
        },
        email: String,
        phone: {
            type: String,
            required: true
        }
    },
    
    // Trip Details
    tripDetails: {
        pickupLocation: {
            type: String,
            required: true
        },
        dropLocation: {
            type: String,
            required: true
        },
        travelDate: {
            type: Date,
            required: true,
            index: true
        },
        travelTime: String,
        distance: {
            type: Number,  // in km
            default: 0
        },
        duration: {
            type: Number,  // in hours
            default: 0
        },
        passengers: {
            type: Number,
            default: 1
        },
        specialRequests: String
    },
    
    // Pricing
    pricing: {
        baseFare: Number,
        perKmRate: Number,
        perHourRate: Number,
        distanceCharge: Number,
        hourlyCharge: Number,
        nightCharge: Number,
        gst: Number,
        totalAmount: {
            type: Number,
            required: true
        }
    },
    
    // Payment
    payment: {
        method: {
            type: String,
            enum: ['stripe', 'razorpay', 'cash'],
            default: 'stripe'
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending'
        },
        transactionId: {
            type: String,
            unique: true,
            sparse: true
        },
        stripeSessionId: String,
        paidAt: Date
    },
    
    // Booking Status
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
        default: 'pending',
        index: true
    },
    
    // Cancellation
    cancellation: {
        cancelledAt: Date,
        reason: String,
        cancelledBy: {
            type: String,
            enum: ['user', 'admin', 'system']
        },
        refundAmount: Number
    }
    
}, { timestamps: true });


taxiOrderSchema.index({ 
    vehicle: 1, 
    "tripDetails.travelDate": 1, 
    bookingStatus: 1 
});

// Index for user's bookings
taxiOrderSchema.index({ user: 1, createdAt: -1 });

// Index for date range queries
taxiOrderSchema.index({ "tripDetails.travelDate": 1 });

export const TaxiOrder = mongoose.model('TaxiOrder', taxiOrderSchema);