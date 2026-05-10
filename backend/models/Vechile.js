import mongoose from 'mongoose';
const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['economy', 'sedan', 'suv', 'luxury', 'tempo_traveller'],
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    pricePerKm: {
        type: Number,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    nightCharge: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    totalBookings: {
        type: Number,
        default: 0
    },
    registrationNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    model: String,
    year: Number,
    color: String
}, { timestamps: true });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);