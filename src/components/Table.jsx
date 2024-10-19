import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    company: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    company: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching the users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); 
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
      address: user.address.street,
      city: user.address.city,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
    });
  };

  const handleSaveClick = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            name: editFormData.name,
            email: editFormData.email,
            address: { ...user.address, street: editFormData.address },
            city: editFormData.city,
            phone: editFormData.phone,
            website: editFormData.website,
            company: { ...user.company, name: editFormData.company },
          }
        : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const updatedUsers = [
      ...users,
      {
        ...newUser,
        id: users.length + 1,
        address: { street: newUser.address, city: newUser.city },
        company: { name: newUser.company },
      },
    ];

    setUsers(updatedUsers);
    setNewUser({
      name: "",
      email: "",
      address: "",
      city: "",
      phone: "",
      website: "",
      company: "",
    });
  };

  const handleDeleteClick = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  if (loading) {
    return (
      
    <div className="preloader-wrapper big active loader">
      <div className="spinner-layer spinner-blue">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <h4>User Information</h4>
        <div className="add-user-form">
          <h5>Add New User</h5>
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={newUser.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newUser.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newUser.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={newUser.website}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={newUser.company}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn waves-effect waves-light">
              Add User
            </button>
          </form>
        </div>
      </div>

      {/* User Table */}
      <table className=" highlight responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Phone Number</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editFormData.email}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={editFormData.address}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.address.street
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={editFormData.city}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.address.city
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={editFormData.phone}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={editFormData.website}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.website
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={editFormData.company}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  user.company.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => handleSaveClick(user.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => handleEditClick(user)}
                    style={{ marginRight: "10px" }} // Add margin to create space
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn red waves-effect waves-light"
                  onClick={() => handleDeleteClick(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
