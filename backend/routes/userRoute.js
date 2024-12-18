const express = require("express");

const {
  registerUser,
  verifyOtpAndCompleteRegistration,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserPassword,
  updateUserProfile,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  updateUserStatus,
  AdmindeleteUser,   // Added the delete user route
  AdminupdateUser    // Added the update user route
} = require("../controller/userController");

const { updateTraderAccount, getTraderRequests, updateVerificationStatus } = require('../controller/TraderAccountController');

const { 
  addFortnightlyProfit,
  deleteFortnightlyProfit,
  deleteProfitIncentive,
  viewIncentiveData,
  viewFortnightlyProfitData,
  viewAllIncentiveDataAdmin,
  viewFortnightlyProfitDataAdmin,
  viewReferralData,
} = require("../controller/fundsController");

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();


// User registration and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-otp", verifyOtpAndCompleteRegistration);
router.get("/me", isAuthenticatedUser, getUserDetails);

// Password recovery routes
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// User profile update routes
router.put("/update-password", isAuthenticatedUser, updateUserPassword);
router.put("/update-profile", isAuthenticatedUser, updateUserProfile);

// Admin routes
router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.get("/admin/users/:id", isAuthenticatedUser, authorizeRoles('admin'), getSingleUser);
router.put("/admin/users/:id/role", isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);
router.delete('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), AdmindeleteUser);  // Delete user route

// Route to update user status (Admin only)
router.patch('/admin/users/:id/status', isAuthenticatedUser, authorizeRoles('admin'), updateUserStatus);

// Route to add fortnightly profit for a specific user (Admin only)
router.post('/addFortnightlyProfit', isAuthenticatedUser, authorizeRoles("admin"), addFortnightlyProfit);

// Route to delete a specific fortnightly profit entry (Admin only)
router.post('/admin/deleteFortnightlyProfit', isAuthenticatedUser, authorizeRoles("admin"), deleteFortnightlyProfit);

// Route to delete a specific profit incentive entry (Admin only)
router.post('/admin/deleteProfitIncentive', isAuthenticatedUser, authorizeRoles("admin"), deleteProfitIncentive);

// Route to view incentive data (authenticated user only)
router.get("/viewIncentiveData", isAuthenticatedUser, viewIncentiveData);

// Route to view fortnightly profit data (authenticated user only)
router.get("/viewFortnightlyProfitData", isAuthenticatedUser, viewFortnightlyProfitData);

// Route to view fortnightly profit data (authenticated user only)
router.get("/viewReferralData", isAuthenticatedUser, viewReferralData);


// Admin route to view all incentive data (with pagination, filtering, and sorting)
router.get("/admin/viewAllIncentiveDataAdmin", isAuthenticatedUser, authorizeRoles("admin"), viewAllIncentiveDataAdmin);

// Admin route to view fortnightly profit data for all users (Admin only)
router.get("/admin/viewFortnightlyProfitDataAdmin", isAuthenticatedUser, authorizeRoles("admin"), viewFortnightlyProfitDataAdmin);

// Route for users to submit trader account request
router.put('/update-trader-account', isAuthenticatedUser, updateTraderAccount);

// Admin routes to view and approve/reject trader account requests
router.get('/admin/trader-requests', isAuthenticatedUser, authorizeRoles("admin"), getTraderRequests);
router.put('/admin/update-trader-status', isAuthenticatedUser, authorizeRoles("admin"), updateVerificationStatus);

// Admin route to update user details (Admin only)
router.put('/admin/users/:id', isAuthenticatedUser, authorizeRoles("admin"), AdminupdateUser);  // Update user route

module.exports = router;
