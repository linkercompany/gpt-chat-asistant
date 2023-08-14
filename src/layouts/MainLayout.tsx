import { Helmet } from "react-helmet";

import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <Helmet>
        <html className="m-0 p-0" />
        <body className="m-0 min-h-full bg-gradient-to-r from-[#151F32] to-[#172540]  p-0" />
      </Helmet>
      <Outlet />
    </>
  );
};
