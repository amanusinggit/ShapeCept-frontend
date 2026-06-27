import { create } from "zustand";
import { persist } from "zustand/middleware";

const useModuleStore = create(
  persist(
    (set) => ({
      modules: [],
      updateModules: (modules) => set(() => ({ modules })),
    }),
    { name: "CourseModules" },
  ),
);

export default useModuleStore;
