import mongoose from 'mongoose';

// This model stores blocked dates for vehicles
// Useful for maintenance, driver leaves, etc.

const vehicleAvailabilitySchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
        index: true
    },
    // Blocked dates (maintenance, driver off, etc.)
    blockedDates: [{
        date: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            enum: ['maintenance', 'driver_leave', 'holiday', 'other'],
            default: 'other'
        },
        description: String
    }],
    // Weekly off settings
    weeklyOff: {
        enabled: { type: Boolean, default: false },
        days: [{
            type: Number,  // 0=Sunday, 1=Monday, etc.
            enum: [0, 1, 2, 3, 4, 5, 6]
        }]
    }
}, { timestamps: true });

// Compound index for quick date lookup
vehicleAvailabilitySchema.index({ vehicle: 1, "blockedDates.date": 1 });

export const VehicleAvailability = mongoose.model('VehicleAvailability', vehicleAvailabilitySchema);