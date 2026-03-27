import { create } from "zustand";
import { IItinerary } from "../lib";
import { mockItineraries } from "@/shared/testData/testData";

interface IItineraryStore {
    itineraries: IItinerary[]

    setItineraries: (newItineraries: IItinerary[]) => void
}

export const useItineraryStore = create<IItineraryStore>((set) => ({
    itineraries: mockItineraries,

    setItineraries: (newItineraries) => set({itineraries: newItineraries}),
}))