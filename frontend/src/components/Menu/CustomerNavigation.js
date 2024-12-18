import React, { useState, useEffect } from "react"; // Import React and hooks
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { useLocation, Link } from "react-router-dom"; // Import hooks from react-router-dom
import { loadUser } from "../../actions/userActions"; // Redux action for loading user data
import "./Navigation.css";
import logo from "../assets/img/logo.png";

// Dropdown Component
function Dropdown({ title, links, isOpen, onToggle }) {
  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent the dropdown from toggling when clicking inside
    onToggle();
  };

  return (
    <li className="Polaris-Navigation__ListItem">
      <div
        className="Polaris-Navigation__ItemWrapper"
        onClick={handleDropdownClick} // Updated to use handleDropdownClick
      >
        <div
          className={`Polaris-Navigation__ItemInnerWrapper ${
            isOpen ? "Polaris-Navigation__ItemInnerWrapper--selected" : ""
          }`}
        >
          <Link
            data-polaris-unstyled="true"
            className={`Polaris-Navigation__Item ${
              isOpen ? "Polaris-Navigation--subNavigationActive" : ""
            }`}
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
              <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--semibold">
                {title}
              </span>
              <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
            </span>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div
          className="Polaris-Navigation__SecondaryNavigation Polaris-Navigation__SecondaryNavigationOpen"
          onClick={(e) => e.stopPropagation()} // Prevent parent dropdown toggle
        >
          <ul className="Polaris-Navigation__List" id="sub-menu">
            {links.map(({ path, label }, index) => (
              <li className="Polaris-Navigation__ListItem" key={index}>
                <Link
                  data-polaris-unstyled="true"
                  className="Polaris-Navigation__Item"
                  to={path}
                >
                  <span className="Polaris-Navigation__Text">
                    <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular Polaris-Text--subdued">
                      {label}
                    </span>
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

// Main Navigation Component
function CustomerNavigation() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error-message">Error: {error}</p>
        <Link to="/logout" className="logout-button">
          Logout
        </Link>
      </div>
    );
  }

  if (!user) {
    return <p>No user profile data available.</p>;
  }

  const menuItems = [
    { path: "/", label: "Overview" }, // Direct Overview menu
    {
      title: "Referrals",
      links: [
        { path: "/refer-new-user", label: "Refer a New User" },
        { path: "/all-team-referral", label: "All Team Referral" },
        { path: "/all-referral-incentives", label: "Referral Incentives" },
      ],
    },
    { path: "/all-fortnightly-profit", label: "Fortnightly Profit" }, // Direct Overview menu
    // {
    //   title: "Payouts",
    //   links: [
    //     { path: "/payout-records", label: "Payout Records" },
    //     { path: "/payout-withdrawal-request", label: "Withdrawal Request" },
    //     { path: "/payout-withdrawal-history", label: "Withdrawal History" },
    //   ],
    // },
    { path: "/trade-authentication", label: "Trade Authentication" }, // Direct Overview menu
    { path: "/profile", label: "Profile" }, // Direct Overview menu
    { path: "/support", label: "Support" }, // Direct Overview menu
  ];

  return (
    <>
      <nav className="navbar">
        <ul className="menu">
          <li>
            <img src={logo} alt="Company Logo" className="logo" />
          </li>
          {menuItems.map((menu, index) =>
            menu.links ? (
              <Dropdown
                key={index}
                title={menu.title}
                links={menu.links}
                isOpen={isDropdownOpen[menu.title]}
                onToggle={() => toggleDropdown(menu.title)}
              />
            ) : (
              <li key={index} className="menu-item">
                <Link
                  to={menu.path}
                  className={`link ${location.pathname === menu.path ? "active" : ""}`}
                >
                  {menu.label}
                </Link>
              </li>
            )
          )}
          <li>
            <Link
              className={`menu-item ${location.pathname === "/logout" ? "active" : ""}`}
              to="/logout"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="referral-number">REF Number: {user?.referralId}</div>
      </div>
    </>
  );
}

export default CustomerNavigation;
