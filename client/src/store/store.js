import { create } from 'zustand';

export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({ progress: state.progress + 1 })),
  decreaseProgress: () => set((state) => ({ progress: state.progress - 1 })),
  resetProgress: () => set({ progress: 0 }),
}));


export const useMaterialStore = create(set => ({
  formData: {
    fileData: [],
    materialData: {},
    imagePreviews: [],
  },
  setFileData: (fileData) => set(state => ({ formData: { ...state.formData, fileData } })),
  setMaterialData: (materialData) => set(state => ({ formData: { ...state.formData, materialData } })),
  setImagePreviews: (imagePreviews) => set(state => ({ formData: { ...state.formData, imagePreviews } })),
}));
