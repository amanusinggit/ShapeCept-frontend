export const API = "https://shapecept-backend.onrender.com/";
export const GENERATE_COURSE_API = API + "generateCourse";
export const FETCH_COURSES_API = API + "getCourses";
export const REMOVE_COURSE_API = API + "removeCourse/";
export const FETCH_AUDIO_API = API + "audio";
export const FETCH_LESSONS_API = API + "getLessons/";
export const MARK_LESSON_COMPLETE_API = (courseId, moduleId, lessonId) =>
  API + `course/${courseId}/module/${moduleId}/lesson/${lessonId}`;

export const FETCH_MODULES_API = API + "getModules/";
export const ADD_USER_API = API + "addUser";
