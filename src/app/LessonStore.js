import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLessonStore = create(
  persist(
    (set) => ({
      lessons: [],
      updateLesson: (lessons) => set(() => ({ lessons })),
    }),
    { name: "ModuleLesson" },
  ),
);

export default useLessonStore;
