import React from "react";
import { Route } from "react-router-dom";

function HomeLayout(props) {
  return <div>{props.children}</div>;
}

export default function HomeTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <HomeLayout>
          <Component {...propsComponent} />
        </HomeLayout>
      )}
    />
  );
}
