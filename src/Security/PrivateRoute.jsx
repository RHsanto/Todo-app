/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";

const PrivateRoute = ({ children }) => {
  const { user } = useFirebase();
  const location = useLocation();

  if (user?.displayName) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
