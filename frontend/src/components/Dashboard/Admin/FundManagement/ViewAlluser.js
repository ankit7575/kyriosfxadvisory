import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal"; // Import modal
import { getAllUsers, AdmindeleteUser, AdminupdateUser } from "../../../../actions/userActions"; // Import actions

const ViewAllUsers = () => {
  const dispatch = useDispatch();

  // Getting the state from Redux store
  const { users, loading, error, totalPages } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null); // User to edit

  useEffect(() => {
    dispatch(getAllUsers()); // Dispatch the action to fetch users when component loads
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(AdmindeleteUser(userId)); // Corrected: Use AdmindeleteUser for deleting user
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUser(null);
  };

  const handleSave = () => {
    if (selectedUser) {
      dispatch(AdminupdateUser(selectedUser._id, selectedUser)); // Dispatch the update action
      setIsModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Render loading spinner or error message if there are any issues
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Account Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.accountStatus}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No users available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div>
          <button>Previous</button>
          <span>Page 1 of {totalPages}</span>
          <button>Next</button>
        </div>
      )}

      {/* Modal for Editing User */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Edit User"
          ariaHideApp={false} // Disable aria requirement for simplicity
        >
          <h2>Edit User</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedUser?.name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={selectedUser?.email || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={selectedUser?.phone || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Role:
              <select
                name="role"
                value={selectedUser?.role || ""}
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="referral">Referral</option>
                <option value="trader">Trader</option>
              </select>
            </label>
            <label>
              Account Status:
              <select
                name="accountStatus"
                value={selectedUser?.accountStatus || "active"}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleModalClose}>
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ViewAllUsers;
