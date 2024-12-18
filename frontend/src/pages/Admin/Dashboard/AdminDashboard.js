import React from "react";
import Layout from "../../../components/Layout/Layout"; // Adjust path if needed
import '../../../styles/global.css'; // Import CSS for additional styling if needed
import AddFund from "../../../components/Dashboard/Admin/FundManagement/AddFund";
import ViewAlluser from "../../../components/Dashboard/Admin/FundManagement/ViewAlluser";
import TraderRequests from "../../../components/Dashboard/Admin/FundManagement/TraderRequests";
const AdminDashboard = () => {

  return (
    <Layout userRole="admin"> {/* Specify the user role to render AdminNavigation */}
   <AddFund/>
   <ViewAlluser/>
   <TraderRequests />
    </Layout>
  );
};

export default AdminDashboard;
