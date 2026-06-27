import { Link, useNavigate, useParams } from "react-router";
import Badge from "../Components/Badge";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import useLessonStore from "../app/LessonStore";
import useModuleStore from "../app/ModuleStore";
import getOrdinalSuffix from "../Utils/getOrdinalSuffix";
import {
  FETCH_LESSONS_API,
  MARK_LESSON_COMPLETE_API,
} from "../Constants/API_Constants";

const Lessons = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { courseId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const lessons = useLessonStore((state) => state.lessons);
  const modules = useModuleStore((state) => state.modules);
  const moduleIndex = modules.reduce(
    (acc, module, index) => (module._id === moduleId ? index : acc),
    null,
  );
  const module = modules.find((module) => module._id === moduleId);
  const updateLesson = useLessonStore((state) => state.updateLesson);

  const markLessonAsComplete = () => {
    try {
      const markComplete = async (lessonId) => {
        const response = await fetch(
          MARK_LESSON_COMPLETE_API(courseId, moduleId, lessonId),
          { method: "UPDATE" },
        );
        const json = await response.json();
        if (!response.ok) {
          throw new Error("error marking the lesson as complete");
        }
        console.log(json);
      };
      markComplete();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchLessonForUser = async () => {
      try {
        const response = await fetch(FETCH_LESSONS_API + moduleId, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        });
        const lessons = await response.json();
        updateLesson(lessons);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLessonForUser();
  }, [getAccessTokenSilently, updateLesson, moduleId]);
  return (
    <div className="p-8 md:p-22">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="text-content-muted flex items-center gap-2"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>go back</span>
      </button>
      <div className="flex gap-2 mt-6">
        <Badge>
          <span>
            {moduleIndex + 1}
            {getOrdinalSuffix(moduleIndex + 1)} module
          </span>
        </Badge>
      </div>
      <div className="text-content text-4xl my-2">{module.title}</div>
      <div className="text-content-muted text-xl mb-2">
        {module.description}
      </div>
      {/* <div className="flex gap-2 text-content-muted-600">
        <span>{`${courses[0].progress}%`}</span>
        <span>•</span>
        <span>{`${changeMinuteFormat(courses[0].ApproximateTime)}`}</span>
        <span>•</span>
        <span>{`${courses[0].modules.length} Modules`}</span>
      </div> */}
      <div className="my-8">
        {lessons.map((lesson, index) => (
          <Link to={`lesson/${lesson._id}`}>
            <div className="flex p-6 border border-rim-strong rounded-xl gap-4 my-4 text-content-muted bg-deep hover:border-content-muted-300">
              <div className="flex grow gap-3 min-w-0">
                <button
                  onClick={() => {
                    markLessonAsComplete(lesson._id);
                  }}
                  className="aspect-square flex items-center justify-center border border-rim bg-raised text-content-muted p-2 rounded-xl text-xl font-semibold"
                >
                  {lesson.completed ? (
                    <i className="fa-solid fa-check text-success"></i>
                  ) : (
                    index + 1
                  )}
                </button>
                <div className="text-content grow min-w-0 flex items-center">
                  <div className="truncate">{lesson.title}</div>
                  {/* <div className="flex gap-3 text-content-muted-600">
                    <span>{"Approximate Time Lessons"}</span>
                  </div> */}
                </div>
              </div>
              <div className="flex items-center justify-center mr-6">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
