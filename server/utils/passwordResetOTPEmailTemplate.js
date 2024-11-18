export const passwordResetOTPEmailTemplate = (name, otp) => `<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border: 1px solid #dddddd;
      }
      .header {
        background-color: #007bff;
        color: #ffffff;
        padding: 10px;
        text-align: center;
      }
      .content {
        text-align: center;
        padding: 20px;
      }
      .otp-code {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        background-color: #333333;
        padding: 10px;
        width: 100%;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        padding: 10px;
        border-bottom: 2px solid #007bff ;
      }
      a{
        text-decoration: none;
        color: #007bff;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset - OTP</h1>
      </div>
      <div class="content">
        <p>Dear ${name},</p>
        <p>
           Your new otp for password reset is:
        </p>
        <p class="otp-code">${otp}</p>
        <p>
          Please enter this OTP within the next 10 minutes to complete reset password.
        </p>
        <p>If you did not request this code, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; <a href="https://rahulmahto-myportfolio.vercel.app/" target="_blank">SarvaMoh Ai</a> - All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
