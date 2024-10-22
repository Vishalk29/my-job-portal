import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Layout/app-layout";
import LandingPage from "./Pages/landing-page";
import OnboardingPage from "./Pages/onboardingPage";
import { JobListing } from "./Pages/job-listing";
import Job from "./Pages/job";
import  SavedJob  from "./Pages/saved-job";
import PostJob from "./Pages/post-job";
import MyJob from "./Pages/my-job";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoutes from "./components/ui-layout/protected-route";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoutes>
            <OnboardingPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoutes>
            <JobListing />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes>
            <Job />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoutes>
            <SavedJob />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
            <MyJob />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
