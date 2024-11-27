<img width="1470" alt="Screenshot 2024-11-27 at 8 30 52 PM" src="https://github.com/user-attachments/assets/9829885b-7757-463b-8cf5-2fcb44a6c80a"><img width="1470" alt="Screenshot 2024-11-27 at 8 30 52 PM" src="https://github.com/user-attachments/assets/afc05118-02f7-478d-b707-ec37e663364c"># Secure Authentication

**Secure Authentication** is a robust and reliable authentication system designed to provide a seamless user experience while ensuring high-security standards. It includes essential features such as login, signup, OTP-based email verification, password reset, and integration with an email service for user communication.

---

## Features

1. **Login**  
   - Secure user login with encrypted credentials.
   - Validates user credentials against the database.

2. **Signup**  
   - New user registration with email validation.
   - Stores encrypted passwords to ensure data security.

3. **6-Digit OTP Email Verification**  
   - Generates a secure 6-digit OTP for email verification.
   - Sends OTP to the user’s registered email.

4. **Resend OTP**  
   - Allows users to request a new OTP if the previous one expires.

5. **Reset Password using OTP Verification**  
   - Users can reset their password after verifying their identity through an OTP sent to their email.

6. **Forget Password**  
   - Enables users to recover access to their account via OTP-based password recovery.

7. **Email Service Integration (Nodemailer)**  
   - Uses **Nodemailer** for sending OTPs and account recovery emails.
   - Ensures emails are delivered securely and promptly.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RahulM4/secure-authentication.git
   cd secure-authentication
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys:
     ```env
     NODE_ENV=development
     PORT=5000
     DB_URI=<Your MongoDB connection string>
     EMAIL_SERVICE=Gmail
     EMAIL_USER=<Your Email Address>
     EMAIL_PASS=<Your Email Password>
     ```

4. Start the server:
   ```bash
   node server.js
   ```

---

## Screenshorts
<img width="1470" alt="Screenshot 2024-11-27 at 8 36 37 PM" src="https://github.com/user-attachments/assets/7cd33c4d-a0f0-4dff-a6a9-748a360199c5">
<img width="859" alt="Screenshot 2024-11-27 at 8 29 48 PM" src="https://github.com/user-attachments/assets/3114c54c-16b2-43d7-bd3a-13d872e18c70">
<img width="1470" alt="Screenshot 2024-11-27 at 7 56 06 PM" src="https://github.com/user-attachments/assets/c28cab28-b56b-44c9-be90-015b19f22c72">
<img width="1470" alt="Screenshot 2024-11-27 at 8 31 05 PM" src="https://github.com/user-attachments/assets/6d6d8484-e062-4a90-843c-f9632cc1b200"><img width="578" alt="Screenshot 2024-11-27 at 8 33 03 PM" src="https://github.com/user-attachments/assets/872b29b3-4f1a-4ea4-b951-792322ac7b68">
<img width="686" alt="Screenshot 2024-11-27 at 8 31 15 PM" src="https://github.com/user-attachments/assets/b2e5860b-e7f9-4ba8-91ac-f70dbb41c888">





## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Security**: bcrypt for password hashing, OTP-based verification
- **Other Tools**: dotenv for environment variable management

---

## Project Structure

```
secure-authentication/
├── controllers/    # Logic for authentication features
├── models/         # MongoDB schemas for user data
├── routes/         # API endpoints
├── utils/          # Helper functions (e.g., OTP generation, email service)
├── .env            # Environment configuration
├── app.js          # Application main connection with database and base api 
├── server.js       # Application entry point
├── package.json    # Project metadata and dependencies
```

---

## API Endpoints

1. **User Signup**  
   `POST /api/v1/users/signup`  
   - Registers a new user.

2. **User Login**  
   `POST /api/v1/users/login`  
   - Authenticates the user.

3. **Send OTP**  
   `POST /api/v1/users/send-otp`  
   - Sends a 6-digit OTP to the user's email.

4. **Verify OTP**  
   `POST /api/v1/users/verify-otp`  
   - Verifies the OTP.

5. **Resend OTP**  
   `POST /api/v1/users/resend-otp`  
   - Resends the OTP to the user.

6. **Reset Password**  
   `POST /api/v1/users/reset-password`  
   - Resets the user password after OTP verification.

7. **Forget Password**  
   `POST /api/v1/users/forget-password`  
   - Sends an OTP for password recovery.

---

## How to Contribute

1. Fork the repository.
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any queries or suggestions, please contact:  
**Name**: Rahul Mahto  
**Email**: [rahulforcoding4@gmail.com](mailto:rahulforcoding4@gmail.com)  
**LinkedIn**: [https://www.linkedin.com/in/rahulm4](#)

--- 

Enjoy a secure and seamless authentication experience! 😊
