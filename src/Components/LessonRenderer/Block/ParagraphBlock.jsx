const ParagraphBlock = (props) => {
  const theme = {
    normal: {
      color: "white",
    },
    pdf: {
      color: "black",
    },
  };
  return (
    <div className="text-content py-3" style={theme[props.type]}>
      {props.text}
    </div>
  );
};

export default ParagraphBlock;
