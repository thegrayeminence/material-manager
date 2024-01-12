import { create } from 'zustand';


export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({ progress: state.progress + 1 })),
  decreaseProgress:() => set((state) => ({ progress: state.progress - 1 })),
  resetProgress: () => set({ progress: 0 }),
}))




// Zustand store for global state management of materialData/fileData/imagePreviews
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