const VideoBlock = (props) => {
  return (
    <>
      {props.type === "normal" ? (
        <div className="text-content p-8 md:p-16">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${props.url}?si=i6tP7c-4GOWgOaMh`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      ) : (
        <div className="p-2">
          Link:
          <a
            className="text-link"
            href={`https://www.youtube.com/embed/${props.url}?si=i6tP7c-4GOWgOaMh`}
          >
            https://www.youtube.com/embed/${props.url}?si=i6tP7c-4GOWgOaMh
          </a>
        </div>
      )}
    </>
  );
};

export default VideoBlock;
