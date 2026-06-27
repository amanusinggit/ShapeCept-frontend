import { useState } from "react";
import changeMinuteFormat from "../../Utils/minutesToDDHHMM";
import { getTheme } from "../../Utils/Theme";
import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import useApplicationStore from "../../app/ApplicationStore";
import useCourseStore from "../../app/CourseStore";
import {
  FETCH_COURSES_API,
  REMOVE_COURSE_API,
} from "../../Constants/API_Constants";

const CourseCard = ({ course, to }) => {
  const { getAccessTokenSilently } = useAuth0();
  const theme = getTheme(course._id);
  const radius = "40";
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * ((100 - course.progress) / 100);
  const [options, setOption] = useState(false);
  const [message, setMessage] = useState(false);
  const headerHeight = useApplicationStore((state) => state.headerHeight);
  const updateCourses = useCourseStore((state) => state.updateCourses);

  const toggleOptions = () => {
    setOption(!options);
  };

  const deleteCourse = () => {
    try {
      const callDeleteCourse = async () => {
        try {
          const response = await fetch(REMOVE_COURSE_API + course._id, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
          });
          const json = await response.json();
          if (!response.ok) {
            throw new Error(json.message);
          }
          setTimeout(getCoursesForUser, 1500);
          setMessage(json);
        } catch (error) {
          console.log(error.message);
          setTimeout(() => {
            setMessage(null);
          }, 2500);
          setMessage({ text: error.message, success: false });
        }
      };
      const getCoursesForUser = async () => {
        try {
          const response = await fetch(FETCH_COURSES_API, {
            headers: {
              Authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
          });
          const responseData = await response.json();
          updateCourses(responseData);
        } catch (error) {
          console.log(error.message);
        }
      };
      callDeleteCourse();
    } catch (error) {
      setMessage(error.message);
      console.log(error.message);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg border border-rim bg-deep text-content px-4 py-3`}
    >
      {message && (
        <div
          style={{ top: `${headerHeight}px` }}
          className={`fixed text-content flex gap-3 items-center top-0 right-0 m-2 w-2/4 md:w-2/12 bg-obsidian border-b-2 border-violet-brand px-6 py-3 z-30 shadow`}
        >
          {message.success ? (
            <i className="fa-regular fa-circle-check text-green-600"></i>
          ) : (
            <i className="fa-regular fa-circle-xmark text-red-600"></i>
          )}
          {message.text}
        </div>
      )}
      <Link to={to} className="cursor-pointer z-10">
        <div className="relative flex justify-between items-strech p-4">
          <div
            className={`border border-rim-muted rounded-lg aspect-square flex items-center justify-center p-4 text-2xl my-2`}
          >
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div className="w-1/4 relative">
            <svg className="absolute h-full w-full" viewBox="0 0 100 100">
              <circle
                cx={"50%"}
                cy={"50%"}
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset="0"
                strokeWidth={4}
                stroke="#252843"
                fill="transparent"
              />
              <circle
                cx={"50%"}
                cy={"50%"}
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeWidth={4}
                stroke={`${theme.color}`}
                fill="transparent"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={15}
              >
                {`${course?.progress}%`}
              </text>
            </svg>
          </div>
        </div>
        <div className={`p-4`}>
          <div className="truncate text-content text-xl mb-2">
            {course?.title}
          </div>
          <div className="text-content-dim flex gap-4 mb-2 text-l">
            <span className="truncate">
              {changeMinuteFormat(course?.totalTimeRequired)}
            </span>
            <span>•</span>
            <span className="truncate">{course?.lessonCount} lessons</span>
          </div>
          <div className="w-full border border-rim-strong my-4">
            <div
              className={`border ${theme.border}`}
              style={{ width: `${course?.progress}%` }}
            ></div>
          </div>
        </div>
      </Link>
      <div className="absolute top-0 right-0 z-20">
        <button onClick={toggleOptions} className="p-4 pb-2 text-content z-20">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        {options && (
          <div className="absolute top-full bg-raised rounded-lg p-1 right-0 mr-2">
            <button
              onClick={deleteCourse}
              className="flex gap-2 hover:bg-deep px-4 py-2 rounded-lg items-center justify-center"
            >
              <i class="fa-solid fa-trash-can"></i>
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CourseCard;
