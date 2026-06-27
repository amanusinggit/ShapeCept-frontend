import { Link, useNavigate, useParams } from "react-router";
import CodeBlock from "./Block/CodeBlock";
import { HeadingBlock } from "./Block/HeadingBlock";
import MCQBlock from "./Block/MCQBlock";
import ParagraphBlock from "./Block/ParagraphBlock";
import VideoBlock from "./Block/VideoBlock";
import useLessonStore from "../../app/LessonStore";
import { useEffect, useRef, useState } from "react";
import Badge from "../Badge";
import { PuffLoader } from "react-spinners";
import LessonExporter from "../lessonExporter";
import { useAuth0 } from "@auth0/auth0-react";
import useCourseStore from "../../app/CourseStore";
import {
  FETCH_AUDIO_API,
  FETCH_COURSES_API,
  FETCH_LESSONS_API,
  MARK_LESSON_COMPLETE_API,
} from "../../Constants/API_Constants";

const LessonRenderer = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { courseId } = useParams();
  const { moduleId } = useParams();
  // const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toggleConclusion, setToggleConclusion] = useState(false);
  const audio = useRef(null);
  const lessons = useLessonStore((state) => state.lessons);
  const lessonIds = lessons.map((lesson) => lesson._id);
  const [lessonIdIndex, setLessonIdIndex] = useState();
  const updateLesson = useLessonStore((state) => state.updateLesson);
  const updateCourses = useCourseStore((state) => state.updateCourses);
  const { getAccessTokenSilently } = useAuth0();
  const lesson = lessons.find((lesson) => {
    return lesson._id === lessonId;
  });
  const toggleConclusionAction = () => {
    setToggleConclusion(!toggleConclusion);
  };
  const playAudio = () => {
    setPlaying(true);
    audio.current.play();
  };
  const restartAudio = () => {
    setPlaying(false);
    audio.current.load();
  };
  const pauseAudio = () => {
    setPlaying(false);
    audio.current.pause();
  };
  const fetchConclusionAudio = () => {
    if (audio.current !== null) pauseAudio();
    setPlaying(false);
    if (audio.current === null && toggleConclusion === false) {
      try {
        const getAudio = async () => {
          setLoading(true);
          try {
            const response = await fetch(FETCH_AUDIO_API, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${await getAccessTokenSilently()}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: lesson.conclusion }),
            });
            if (!response.ok) {
              const { message } = await response.json();
              throw new Error(message);
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            audio.current = new Audio(url);
            // setAudio(new Audio(url));
            // console.log(typeof audio);
            audio.current.addEventListener("ended", () => {
              setPlaying(false);
            });
            setLoading(false);
          } catch (error) {
            setError(error.message);
          }
        };
        getAudio();
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    }

    toggleConclusionAction();
  };
  const navigateToPrev = () => {
    if (lessonIdIndex === 0) return;
    navigate(`../${lessonIds[lessonIdIndex - 1]}`, {
      relative: "path",
      replace: true,
    });
  };
  const navigateToNext = () => {
    if (lessonIdIndex === lessonIds.length) return;
    navigate(`../${lessonIds[lessonIdIndex + 1]}`, {
      relative: "path",
      replace: true,
    });
  };
  const markLessonAsComplete = async () => {
    try {
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
      const markComplete = async () => {
        const response = await fetch(
          MARK_LESSON_COMPLETE_API(courseId, moduleId, lessonId),
          {
            method: "PATCH",
            headers: {
              authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("error marking the lesson as complete");
        }
        await fetchLessonForUser();
        await getCoursesForUser();
      };
      markComplete();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(audio.current);
    setLessonIdIndex(lessonIds.findIndex((lesson) => lesson === lessonId));
  }, [lessonId, lessonIds]);
  const componentType = {
    heading: HeadingBlock,
    paragraph: ParagraphBlock,
    code: CodeBlock,
    mcq: MCQBlock,
    video: VideoBlock,
  };
  return (
    <>
      <div className="relative flex grow items-start">
        <div className="w-3/12 sticky top-0 px-8 hidden md:block">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="text-content-muted flex items-center gap-2 my-8 mx-3 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>go back</span>
          </button>

          <div className="my-8 mx-3">
            {lessons.map((lesson) => (
              <Link to={`../${lesson._id}`} relative="path" replace>
                <div
                  className={`flex p-4 border rounded-xl gap-4 my-4 text-content-muted bg-deep hover:border-content-muted-300 ${lesson._id === lessonId ? "border-content-muted-300" : " border-rim-strong"}`}
                >
                  <div className="flex grow gap-3 min-w-0">
                    <div className="text-content grow min-w-0 flex items-center">
                      <div className="truncate">{lesson.title}</div>
                      {/* <div className="flex gap-3 text-content-muted-600">
                      <span>{"Approximate Time Lessons"}</span>
                    </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-9/12 w-full p-8 md:p-16 py-4">
          <div className="md:hidden">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="text-content-muted flex items-center gap-2 my-8 mx-3 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>go back</span>
            </button>
          </div>
          <div className="flex justify-end gap-3">
            <LessonExporter componentType={componentType} lesson={lesson} />
            <Badge>
              <button
                className="hover:shadow text-violet-brand cursor-pointer hidden md:block truncate"
                onClick={fetchConclusionAudio}
              >
                {toggleConclusion ? "Close" : "Too long don't wanna read"}
              </button>
              <button
                className="hover:shadow text-violet-brand cursor-pointer block md:hidden truncate"
                onClick={fetchConclusionAudio}
              >
                {toggleConclusion ? "Close" : "Conclusion"}
              </button>
            </Badge>
          </div>
          {toggleConclusion && (
            <div className="relative border border-rim rounded-lg bg-deep m-8 p-8 text-content pt-16 flex justify-center items-center">
              {error ? (
                <div className="min-w-0 wrap-break-word">{error}</div>
              ) : loading ? (
                <PuffLoader color="#5b6af5" />
              ) : (
                <div>
                  <div className=" absolute top-0 right-0 flex gap-3 m-6 text-xl">
                    {!playing ? (
                      <button className="cursor-pointer" onClick={playAudio}>
                        <i className="fa-solid fa-circle-play"></i>
                      </button>
                    ) : (
                      <button className="cursor-pointer" onClick={pauseAudio}>
                        <i class="fa-solid fa-circle-pause"></i>
                      </button>
                    )}
                    <button className="cursor-pointer" onClick={restartAudio}>
                      <i class="fa-solid fa-arrow-rotate-right"></i>
                    </button>
                  </div>
                  <div>
                    {lesson.conclusion
                      ? lesson.conclusion
                      : "This lesson has no conclusion generated."}
                  </div>
                </div>
              )}
            </div>
          )}
          {lesson.content.map((element) => {
            const Component = componentType[element?.type];
            return Component && <Component {...element} type={"normal"} />;
          })}
          <div className="flex justify-between font-semibold my-6 mb-15 md:p-4 w-full">
            <button
              disabled={lessonIdIndex === 0}
              onClick={navigateToPrev}
              className="bg-brand-primary rounded-full text-content px-6 py-3 flex justify-center items-center gap-2 disabled:bg-content-muted"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span className="hidden md:block">Previous</span>
            </button>
            <button
              onClick={markLessonAsComplete}
              className="bg-brand-primary rounded-full text-content px-6 py-3 flex justify-center items-center gap-2 "
            >
              {lesson.completed ? (
                <>
                  <i class="fa-solid fa-circle-check"></i>
                  <span className="hidden md:block">Completed</span>
                </>
              ) : (
                <>
                  <i class="fa-regular fa-circle-check"></i>
                  <span className="hidden md:block">Mark As Completed</span>
                </>
              )}
            </button>
            <button
              disabled={lessonIdIndex === lessonIds.length - 1}
              onClick={navigateToNext}
              className="bg-brand-primary rounded-full text-content px-6 py-3 flex justify-center items-center gap-2 disabled:bg-content-muted"
            >
              <i className="fa-solid fa-arrow-right"></i>
              <span className="hidden md:block">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonRenderer;
