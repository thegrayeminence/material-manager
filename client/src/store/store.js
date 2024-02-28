import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// import { getClosestMatch } from '../config/helperfunctions';
import {colorOptions, conditionOptions, manifestationOptions, elementTypeOptions} from '../config/formInputData';


// store for global 'progress' value that determines which form step to render
export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({progress: state.progress + 1})),
  decreaseProgress: () => set((state) => ({progress: state.progress - 1})),
  resetProgress: () => set({progress: 0}),
}))

export const useIsLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({isLoading}),
  toggleIsLoading: () => set((state) => ({isLoading: !state.isLoading})),
  resetIsLoading: () => set({isLoading: false}),
}));



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
  // imagePreviews: [],
  // setImagePreviews: (imagePreviews) => set({imagePreviews}),

}));



export const useGeneratedImagesStore = create(persist(
  (set) => ({
    // State
    albedoImage: null,
    materialName: null,
    pbrMapUrls: {normal: null, height: null, smoothness: null},
    albedoIsLoading: false,
    pbrIsLoading: false,
    promiseId: null,

    // Actions
    setAlbedoImage: (imageURL) => set(() => ({albedoImage: imageURL})),
    setMaterialName: (name) => set(() => ({materialName: name})),
    setPromiseId: (id) => set(() => ({promiseId: id})),
    setPbrMapUrls: (urls) => set(() => ({pbrMapUrls: urls})),
    setAlbedoIsLoading: (isLoading) => set(() => ({albedoIsLoading: isLoading})),
    setPbrIsLoading: (isLoading) => set(() => ({pbrIsLoading: isLoading})),
    clearImages: () => set(() => ({
      albedoImage: null,
      pbrMapUrls: {normal: null, height: null, smoothness: null},
    }))
  }),
  {
    name: 'images-store', // unique name for localStorage
    getStorage: () => localStorage, // Define the storage type
  }
));




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

