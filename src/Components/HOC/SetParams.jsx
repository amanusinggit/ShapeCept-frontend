import { useParams } from "react-router";

const SetParams = ({ Component }) => {
  const { lessonId } = useParams();
  return <Component key={lessonId} />;
};

export default SetParams;
