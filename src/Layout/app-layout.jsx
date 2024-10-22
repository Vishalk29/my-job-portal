import Header from "@/components/ui-layout/header";
import React from "react";
import { Outlet } from "react-router-dom";
export const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="container min-h-screen">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-footerColor mt-10 text-3xl font-mono">
        Made with 💜 vishal kulkarni
      </div>
    </div>
  );
};
