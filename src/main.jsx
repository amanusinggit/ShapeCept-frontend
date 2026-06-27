import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./Pages/Auth.jsx";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Courses from "./Pages/Courses.jsx";
import Course from "./Pages/Course.jsx";
import Lessons from "./Pages/Lessons.jsx";
import LessonRenderer from "./Components/LessonRenderer/LessonRenderer.jsx";
import { PuffLoader } from "react-spinners";
import ErrorPage from "./Pages/ErrorPage.jsx";
import SetParams from "./Components/HOC/SetParams.jsx";

const createProtectedRouteComponent = (component, options) => {
  const ProtectedRouteComponent = withAuthenticationRequired(
    component,
    options,
  );
  return (props) => <ProtectedRouteComponent {...props} />;
};

const ProtectedHome = createProtectedRouteComponent(App, {
  onRedirecting: () => <PuffLoader color="#5b6af5" />,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-r7begn1a02eghee1.us.auth0.com"
      clientId="zMnGMsMpMjkkFTW3MRJ8qDQA7Xudvy8a"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:3000/",
      }}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedHome />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/course/:courseId" element={<Course />} />
            <Route
              path="courses/course/:courseId/modules/module/:moduleId/lessons"
              element={<Lessons />}
            />
            <Route
              path="courses/course/:courseId/modules/module/:moduleId/lessons/lesson/:lessonId"
              element={<SetParams Component={LessonRenderer} />}
            />
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
    , //{" "}
  </StrictMode>,
);
