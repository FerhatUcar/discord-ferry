import React from "react";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const ServerIdPage = () => {
  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 flex-shrink-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-[72px] h-full">Server ID Page</div>
    </div>
  );
};

export default ServerIdPage;
