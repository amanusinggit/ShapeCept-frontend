import CourseCard from "../Components/CourseCard/CourseCard";
import withEnhancedUI from "../Components/CourseCard/withEnhancedUI";
import { useNavigate } from "react-router";
import Badge from "../Components/Badge";
import useCourseStore from "../app/CourseStore";

const Courses = () => {
  const courses = useCourseStore((state) => state.courses);
  const EnhancedCourseCard = withEnhancedUI(CourseCard);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="grow text-content p-8 md:p-22 flex flex-col">
      <Badge>
        <i className="fa-solid fa-book"></i>
        <span>My Courses</span>
      </Badge>
      <div className="flex justify-between md:items-end flex-col md:flex-row">
        <div>
          <div className="text-4xl text-content semi-bold mb-2">
            {" "}
            Your Library
          </div>
          <div className="text-l text-content-dim">
            All your AI generated course in one page.
          </div>
        </div>
        <button
          onClick={navigateToHome}
          className="my-2 md:m-0 px-6 py-3 rounded-lg border border-rim bg-brand-primary flex gap-2 items-center justify-center  hover:shadow-lg shadow-violet-brand/30 cursor-pointer"
        >
          <i className="fa-solid fa-plus"></i>Generate New
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {courses.length === 0 ? (
          <div className="col-span-3 flex justify-center items-center text-content-dim text-xl">
            No Courses To Show
          </div>
        ) : (
          courses.map((course) => (
            <EnhancedCourseCard
              key={course._id}
              course={course}
              to={`course/${course._id}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
