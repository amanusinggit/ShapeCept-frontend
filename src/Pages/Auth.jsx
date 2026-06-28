import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../Components/Loading";
import Logo from "../Components/Logo";
import bg_svg from "../assets/background.svg";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Login = () => {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    // logout: auth0Logout, // Starts the logout flow
    // user, // User profile
  } = useAuth0();
  const navigate = useNavigate();
  const signup = () =>
    login({
      authorizationParams: {
        screen_hint: "signup",
        redirect_uri: window.location.origin,
      },
    });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  //   const logout = () =>
  //     auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return <Loader size="md" color="white" />;

  return (
    <div
      className="flex h-screen flex-col md:flex-row bg-cover"
      style={{ backgroundImage: `url(${bg_svg})` }}
    >
      <div className="md:w-2/4 flex h-[50dvh] md:h-full">
        <Logo size="5xl" />
      </div>
      <div className="m-6 md:m-0 flex justify-center items-end md:items-center gap-6  h-[50dvh] md:h-full  bg-transparent md:bg-obsidian/90">
        {error && <p>Error: {error.message}</p>}
        <button
          onClick={signup}
          className="w-full md:w-auto text-content px-6 py-3 rounded-lg border border-rim bg-brand-primary flex gap-2 items-center justify-center  hover:shadow-lg shadow-violet-brand/30 cursor-pointer"
        >
          Signup
        </button>

        <button
          onClick={() => {
            login({
              authorizationParams: { redirect_uri: window.location.origin },
            });
          }}
          className="w-full md:w-auto text-content px-6 py-3 rounded-lg border border-rim bg-brand-primary flex gap-2 items-center justify-center  hover:shadow-lg shadow-violet-brand/30 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
