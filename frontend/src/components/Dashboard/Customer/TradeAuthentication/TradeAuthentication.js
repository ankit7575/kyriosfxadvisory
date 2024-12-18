import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../Shared/LoadingSpinner"; // Loading spinner component
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the package's CSS
import './TradeAuthentication.css'; // Importing specific CSS for TradeAuthentication
import { useDispatch, useSelector } from 'react-redux'; // Redux imports
import { loadUser, updateUserProfile } from "../../../../actions/userActions"; // Import actions
import { requestTraderAccount } from "../../../../actions/TraderAction"; // Import actions

const TradeAuthentication = () => {
  const dispatch = useDispatch();

  // Access user data from Redux store
  const { user, loading: userLoading } = useSelector(state => state.user);
  
  const [values, setValues] = useState({
    name: "",
    phone: "",
    dob: "",
    country: "",
    mt5Id: "",
    brokerName: "",
    plan: "", // Set default plan to empty string
    capital: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(userLoading); // Set loading to true while user data is loading

  // Fetching user data on component mount
  useEffect(() => {
    dispatch(loadUser()); // Dispatch action to load user data from Redux store
  }, [dispatch]);

  // Autofill the form when user data is available
  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || "",
        phone: user.phone || "",
        dob: user.profile.dob || "",
        country: user.profile.country || "",
        mt5Id: user.profile.mt5Id || "",
        brokerName: user.profile.brokerName || "",
        plan: user.profile.plan || "", // Auto-select the plan if available
        capital: user.profile.capital || "",
      });

      setLoading(false); // Stop loading once user data is loaded
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setValues({ ...values, phone: value }); // Update phone number in state
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.dob) newErrors.dob = "Date of birth is required.";
    if (!values.country) newErrors.country = "Country is required.";
    if (!values.mt5Id) newErrors.mt5Id = "MT5 ID is required.";
    if (!values.brokerName) newErrors.brokerName = "Broker name is required.";
    if (!values.plan) newErrors.plan = "Plan is required.";
    if (!values.capital) newErrors.capital = "Capital is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading while processing submission

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if any
      setLoading(false); // Stop loading
      return;
    }

    // Dispatch update trader account action to update trader-related data
    dispatch(requestTraderAccount(values))
      .then(() => {
        setLoading(false); // Stop loading once update is complete
        setSubmitted(true); // Indicate submission was successful
      })
      .catch(() => {
        setLoading(false);
        setErrors({ general: "An error occurred while updating the trader account." }); // Use errors state to display error message
      });
  };

  // Handle update for name and phone separately
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProfile = {
      name: values.name,
      phone: values.phone,
    };

    dispatch(updateUserProfile(updatedProfile))
      .then(() => {
        setLoading(false);
        setErrors({ general: "Profile updated successfully." });
      })
      .catch(() => {
        setLoading(false);
        setErrors({ general: "An error occurred while updating the profile." });
      });
  };

  if (loading) {
    return <LoadingSpinner />; // Show a loading spinner while fetching user data
  }

  return (
    <section className="trade-authentication">
      <h1>Trade Authentication</h1>

      {submitted ? (
        <div className="success-message">
          <h2>Thank you for your submission!</h2>
          <p>Your request for a trader account has been submitted. Please wait for admin approval.</p>
        </div>
      ) : (
        <>
          {/* Form to update user profile (name, phone) */}
          <form onSubmit={handleProfileUpdate} className="trade-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <PhoneInput
                country={'in'} // Default to India (+91)
                value={values.phone}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%' }} // Customize input width to fit your form
              />
            </div>
            <button type="submit" className="submit-button">
              Update Profile
            </button>
          </form>

          {/* Form to update trader account data */}
          <form onSubmit={handleSubmit} className="trade-form">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={values.dob}
                onChange={handleChange}
              />
              {errors.dob && <span className="error-message">{errors.dob}</span>}
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
              />
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label>MT5 ID</label>
              <input
                type="text"
                name="mt5Id"
                value={values.mt5Id}
                onChange={handleChange}
              />
              {errors.mt5Id && <span className="error-message">{errors.mt5Id}</span>}
            </div>
            <div className="form-group">
              <label>Broker Name</label>
              <input
                type="text"
                name="brokerName"
                value={values.brokerName}
                onChange={handleChange}
              />
              {errors.brokerName && <span className="error-message">{errors.brokerName}</span>}
            </div>
            <div className="form-group">
              <label>Plan</label>
              <select
                name="plan"
                value={values.plan || ""} // Ensure default selection if no plan is set
                onChange={handleChange}
              >
                <option value="">Select Plan</option> {/* Default option when no plan is selected */}
                <option value="plana">Plan A</option> {/* Updated value to lowercase */}
                <option value="planb">Plan B</option> {/* Updated value to lowercase */}
                <option value="planc">Plan C</option> {/* Updated value to lowercase */}
              </select>
              {errors.plan && <span className="error-message">{errors.plan}</span>}
            </div>
            <div className="form-group">
              <label>Capital</label>
              <input
                type="number"
                name="capital"
                value={values.capital}
                onChange={handleChange}
              />
              {errors.capital && <span className="error-message">{errors.capital}</span>}
            </div>

            <button type="submit" className="submit-button">
              Submit Trader Account Request
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default TradeAuthentication;
