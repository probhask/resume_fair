import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AddRemoveOtherPersonalDetailSection from "@features/Home/PersonalDetails/AddRemoveOtherPersonalDetailSection/AddRemoveOtherPersonalDetailSection";
import { BiLoaderCircle } from "react-icons/bi";
import ChooseTemplate from "@pages/ChooseTemplate";
import DefaultSection from "@features/Home/Default/DefaultSection";
import Education from "@features/Home/Education/Education";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import ErrorElement from "@components/ErrorElement/ErrorElement";
import Experience from "@features/Home/Experience/Experience";
import Home from "@pages/Home";
import Languages from "@features/Home/Languages/Languages";
import Objective from "@features/Home/Objective/Objective";
import PersonalDetails from "@features/Home/PersonalDetails/PersonalDetails";
import Projects from "@features/Home/ProjectSection/Project";
import Reference from "@features/Home/Reference/Reference";
import ResumePreview from "@pages/ResumePreview";
import Skills from "@features/Home/Skills/Skills";
import { Suspense } from "react";
import WelcomePage from "@pages/WelcomePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <WelcomePage />
      </ErrorBoundary>
    ),
  },
  {
    path: "forms",
    element: (
      <ErrorBoundary>
        {" "}
        <Home />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "",
        element: <DefaultSection />,
      },
      {
        path: "personal-details",
        element: <PersonalDetails />,
      },
      {
        path: "more-personal-details-section",
        element: <AddRemoveOtherPersonalDetailSection />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "experience",
        element: <Experience />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
      {
        path: "objective",
        element: <Objective />,
      },
      {
        path: "reference",
        element: <Reference />,
      },
      {
        path: "project",
        element: <Projects />,
      },
      {
        path: "languages",
        element: <Languages />,
      },
    ],
  },
  {
    path: "template",
    element: (
      <ErrorBoundary>
        <ChooseTemplate />
      </ErrorBoundary>
    ),
  },
  {
    path: "resume/:templateId",
    element: (
      <ErrorBoundary>
        <ResumePreview />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="w-full h-svh bg-black flex justify-center items-center">
            {" "}
            <BiLoaderCircle className="size-10 md:size-20 animate-spin text-[#f00b51] duration-75 ease-in" />
          </div>
        }
      >
        <div className="bg-black">
          <RouterProvider router={routes} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
