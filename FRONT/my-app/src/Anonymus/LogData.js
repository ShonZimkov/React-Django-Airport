import React from "react";
import { useSelector} from "react-redux";
import {  selectLog } from "./LogSlice";
const LogData = () => {
//   get data from loggedSlice
  const logStatus = useSelector(selectLog);
  return <div>
  {/* display data from slicer */}
  Status: {logStatus ? "logged":"not logged"}
  </div>;
};
export default LogData;
