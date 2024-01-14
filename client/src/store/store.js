import { create } from 'zustand';
// import { getClosestMatch } from '../config/helperfunctions';
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

//helper function for returning the closest match to the input from the options array
const getClosestMatch = (input, options) => {
  if (!input) return ''; // Return empty string if input is undefined or empty
  const matches = options.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
  return matches.sort()[0] || ''; // Return the first match alphabetically, or an empty string if no match
};

// Zustand store for global state management of autosuggestion data
export const useAutosuggestionStore = create((set) => ({
  colorSuggestion: '',
  elementTypeSuggestion: '',
  conditionSuggestion: '',
  manifestationSuggestion: '',
  setColorSuggestion: (input) => set({ colorSuggestion: getClosestMatch(input, colorOptions) }),
  setElementTypeSuggestion: (input) => set({ elementTypeSuggestion: getClosestMatch(input, elementTypeOptions) }),
  setConditionSuggestion: (input) => set({ conditionSuggestion: getClosestMatch(input, conditionOptions) }),
  setManifestationSuggestion: (input) => set({ manifestationSuggestion: getClosestMatch(input, manifestationOptions) }),
  clearAllSuggestions: () => set({ colorSuggestion: '', elementTypeSuggestion: '', conditionSuggestion: '', manifestationSuggestion: '' })
}));

