export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #f4f4f4;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
        }
        .verification-button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email</h1>
        <p>Thank you for signing up! To complete your account setup, please click the button below to verify your email address:</p>
        
        <a href="{{VERIFICATION_URL}}" class="verification-button">
            Verify Email Address
        </a>
        
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p>{{VERIFICATION_URL}}</p>
        
        <div class="footer">
            <p>If you didn't create an account, please ignore this email.</p>
            <p>&copy; 2024 Your Company Name</p>
        </div>
    </div>
</body>
</html>
Last edited 19 minutes ago
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .logo {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666666;
            font-size: 12px;
        }
        .expiry-note {
            font-style: italic;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>Reset Your Password</h2>
            <p>We received a request to reset the password for your account. If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <center>
                <a href="{Reset_Password_Link}" class="button">Reset Password</a>
            </center>
            <p class="expiry-note">This password reset link will expire in 24 hours.</p>
            <p>If the button above doesn't work, copy and paste this link into your browser:</p>
            <p>{Reset_Password_Link}</p>
            <p>For security reasons, this link can only be used once. If you need to reset your password again, please request a new link.</p>
            <p>Best regards,<br>The Black Bear Team</p>
        </div>
        <div class="footer">
            <p>This email was sent to [User_Email]. If you believe this was a mistake, please contact our support team.</p>
            <p>&copy; 2024 Black Bear. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
