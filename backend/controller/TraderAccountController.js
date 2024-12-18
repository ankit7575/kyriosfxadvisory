const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');  // Custom error handler
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Controller to update user to trader account
exports.updateTraderAccount = catchAsyncErrors(async (req, res, next) => {
  const { dob, country, mt5Id, brokerName, plan, capital } = req.body;

  // Ensure the user is authenticated
  const userId = req.user._id; // assuming the user ID comes from a middleware that authenticates the user

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Update profile information
  user.profile.dob = dob || user.profile.dob;
  user.profile.country = country || user.profile.country;
  user.profile.mt5Id = mt5Id || user.profile.mt5Id;
  user.profile.brokerName = brokerName || user.profile.brokerName;
  user.profile.plan = plan || user.profile.plan;
  user.profile.capital = capital || user.profile.capital;

  // Mark that the user has requested for a trader account
  user.requestedTraderStatus = true;

  // Save the user
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Trader account request has been submitted. Please wait for admin approval.',
  });
});

// Admin can view all trader requests
exports.getTraderRequests = catchAsyncErrors(async (req, res, next) => {
    const traderRequests = await User.find({ requestedTraderStatus: true })
      .select('name email profile role') // Select only the email, profile, and role fields
      .lean(); // Use lean() for better performance when not needing Mongoose document methods
  
    res.status(200).json({
      success: true,
      traderRequests,
    });
  });

// Admin can approve or reject trader account requests
exports.updateVerificationStatus = catchAsyncErrors(async (req, res, next) => {
  const { userId, status } = req.body;  // Assuming the admin sends userId and the new status

  if (!['approved', 'rejected'].includes(status)) {
    return next(new ErrorHandler('Invalid verification status', 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Set the trader account verification status
  user.traderVerification.verificationStatus = status;
  user.requestedTraderStatus = false; // Reset the trader request status

  if (status === 'approved') {
    user.role = 'trader'; // Change the role to 'trader' if approved
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: `Trader account ${status} successfully.`,
  });
});

// Controller to get the user's trader account status
exports.getTraderAccountStatus = catchAsyncErrors(async (req, res, next) => {
  // Ensure the user is authenticated
  const userId = req.user._id; // assuming the user ID comes from a middleware that authenticates the user

  // Find the user by ID and select necessary fields
  const user = await User.findById(userId).select('requestedTraderStatus traderVerification.verificationStatus role');

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Trader account status fetched successfully.',
    data: {
      requestedTraderStatus: user.requestedTraderStatus,
      verificationStatus: user.traderVerification.verificationStatus,
      role: user.role,
    },
  });
});
