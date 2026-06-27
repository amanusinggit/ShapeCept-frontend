const Badge = ({ children }) => {
  return (
    <div className="flex gap-3 justify-center w-fit items-center  px-4 py-1 rounded-full border border-rim bg-overlay text-brand-light mb-4">
      {children}
    </div>
  );
};

export default Badge;
