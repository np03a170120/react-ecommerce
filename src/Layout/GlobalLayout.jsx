import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

import Navbar from "../Layout/Navbar";

const GlobalLayout = ({ children }) => {
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  return (
    <>
      <div className="container  bg-white drop-shadow-md rounded-lg ">
        <ResizablePanelGroup direction="horizontal" className="w-full my-6">
          <ResizablePanel defaultSize={0}>
            <div className="flex h-[100vh] items-center justify-center p-6">
              <span className="font-semibold">list of the categories</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={100}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={10}>
                <Navbar loginDetail={loginDetail} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={90}>{children}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default GlobalLayout;
