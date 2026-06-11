import SideBar from "@/components/dashboard/SideBar";
import Container from "@/components/dashboard/Container";
import { SideBarProvider } from "@/context/DashboardContext";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SideBarProvider>
      <div className="w-screen h-screen overflow-hidden flex gap-6 p-8">
        <SideBar />
        <Container>
          {children}
        </Container>
      </div>
    </SideBarProvider>
  );
}
