import { getTheme } from "../../Utils/Theme";

const withEnhancedUI = (Component) => {
  return (props) => {
    const id = props.course._id;
    const theme = getTheme(id);

    return (
      <div className="relative">
        <div
          className={`absolute top-0 w-full border-t-4 ${theme.border} rounded-lg inset-0`}
        ></div>
        <Component {...props} />
      </div>
    );
  };
};

export default withEnhancedUI;
