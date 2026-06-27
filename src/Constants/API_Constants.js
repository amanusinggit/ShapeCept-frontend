export const GENERATE_COURSE_API = "http://localhost:3000/generateCourse";
export const FETCH_COURSES_API = "http://localhost:3000/getCourses";
export const REMOVE_COURSE_API = "http://localhost:3000/removeCourse/";
export const FETCH_AUDIO_API = "http://localhost:3000/audio";
export const FETCH_LESSONS_API = "http://localhost:3000/getLessons/";
export const MARK_LESSON_COMPLETE_API = (courseId, moduleId, lessonId) =>
  `http://localhost:3000/markComplete/course/${courseId}/module/${moduleId}/lesson/${lessonId}`;

export const FETCH_MODULES_API = "http://localhost:3000/getModules/";
export const ADD_USER_API = "http://localhost:3000/addUser";
