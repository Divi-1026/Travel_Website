import { create } from 'zustand';

const useBookingStore = create((set) => ({
  searchDetails: {
    pickup: '',
    drop: '',
    date: '',
    time: '',
    vehicle: 'Sedan',
    passengers: '1-2'
  },
  estimatedFare: null,
  updateSearchDetails: (details) => set((state) => ({ searchDetails: { ...state.searchDetails, ...details } })),
  setEstimatedFare: (fare) => set({ estimatedFare: fare }),
  clearBooking: () => set({ 
    searchDetails: {
      pickup: '',
      drop: '',
      date: '',
      time: '',
      vehicle: 'Sedan',
      passengers: '1-2'
    },
    estimatedFare: null
  })
}));

export default useBookingStore;
