const Logo = ({ size = "3xl" }) => {
  const sizeMap = {
    "3xl": "text-3xl",
    "5xl": "text-5xl",
  };
  return (
    <div className="w-full m-2 flex justify-center items-center ">
      <div
        className={`text-violet-brand font-bold ${sizeMap[size]} hidden md:block`}
      >
        Shape<span className="text-content">Cept</span>
      </div>
      <div
        className={`text-violet-brand font-bold ${sizeMap[size]} block md:hidden`}
      >
        S<span className="text-content">C</span>
      </div>
    </div>
  );
};

export default Logo;
