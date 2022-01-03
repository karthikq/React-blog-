/** @format */

import React from "react";
import { Helmet } from "react-helmet";

export const MetaTags = ({ title, description }) => {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </React.Fragment>
  );
};
