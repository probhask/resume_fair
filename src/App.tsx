import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AddRemoveOtherPersonalDetailSection from "@features/Home/PersonalDetails/AddRemoveOtherPersonalDetailSection/AddRemoveOtherPersonalDetailSection";
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
import WelcomePage from "@pages/WelcomePage";

const routes = createBrowserRouter([
  { path: "/", element: <WelcomePage />, errorElement: <ErrorElement /> },
  {
    path: "forms",
    element: <Home />,
    errorElement: <ErrorElement />,
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
    path: "resume",
    element: <ChooseTemplate />,
  },
  {
    path: "resume/:templateID",
    element: <ResumePreview />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={routes} />
    </ErrorBoundary>
  );
}

export default App;
