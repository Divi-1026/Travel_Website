import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    assignedVehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    },
    experience: Number,
    rating: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Driver's availability
    isAvailable: {
        type: Boolean,
        default: true
    },
    // Driver's leave dates
    leaveDates: [{
        fromDate: Date,
        toDate: Date,
        reason: String
    }],
    profileImage: String
}, { timestamps: true });

export const Driver = mongoose.model('Driver', driverSchema);