import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCourseStore = create(
  persist(
    (set) => ({
      courses: [],
      updateCourses: (courses) => set(() => ({ courses })),
    }),
    { name: "UserCourses" },
  ),
);

export default useCourseStore;
