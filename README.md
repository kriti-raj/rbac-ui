# Role-Based Access Control (RBAC) UI

A modern, responsive Role-Based Access Control system built with React Tailwind CSS, featuring granular permissions management, user administration, and role-based access controls.

## 🌟 Features

### User Management

- 👥 View and manage users in a lexically sorted table
- ➕ Add new users with role assignment
- ✏️ Edit user roles and status
- 🗑️ Delete users (admin only)
- 📊 User status tracking (Active/Inactive)

### Role Management

- 👑 Pre-configured roles (Admin, Moderator, User)
- 🔐 Role-based access control
- 📝 Edit role permissions
- 🎯 Granular permission management

### Permissions System

- 🎚️ Granular permission controls
- 📂 Category-based permission organization
- 🔄 Dynamic permission inheritance
- 🛡️ Secure access control

### Data Management

- 💾 Local storage persistence
- 🔄 Automatic data caching
- 📊 Efficient state management

## 🛠️ Technical Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Data Persistence:** localStorage

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/rbac-ui.git
```

2. Install dependencies

```bash
cd rbac-ui
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## 🔐 Role Hierarchy & Permissions

### Admin

- Full system access
- Manage users and roles
- Delete users
- Modify any role
- Access all features

### Moderator

- Create users (limited to User/Moderator roles)
- View users
- Edit basic user info
- Cannot delete users
- Cannot modify Admin roles

### User

- View users only
- No management capabilities
- Basic access only

## 🔒 Security Features

- Role-based access control
- Permission-based feature access
- Input validation
- Secure state management
- Protected routes
- Error handling

## 💡 Key Features

### Caching System

The application implements a custom caching system using localStorage:

- First-time data fetch from source
- Subsequent fetches from cache
- Automatic cache updates
- Persistent data storage

### User Management

- Add, edit, and delete users
- Assign and modify roles
- Toggle user status
- Sort users alphabetically
- Drag-and-drop reordering (admin only)

### Permission Management

- Granular permission control
- Role-based access
- Feature-level restrictions
- Dynamic permission updates

## 🛠️ Development

### Project Structure

```
rbac-ui/
├── src/
│   ├── components/
│   │   ├── UsersTable.jsx
│   │   ├── EditRoleModal.jsx
│   │   └── AddUserModal.jsx
│   ├── store/
│   │   └── Data.js
│   └── App.jsx
├── public/
└── package.json
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

Project Link: [https://github.com/kriti-raj/rbac-ui](https://github.com/kriti-raj/rbac-ui)
