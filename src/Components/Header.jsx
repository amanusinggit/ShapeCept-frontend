import { useAuth0 } from "@auth0/auth0-react";
import Logo from "./Logo";
import NavigationBar from "./NavigationBar";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import useApplicationStore from "../app/ApplicationStore";

const Header = () => {
  const { logout: Auth0Logout, user } = useAuth0();
  const [showDialog, setShowDialog] = useState(false);
  const updateHeaderHeight = useApplicationStore(
    (state) => state.updateHeaderHeight,
  );

  const logout = () => {
    try {
      Auth0Logout({
        logoutParams: { returnTo: window.location.origin + "/auth" },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  useEffect(() => {
    const height = document
      .querySelector("#header")
      .getBoundingClientRect().height;
    updateHeaderHeight(height);
  }, [updateHeaderHeight]);
  return (
    <div
      className="flex items-center justify-between p-4 bg-deep/20"
      id="header"
    >
      <div className="">
        <Logo />
      </div>
      <div className="hidden md:block">
        <NavigationBar />
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleDialog}
          className="px-6 py-3 border border-rim text-content rounded-lg flex gap-4 justify-center items-center hover:shadow-lg shadow-violet-brand/30 cursor-pointer hover:bg-violet-dim"
        >
          <span className="hidden md:block">Logout</span>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
        <div className="hidden md:block">
          <Profile name={user.name} />
        </div>
      </div>
      {showDialog && (
        <div className="z-40 fixed top-0 h-screen w-screen bg-backdrop flex justify-center items-center">
          <div className="fixed border border-rim-strong rounded-lg px-6 py-3 bg-deep text-content pt-8 pb-4">
            <p className="mb-6">Are you sure you want to logout.</p>
            <div className="grid grid-cols-2 gap-5 my-3">
              <button
                onClick={toggleDialog}
                className="border border-danger rounded-lg px-4 py-2 text-danger cursor-pointer hover:bg-danger hover:text-content"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="border border-violet-brand rounded-lg text-violet-brand px-4 py-2 text-center cursor-pointer hover:bg-violet-brand hover:text-content"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
