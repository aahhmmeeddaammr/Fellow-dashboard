import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
