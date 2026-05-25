import { useEffect } from "react";

const OAuthSuccess = () => {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return <div>Logging in...</div>;
};

export default OAuthSuccess;
