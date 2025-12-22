# Trello App

## Description

Trello App is a task management application that allows users to create boards, add lists, and make notes. It provides authentication features including sign-in, login, and password management. Built with **Next.js**, **Tailwind CSS**, and various backend technologies such as **Mongoose**, **axios** and **JSON Web Tokens**, this app offers a smooth, themeable UI with **ShadCN** Next themes.

## Features

- **User Authentication**:
  - Sign in and log in
  - Change name, email, password
  - Forgot password functionality
- **Boards & Notes**:
  - Create and manage boards and notes
  - Add notes and lists to each board
  - Add, edit, and delete notes and lists in boards
- **Responsive UI**: 
  - Built with **Tailwind CSS** for a modern and mobile-friendly UI
- **Theme Support**: 
  - Switch between light and dark themes using **ShadCN** Next themes
- **Backend**:
  - User data stored using **Mongoose** with MongoDB
  - Secure authentication with **JWT (JSON Web Tokens)**
  - Email functionality (e.g., password reset) using **Nodemailer**

## Technologies

- **Frontend**: Next.js, Tailwind CSS, ShadCN, lucide-react
- **Backend**: Node.js, Mongoose, JSON Web Tokens, Nodemailer, axios, bcryptjs
- **Database**: MongoDB

## View on vercel : [Trello task management app](https://trello-app-blush-rho.vercel.app/)

## Installation

### 1. Clone the repository

```terminal
git clone https://github.com/rimsha-shoukat/trello-app.git
cd trello-app
```
### 2. Install dependencies

```terminal
npm install
```

### 3. Set up environment variables
Create a **.env.local** file in the root directory and configure the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_TOKEN_SECRET=your_jwt_secret
FORGOT_PASSWORD_TOKEN=your_forgot_password_token
NODEMAILER_USER=your_email
NODEMAILER_PASS=your_email_password
URL=http://localhost:3000
```
### 4. Run the app locally
```terminal
npm run dev
```

Visit **http://localhost:3000** to access the app.

## Usage

- **Sign up**: Create an account with your email and password.

- **Sign in**: Use your credentials to log in.

- **Create boards**: Add boards for task management.

- **Add lists**: Each board can have multiple lists to organize tasks.

- **Add notes**: Add, edit, and delete tasks inside each list.

- **Change themes**: Toggle between light and dark themes using the theme switcher.

- **Password reset**: Use the "Forgot Password" option to reset your password via email.
