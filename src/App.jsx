import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import { PuffLoader } from "react-spinners";
import bg_svg from "./assets/background.svg";
import NavigationBar from "./Components/NavigationBar";

const MobileNavBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 w-full z-50">
      <NavigationBar />
    </div>
  );
};

function App() {
  const { isLoading } = useAuth0();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PuffLoader color="#5b6af5" />
      </div>
    );
  return (
    <div
      className="flex flex-col min-h-screen bg-obsidian bg-cover"
      style={{ backgroundImage: `url(${bg_svg})` }}
    >
      <Header />
      <Outlet />
      <MobileNavBar />
    </div>
  );
}

export default App;
