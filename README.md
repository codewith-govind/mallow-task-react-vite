# React User Management App

A professional React Single Page Application (SPA) built as a recruitment task. It provides full user management features including authentication, user list, search, CRUD operations, and responsive design.

## 🚀 Features

* User authentication (Login)
* Token storage on successful login
* User listing (List and Card view)
* Create, Read, Update, Delete (CRUD) operations via modal forms
* Real-time search by first/last name
* Client-side pagination
* Protected routes using React Router
* State management using Redux and Redux Thunk
* Styled using styled-components (or Ant Design)

## 📦 Tech Stack

* React (CRA)
* Redux Toolkit + Thunk
* React Router DOM
* Axios
* Styled-components
* TypeScript (Optional)
* ESLint, Prettier (for code quality)

## 📁 Folder Structure

```
src/
├── api/               # Api's
├── assests/           # assests (images,icons)
├── components/        # Reusable components
├── context/           # context files
├── layouts/           # AuthLayout, MainLayout
├── pages/             # Route pages (LoginPage, UserListPage)
├── services/          # Analytics
├── store/             # Redux store config
├── styles/            # Global styles
├── App.tsx
└── main.tsx
```

## 🔐 Login Credentials

Use the following credentials for testing:

```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/codewith-govind/mallow-task-react-vite.git
cd mallow-task-react-vite

# Install dependencies
npm install

# Start development server
npm start
```

## 🛠️ Available Scripts

```bash
npm start       # Run the app
npm run build   # Build for production
npm run lint    # Lint the code
npm run format  # Format the code
```

## 🌐 Deployment

You can deploy the app using:

* GitHub Pages
* Firebase Hosting
* Vercel
* Netlify

```bash
npm run build
# Deploy the contents of /build folder using your preferred method
```

## 📋 API Reference

* Base URL: `https://reqres.in/api`
* `POST /login` – Login
* `GET /users?page=1` – List users
* `POST /users` – Create user
* `PUT /users/:id` – Update user
* `DELETE /users/:id` – Delete user


## 🧼 Code Quality

* ESLint and Prettier included for code formatting and linting.
* Structured for component reusability and clean architecture.

## 📄 License

MIT

## ✍️ Author

GitHub: [@codewith-govind](https://github.com/codewith-govind)
