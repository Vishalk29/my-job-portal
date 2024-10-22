import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }
  // This is basically we beacuse if user directly want to go to the /jobs it should route back to the /onboarding page
  if (
    user !== undefined &&
    !user.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  )
    return <Navigate to="/onboarding" />;
  return children;
};

export default ProtectedRoutes;
