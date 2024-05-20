import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAttendingDoctors({
  currentScreen,
  setCurrentScreen,
}) {
  return <>{currentScreen}</>;
}
