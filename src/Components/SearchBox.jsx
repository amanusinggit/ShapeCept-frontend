import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import useCourseStore from "../app/CourseStore";
import {
  FETCH_COURSES_API,
  GENERATE_COURSE_API,
} from "../Constants/API_Constants";

const SearchBox = () => {
  const [searchText, setSearchText] = useState();
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const updateCourses = useCourseStore((state) => state.updateCourses);
  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await fetch(GENERATE_COURSE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
        body: JSON.stringify({ prompt: searchText }),
      });
      const data = await res.json();
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
      getCoursesForUser();
      setLoading(false);
      setMessage(data.message);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="flex flex-col align-strech">
      <div className="flex justify-center gap-4">
        <div className="flex border border-rim rounded-lg py-2 pl-3 pr-2  gap-4 md:w-1/2">
          <input
            type="text"
            placeholder="Enter a topic"
            className="grow text-content bg-transparent focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={fetchCourse}
            className="bg-violet-brand text-content rounded-lg text-center px-4 py-2 font-semibold"
          >
            Create
          </button>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <PuffLoader color="#5b6af5" size="40" />
          </div>
        )}
      </div>
      {message && (
        <div className="flex justify-center mt-8">
          <div className=" text-content px-4 py-2 border border-rim-strong rounded-lg ">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
