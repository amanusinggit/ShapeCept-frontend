import { useEffect, useState } from "react";
import SearchBox from "../Components/SearchBox";
import CourseCard from "../Components/CourseCard/CourseCard.jsx";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import useCourseStore from "../app/CourseStore.js";
import { PuffLoader } from "react-spinners";
import Badge from "../Components/Badge.jsx";
import { ADD_USER_API, FETCH_COURSES_API } from "../Constants/API_Constants.js";

const Home = () => {
  // const [userCourses, setUserCourses] = useState(courses);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const navigateToCourses = () => {
    navigate("/courses");
  };
  const updateCourses = useCourseStore((state) => state.updateCourses);
  const courses = useCourseStore((state) => state.courses);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const setUser = async () => {
      try {
        await fetch(ADD_USER_API, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        });
        getCoursesForUser();
      } catch (error) {
        console.log(error.message);
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
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    setUser();
  }, [getAccessTokenSilently, updateCourses]);
  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center grow">
  //       <PuffLoader color="#5b6af5" />
  //     </div>
  //   );
  return (
    <div className="grow flex flex-col">
      <div className="font-bold  flex flex-col items-center justify-end h-[35vh] md:h-[40vh]  p-8 md:py-15">
        {/* <div className="">
          <div className="flex items-center justify-center text-4xl">
            Shape Concepts
            <span className="text-content pl-2">Instantly</span>
          </div>
          <div className="text-xl font-bold text-content flex items-center justify-between">
            Shape <span className="text-violet-brand px-2">Instantly </span>
            Concepts
          </div>
        </div> */}
        <div className="flex justify-center text-lg">
          <Badge>
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>Shape Concepts Instantly</span>
          </Badge>
        </div>
        <div className="flex justify-center flex-col text-4xl md:text-6xl">
          <div className="font-bold  text-content">Learn anything,</div>
          <div className="font-bold text-transparent bg-clip-text bg-linear-to-b from-brand-glow to-brand-primary">
            Instantly shaped
          </div>
        </div>
        <div className="text-content-muted text-base md:text-xl my-2 text-center">
          Type any topic and get a complete course — modules, lessons, resources
        </div>
      </div>
      <SearchBox />
      <div className="p-8 md:p-22">
        <div className="flex justify-between items-center text-content">
          <div className="text-xl">Recently Generated Courses</div>
          <button
            onClick={navigateToCourses}
            className=" flex gap-4 border border-rim rounded-lg px-4 py-2 bg-overlay items-center cursor-pointer hover:shadow-lg hover:shadow-violet-muted"
          >
            See More<i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center grow">
            <PuffLoader color="#5b6af5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 my-6 md:grid-cols-4">
            {courses.length === 0 ? (
              <div className="col-span-3 flex justify-center items-center text-content-dim text-xl">
                No Courses To Show
              </div>
            ) : (
              courses
                .slice(-4)
                .reverse()
                .map((course) => (
                  <div className="relative">
                    <CourseCard
                      course={course}
                      key={course._id}
                      to={`courses/course/${course._id}`}
                    />
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
