// src/hooks/useLoading.js
import { useContext } from "react";
import { LoadingContext } from "../app/context/loadingContext";

const useLoading = () => {
  return useContext(LoadingContext);
};

export default useLoading;
