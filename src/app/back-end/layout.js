import React from "react";
import Sidebar from "@/Component/back-component/BackSidebar";

export default function layout({ children }) {
  return (
    <div>
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
