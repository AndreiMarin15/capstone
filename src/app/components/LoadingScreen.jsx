// src/components/LoadingScreen.js
import React from "react";
import useLoading from "../../hooks/useLoading";

const LoadingScreen = () => {
  const { isLoading } = useLoading();

  return (
    isLoading && (
      <div className="loading-screen">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  );
};

export default LoadingScreen;
