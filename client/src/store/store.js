import { create } from 'zustand';


export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({ progress: state.progress + 1 })),
  decreaseProgress:() => set((state) => ({ progress: state.progress - 1 })),
  resetProgress: () => set({ progress: 0 }),
}))




// Zustand store for global state management of materialData/fileData/imagePreviews
export const useMaterialStore = create(set => ({
  fileData: [],
  materialData: {},
  imagePreviews: [],
  setFileData: (data) => set({ fileData: data }),
  setMaterialData: (data) => set({ materialData: data }),
  setImagePreviews: (data) => set({ imagePreviews: data })
}));
