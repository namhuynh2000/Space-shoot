import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectHost } from "../../redux/reducers/hostReducer";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }) => {
  const host = useSelector(selectHost);

  if (!host.id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
