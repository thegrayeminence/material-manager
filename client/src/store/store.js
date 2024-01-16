import {create} from 'zustand';
// import { getClosestMatch } from '../config/helperfunctions';
import {colorOptions, conditionOptions, manifestationOptions, elementTypeOptions} from '../config/formInputData';


// store for global 'progress' value that determines which form step to render
export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({progress: state.progress + 1})),
  decreaseProgress: () => set((state) => ({progress: state.progress - 1})),
  resetProgress: () => set({progress: 0}),
}))


// store for global values for form settings and options

// mode 0 = default mode w/ AI generation ; mode 1 = manual mode w/o AI generation
export const useFormMode = create((set) => ({
  mode: 0,
  incrementMode: () => set((state) => ({mode: state.mode + 1})),
  decrementMode: () => set((state) => ({mode: state.mode - 1})),
  resetMode: () => set({mode: 0}),
}))


// store for global state management of materialData/fileData/imagePreviews from form inputs
export const useMaterialStore = create(set => ({
  // Other formData properties
  formData: {
    fileData: [],
    materialData: {},
    jsonFormData: {},
  },
  setFileData: (fileData) => set(state => ({formData: {...state.formData, fileData}})),
  setMaterialData: (materialData) => set(state => ({formData: {...state.formData, materialData}})),
  // stores JsonData from Form Submission for Previewing/Debugging
  setJsonFormData: (jsonFormData) => set(state => ({formData: {...state.formData, jsonFormData}})),

  // Separate state for imagePreviews from manual file uploads
  imagePreviews: [],
  setImagePreviews: (imagePreviews) => set({imagePreviews}),

  // Separate state for generated images from API
  generatedImages: [],
  setGeneratedImages: (generatedImages) => set({generatedImages}),

}));



//helper function for returning the closest match to the input from the options array
const getClosestMatch = (input, options) => {
  if (!input) return [];
  const matches = options.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
  return matches.sort().slice(0, 5); // Return up to three matches
};


// Zustand store for global state management of autosuggestion data
export const useAutosuggestionStore = create((set) => ({
  colorSuggestion: [],
  elementTypeSuggestion: [],
  conditionSuggestion: [],
  manifestationSuggestion: [],
  setColorSuggestion: (input) => set({colorSuggestion: getClosestMatch(input, colorOptions)}),
  setElementTypeSuggestion: (input) => set({elementTypeSuggestion: getClosestMatch(input, elementTypeOptions)}),
  setConditionSuggestion: (input) => set({conditionSuggestion: getClosestMatch(input, conditionOptions)}),
  setManifestationSuggestion: (input) => set({manifestationSuggestion: getClosestMatch(input, manifestationOptions)}),
  clearAllSuggestions: () => set({colorSuggestion: '', elementTypeSuggestion: '', conditionSuggestion: '', manifestationSuggestion: ''})
}));

