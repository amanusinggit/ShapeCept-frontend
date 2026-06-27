export const HeadingBlock = (props) => {
  const theme = {
    normal: {
      color: "white",
    },
    pdf: {
      color: "black",
    },
  };
  return (
    <div
      className="text-content text-3xl my-5 font-semibold"
      style={theme[props.type]}
    >
      {props.text}
    </div>
  );
};
