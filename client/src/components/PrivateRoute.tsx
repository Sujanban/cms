import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  if (!user || !user.email) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
