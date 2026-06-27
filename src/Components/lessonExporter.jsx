import Badge from "./Badge";
import { useRef, useState } from "react";
import { canvasToMultiPagePDF } from "../Utils/canvasToPDF";
import { PuffLoader } from "react-spinners";

const LessonExporter = ({ componentType, lesson }) => {
  const [loading, setLoading] = useState(false);
  const lessonPDF = useRef();
  const downloadPdf = async () => {
    try {
      //   const canvas = await html2canvas(lessonPDF.current);
      setLoading(true);
      await canvasToMultiPagePDF(lessonPDF.current, lesson.title);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <button onClick={downloadPdf} className="cursor-pointer">
        <Badge>
          <i class="fa-solid fa-file-arrow-down"></i>
          <span className="truncate">Download Lesson Pdf</span>
        </Badge>
      </button>
      {loading && (
        <div className="flex items-center mb-4">
          <PuffLoader color="#5b6af5" size="17" />
        </div>
      )}
      <div
        ref={lessonPDF}
        className="fixed -z-50 bg-content px-4 py-3 text-black m-22 border border-black"
      >
        {lesson.content.map((element) => {
          const Component = componentType[element?.type];
          return (
            Component && (
              <div className="border border-transparent">
                <Component {...element} type={"pdf"} />
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default LessonExporter;
