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
