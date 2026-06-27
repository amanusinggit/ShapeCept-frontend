import Badge from "../Components/Badge";
import changeMinuteFormat from "../Utils/minutesToDDHHMM";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import useModuleStore from "../app/ModuleStore";
import useCourseStore from "../app/CourseStore";
import { FETCH_MODULES_API } from "../Constants/API_Constants";

const Course = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { courseId } = useParams();
  const courseModules = useModuleStore((state) => state.modules);
  const updateModules = useModuleStore((state) => state.updateModules);
  const courses = useCourseStore((state) => state.courses);
  const course = courses.find((course) => course._id === courseId);
  useEffect(() => {
    const fetchCourseForUser = async () => {
      try {
        const response = await fetch(FETCH_MODULES_API + courseId, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        });
        const modules = await response.json();
        updateModules(modules);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCourseForUser();
  }, [getAccessTokenSilently, updateModules, courseId]);
  const navigate = useNavigate();
  const navigateToCourses = () => {
    navigate("/courses");
  };
  return (
    <div className="p-8 md:p-22">
      <button
        onClick={navigateToCourses}
        className="text-content-muted flex items-center gap-2"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>back to library</span>
      </button>
      <div className="flex gap-2 mt-6 flex-wrap text-base">
        {course.tags.map((tag) => (
          <Badge>
            <i class="fa-solid fa-graduation-cap"></i>
            <span>{tag}</span>
          </Badge>
        ))}
      </div>
      <div className="text-content text-4xl my-2">{`${course.title}`}</div>
      <div className="text-content-muted  mb-2">{`${course.description}`}</div>
      <div className="flex gap-2 text-content-muted">
        <span>{`${course?.progress}`}%</span>
        <span>•</span>
        <span>{`${changeMinuteFormat(course?.totalTimeRequired)}`}</span>
      </div>
      <div className="my-8">
        {courseModules.map((module, index) => (
          <Link
            to={`/courses/course/${courseId}/modules/module/${module._id}/lessons`}
            key={module._id}
          >
            <div className="flex p-6 bg-deep  border border-rim-strong rounded-xl gap-4 my-4 text-content-muted hover:border-content-muted-400">
              <div className="flex grow gap-3 min-w-0">
                <div className="aspect-square flex items-center justify-center border border-rim bg-content text-content-muted p-2 rounded-xl text-xl font-semibold">
                  {module.completed ? (
                    <i className="fa-solid fa-check text-success"></i>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-content grow min-w-0">
                  <div className="truncate">{module.title}</div>
                  {/* <div className=" text-content-muted-600 min-w-0"> */}
                  <div className="truncate">{module.description} Lessons</div>
                  {/* </div> */}
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

export default Course;
