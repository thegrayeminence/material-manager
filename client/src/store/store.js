import { create } from 'zustand';

import { colorOptions, conditionOptions, manifestationOptions, elementTypeOptions } from  '../config/formInputData';


export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({ progress: state.progress + 1 })),
  decreaseProgress:() => set((state) => ({ progress: state.progress - 1 })),
  resetProgress: () => set({ progress: 0 }),
}))



// Zustand store for global state management of materialData/fileData/imagePreviews from form inputs
export const useMaterialStore = create(set => ({
  // Other formData properties
  formData: {
      fileData: [],
      materialData: {},
  },
  setFileData: (fileData) => set(state => ({ formData: { ...state.formData, fileData } })),
  setMaterialData: (materialData) => set(state => ({ formData: { ...state.formData, materialData } })),

  // Separate state for imagePreviews
  imagePreviews: [],
  setImagePreviews: (imagePreviews) => set({ imagePreviews }),
}));


//global state management of autosuggestion data for physical properties form inputs
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


// Helper functions for autosuggestion store (updating data)
export const updateSuggestions = (input, type) => {
  const store = useAutosuggestionStore.getState();
  let suggestions = [];
  switch (type) {
    case 'color':
      suggestions = colorOptions.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
      store.setColorSuggestions(suggestions);
      break;
    case 'elementType':
      suggestions = elementTypeOptions.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
      store.setElementTypeSuggestions(suggestions);
      break;
    case 'condition':
      suggestions = conditionOptions.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
      store.setConditionSuggestions(suggestions);
      break;
    case 'manifestation':
      suggestions = manifestationOptions.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
      store.setManifestationSuggestions(suggestions);
      break;
    default:
      break;
  }
};
// Helper functions for autosuggestion store (clearing data)
export const clearSuggestions = (type) => {
  const store = useAutosuggestionStore.getState();
  switch (type) {
    case 'color':
      store.setColorSuggestions([]);
      break;
    case 'elementType':
      store.setElementTypeSuggestions([]);
      break;
    case 'condition':
      store.setConditionSuggestions([]);
      break;
    case 'manifestation':
      store.setManifestationSuggestions([]);
      break;
    default:
      store.clearAllSuggestions();
      break;
  }
};