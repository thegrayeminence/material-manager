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

export const useIsLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({isLoading}),
  resetIsLoading: () => set({isLoading: false}),
}));


// store for global values for form settings and options (e.g. AI generation mode/manual uploads)
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

}));

// // Store for managing generated images
// export const useGeneratedImagesStore = create(set => ({
//   // Array to store URLs of generated images
//   generatedImages: [],

//   // Method to set the generated images
//   setGeneratedImages: (generatedImages) => set({generatedImages}),
//   // Method to add a single generated image
//   addGeneratedImage: (imageURL) => set(state => ({generatedImages: [...state.generatedImages, imageURL]})),
//   // Method to clear all generated images
//   clearGeneratedImages: () => set({generatedImages: []}),
// }));


export const useGeneratedImagesStore = create(set => ({
  // Separate state for the albedo image
  albedoImage: null,

  // Separate state for the PBR images
  pbrImages: {
    normal: null,
    height: null,
    smoothness: null
  },

  // Method to set the albedo image
  setAlbedoImage: (imageURL) => set({albedoImage: imageURL}),

  // Method to set a specific PBR image
  setPBRImage: (type
    , imageURL) => set(state => ({
      pbrImages: {...state.pbrImages, [type]: imageURL}
    })),

  // Method to clear all images
  clearImages: () => set({albedoImage: null, pbrImages: {normal: null, height: null, smoothness: null}})
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

