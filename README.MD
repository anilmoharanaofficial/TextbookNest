# TextbookNest

**TextbookNest** is a platform where students can download textbooks and contribute textbooks for other students. This project aims to create a collaborative space for sharing educational resources. 'This project is currently under development🧑🏻‍💻'

<!-- ## About This Project

TextbookNest was created as a full-stack web application to showcase my skills in backend development, particularly in building robust user authentication and authorization systems. The project demonstrates my proficiency in Node.js, Express.js, and MongoDB, as well as my ability to implement secure, user-friendly web applications. This project is part of my portfolio to help me secure a position as a Node.js backend developer. -->

## Features

- **User Authentication:**

  - User signup, login, and logout functionality.
  - JWT-based authentication with secure token handling.
  - Password reset functionality using OTP.
  - Role-based authorization for managing access to resources.

- **User Profile Management:**

  - Update profile information including avatar.
  - Change password.
  - Delete profile.

- **Textbook Sharing:**

  - Users can contribute textbooks to the platform.
  - Textbooks can be downloaded by other users.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **File Storage:** Cloudinary
- **Email Notifications:** Nodemailer
- **Environment Configuration:** dotenv

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anilmoharanaofficial/textbooknest.git
   cd textbooknest
   ```

## API Endpoints

### User Routes

- **`POST /api/v1/user/signup`** - Sign up a new user.
- **`POST /api/v1/user/login`** - Log in an existing user.
- **`GET /api/v1/user/logout`** - Log out the current user.
- **`GET /api/v1/user/profile`** - Get the profile of the logged-in user.
- **`PUT /api/v1/user/update-profile`** - Update the profile of the logged-in user.
- **`POST /api/v1/user/change-password`** - Change the password of the logged-in user.
- **`POST /api/v1/user/forgot-password`** - Request a password reset.
- **`POST /api/v1/user/reset-password`** - Reset the password using OTP.
- **`DELETE /api/v1/user/delete-profile`** - Delete the profile of the logged-in user.
