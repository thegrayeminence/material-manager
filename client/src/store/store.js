import { create } from 'zustand';


export const useProgressStore = create((set) => ({
  progress: 0,
  increaseProgress: () => set((state) => ({ progress: state.progress + 1 })),
  decreaseProgress:() => set((state) => ({ progress: state.progress - 1 })),
  resetProgress: () => set({ progress: 0 }),
}))

// const { progress, increaseProgress, decreaseProgress, resetProgress  } = useProgressStore()


