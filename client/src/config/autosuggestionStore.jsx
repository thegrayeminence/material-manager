// autosuggestionStore.js
import create from 'zustand';

export const useAutosuggestionStore = create((set) => ({
  colorSuggestions: [],
  elementTypeSuggestions: [],
  conditionSuggestions: [],
  manifestationSuggestions: [],
  setColorSuggestions: (suggestions) => set({ colorSuggestions: suggestions }),
  setElementTypeSuggestions: (suggestions) => set({ elementTypeSuggestions: suggestions }),
  setConditionSuggestions: (suggestions) => set({ conditionSuggestions: suggestions }),
  setManifestationSuggestions: (suggestions) => set({ manifestationSuggestions: suggestions }),
  clearAllSuggestions: () => set({ 
    colorSuggestions: [], 
    elementTypeSuggestions: [], 
    conditionSuggestions: [], 
    manifestationSuggestions: [] 
  })
}));

