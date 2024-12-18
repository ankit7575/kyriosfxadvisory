import React, { useState } from "react";
import CustomerNavigation from "../Menu/CustomerNavigation"; // Adjust the path as needed
import AdminNavigation from "../Menu/AdminNavigation"; // Adjust the path as needed
import './Layout.css'; // Import CSS for layout styles

const Layout = ({ children, userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* Sidebar toggle button for mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {userRole === 'admin' ? <AdminNavigation /> : <CustomerNavigation />}
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
