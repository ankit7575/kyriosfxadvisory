import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import CSS for styling
import logo from '../assets/img/logo.png';

// Dropdown Component
function Dropdown({ title, links, isOpen, onToggle }) {
  return (
    <li className="Polaris-Navigation__ListItem">
      <div className="Polaris-Navigation__ItemWrapper" onClick={onToggle}>
        <div className={`Polaris-Navigation__ItemInnerWrapper ${isOpen ? 'Polaris-Navigation__ItemInnerWrapper--selected' : ''}`}>
          <Link
            data-polaris-unstyled="true"
            className={`Polaris-Navigation__Item ${isOpen ? 'Polaris-Navigation--subNavigationActive' : ''}`}
            to="#"
            aria-expanded={isOpen}
            aria-controls="sub-menu"
          >
            <div className="Polaris-Navigation__Icon">
              <span className="Polaris-Icon">
                <ui-icon type="order" tone="unstable-inherit"></ui-icon>
              </span>
            </div>
            <span className="Polaris-Navigation__Text">
              <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--semibold">{title}</span>
              <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span> {/* Move arrow to the end */}
            </span>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="Polaris-Navigation__SecondaryNavigation Polaris-Navigation__SecondaryNavigationOpen">
          <ul className="Polaris-Navigation__List" id="sub-menu">
            {links.map(({ path, label }, index) => (
              <li className="Polaris-Navigation__ListItem" key={index}>
                <Link
                  data-polaris-unstyled="true"
                  className="Polaris-Navigation__Item"
                  to={path}
                >
                  <span className="Polaris-Navigation__Text">
                    <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular Polaris-Text--subdued">{label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// AdminNavigation Component
function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (menu) => {
    setDropdownStates((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const adminMenus = [
    {
      title: "User Management",
      links: [
        { path: "/admin/users", label: "View Users" },
        // { path: "/admin/users/add", label: "Add User" },
        // { path: "/admin/users/import", label: "Import Users" },
        // { path: "/admin/users/export", label: "Export Users" },
      ],
    },
    {
      title: "Referral Management",
      links: [
        { path: "/admin/referrals", label: "View Referral Hierarchy" },
        // { path: "/admin/referrals/super", label: "SuperReferral Management" },
      ],
    },
    {
      title: "Incentive Management",
      links: [
        { path: "/admin/incentives", label: "View Incentives" },
        // { path: "/admin/incentives/add", label: "Add Incentives" },
        // { path: "/admin/incentives/import", label: "Import Incentives" },
        // { path: "/admin/incentives/export", label: "Export Incentives" },
      ],
    },
    {
      title: "Fund Management",
      links: [
        { path: "/admin/funds", label: "View Funds" },
        { path: "/admin/funds/add", label: "Add Fund" },
        // { path: "/admin/funds/import", label: "Import Funds" },
        // { path: "/admin/funds/export", label: "Export Funds" },
      ],
    },
    // {
    //   title: "Payout Management",
    //   links: [
    //     { path: "/admin/payouts", label: "View Payout Requests" },
    //     { path: "/admin/payouts/approve-all", label: "Approve All Pending" },
    //     { path: "/admin/payouts/import", label: "Import Payout Requests" },
    //     { path: "/admin/payouts/export", label: "Export Payout Data" },
    //   ],
    // },
    // {
    //   title: "Plan Management",
    //   links: [
    //     { path: "/admin/plans", label: "View Plans" },
    //     { path: "/admin/plans/add", label: "Add/Update Plan" },
    //   ],
    // },
    // {
    //   title: "Reports & Analytics",
    //   links: [
    //     { path: "/admin/reports/users", label: "User Statistics" },
    //     { path: "/admin/reports/incentives", label: "Incentive Reports" },
    //     { path: "/admin/reports/payouts", label: "Payout Reports" },
    //     { path: "/admin/reports/referrals", label: "Referral Performance" },
    //   ],
    // },
    // {
    //   title: "Notifications Management",
    //   links: [
    //     { path: "/admin/notifications/send", label: "Send Notifications" },
    //     { path: "/admin/notifications/history", label: "Notification History" },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   links: [
    //     { path: "/admin/settings/general", label: "General Settings" },
    //     { path: "/admin/settings/admins", label: "Admin Management" },
    //     { path: "/admin/settings/backup", label: "Data Backup & Restore" },
    //   ],
    // },
    // {
    //   title: "Audit Logs",
    //   links: [
    //     { path: "/admin/logs", label: "View Logs" },
    //   ],
    // },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </div>
        <ul className={`menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <img src={logo} alt="Company Logo" className="logo" />
          </li>
          <li>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          </li>
          {adminMenus.map((menu, index) => (
            <Dropdown
              key={index}
              title={menu.title}
              links={menu.links}
              isOpen={dropdownStates[menu.title]}
              onToggle={() => toggleDropdown(menu.title)}
            />
          ))}
          <li>
            <Link to="/Logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AdminNavigation;
