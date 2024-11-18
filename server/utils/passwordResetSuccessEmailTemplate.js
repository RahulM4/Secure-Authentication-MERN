export const passwordResetSuccessEmailTemplate = (name) => `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #0073e6;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .content h2 {
        color: #0073e6;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        color: #ffffff;
        background-color: #0073e6;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
      .footer {
        padding: 10px;
        text-align: center;
        font-size: 12px;
        color: #666666;
        background-color: #f4f4f4;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Our Community!</h1>
      </div>
      <div class="content">
        <h2>Hello, ${name}!</h2>
        <p>Congratulations! your password has been successfully changed.</p>
       
      <div class="footer">
        <p>If you have any questions, feel free to <a href="https://rahulmahto-myportfolio.vercel.app/contact/">contact us</a> anytime.</p>
        <p>Best regards,<br>SarvaMoh Ai Team</p>
      </div>
    </div>
  </body>
  </html>
`;
