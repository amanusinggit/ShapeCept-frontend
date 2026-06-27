import { NavLink } from "react-router";

const NavigationBar = () => {
  return (
    <ul className="flex gap-6 text-content font-medium  md-bg-transparent justify-center md:justify-start py-3 md:py-0">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 ${isActive ? "text-violet-brand border border-violet-brand bg-violet-brand/20 rounded-xl" : "hover:text-violet-brand"} text-content-muted cursor-pointer`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/courses"
        className={({ isActive }) =>
          `px-4 py-2 ${isActive ? "text-violet-brand border border-violet-brand bg-violet-brand/20 rounded-xl" : "hover:text-violet-brand"} text-content-muted cursor-pointer`
        }
      >
        Courses
      </NavLink>
    </ul>
  );
};

export default NavigationBar;
