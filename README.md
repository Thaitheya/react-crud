# User Management CRUD Application

This is a React-based CRUD application that manages user information. The application allows you to **Create**, **Read**, **Update**, and **Delete** users. It includes features like form validation, an editable user table, and a preloader that ensures a smooth user experience.

## Features

- **Add User**: Add a new user to the list with fields like name, email, address, city, phone, website, and company.
- **Read User Data**: View the list of users fetched from an external API.
- **Edit User**: Update existing user details directly within the table.
- **Delete User**: Remove a user from the list.
- **Preloader**: Shows a loading animation for 3 seconds while fetching data from the API.

---

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Materialize CSS**: A responsive front-end framework for modern web design.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **JSONPlaceholder API**: Fake online REST API used for testing and prototyping.

---

## Installation and Setup

Follow these steps to set up and run the application locally:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (Node package manager)

### Installation Steps

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/your-username/crud-app.git
   \`\`\`
2. **Navigate to the project directory**:
   \`\`\`bash
   cd crud-app
   \`\`\`
3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
4. **Start the development server**:
   \`\`\`bash
   npm start
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## Application Functionality

### 1. **Fetching User Data**

On page load, the application fetches user data from the JSONPlaceholder API and displays it in a responsive table.

\`\`\`javascript
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      setTimeout(() => {
        setLoading(false); // Ensures preloader is visible for 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error fetching the users:", error);
      setLoading(false);
    }
  };
  fetchUsers();
}, []);
\`\`\`

### 2. **Preloader**

A loading animation is displayed for 3 seconds before the user data appears.

\`\`\`html
<div className="progress">
  <div className="indeterminate"></div>
</div>
\`\`\`

### 3. **Add New User**

Users can be added by filling out a form and submitting it. The new user is then added to the existing list.

\`\`\`javascript
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
\`\`\`

### 4. **Edit User**

Users can be edited by clicking the **Edit** button next to each user entry. The form fields become editable, and the changes are saved by clicking **Save**.

\`\`\`javascript
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
\`\`\`

### 5. **Delete User**

Users can be deleted from the list by clicking the **Delete** button next to their entry.

\`\`\`javascript
const handleDeleteClick = (userId) => {
  const updatedUsers = users.filter((user) => user.id !== userId);
  setUsers(updatedUsers);
};
\`\`\`

### 6. **Preloader**

A preloader is shown for 3 seconds while data is being fetched:

\`\`\`jsx
if (loading) {
  return (
    <div className="preloader-container" style={{ marginTop: "20px" }}>
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
}
\`\`\`

---

## Usage

- To add a new user, fill out the form at the top and click **Add User**.
- To edit a user, click the **Edit** button next to their entry, modify the details, and click **Save**.
- To delete a user, click the **Delete** button next to their entry.

---

## Folder Structure

\`\`\`bash
crud-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── UserList.js      # Main component to display and manage users
│   │   ├── UserForm.js      # Form component for adding users
│   └── App.js               # Root component
├── package.json
└── README.md                # Documentation file
\`\`\`

---

## Future Enhancements

- Add **form validation** to ensure valid data entry.
- Implement **pagination** for large user lists.
- Add **filtering** and **search** functionality.
- Use a **database** for storing user data instead of a mock API.

---

## License

This project is licensed under the MIT License.

---

## Author

[Your Name](https://github.com/your-username)

Feel free to contact me for questions or suggestions.
