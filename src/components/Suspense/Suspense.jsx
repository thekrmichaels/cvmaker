/* eslint-disable react/prop-types */
import { Suspense as ReactSuspense } from "react";
import Loader from "./Loader";

const Suspense = ({ children }) => (
  <ReactSuspense fallback={<Loader loadText="Loading" />}>
    {children}
  </ReactSuspense>
);

export default Suspense;
