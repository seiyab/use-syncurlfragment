import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import useSyncUrlFragment from "@seiyab/use-syncurlfragment";

export const App = () => (
  <BrowserRouter>
    <Content />
  </BrowserRouter>
);

const Content = () => {
  useSyncUrlFragment();
  return (
    <>
      {Array.from(Array(10).keys()).map((_, i) => (
        <React.Fragment key={i}>
          <h1 id={`id-${i}`}>title - {i}</h1>
          <section style={{ height: "100px" }}>some sentences</section>
        </React.Fragment>
      ))}
    </>
  );
};
