export const ROLES = {
	ADMIN:"admin",
	USER:"user",
   TURFOWNER:"TurfOwner"
} as const;

export type TRole = "admin" | "user" | "TurfOwner";


export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
	WRONG_ID: "Wrong ID",
	TOKEN_EXPIRED: "Token Expired",
	EMAIL_NOT_FOUND: "Email Not Found",
   CONFIRM_PAYMENT_FAILED: "Failed to confirm payment",
	FORBIDDEN:
		"Access denied. You do not have permission to access this resource.",
	BLOCKED: "Your account has been blocked.",
	NOT_ALLOWED: "You are not allowed",
	EMAIL_EXISTS: "Email Already Exists",
	REQUEST_NOT_FOUND: "Category Request Not Found",
	CATEGORY_EXISTS: "Category Already Exists",
	CATEGORY_NOT_FOUND: "Category Not Found",
	INVALID_TOKEN: "Invalid token",
	INVALID_ROLE: "Invalid user role",
	INVALID_CREDENTIALS: "Invalid credentials provided.",
	USER_NOT_FOUND: "User not found.",
	ROUTE_NOT_FOUND: "Route not found",
	UNAUTHORIZED_ACCESS: "Unauthorized access.",
	SERVER_ERROR: "An error occurred, please try again later.",
	VALIDATION_ERROR: "Validation error occurred.",
	MISSING_PARAMETERS: "Missing required parameters.",
	WRONG_CURRENT_PASSWORD: "Current password is wrong",
	SAME_CURR_NEW_PASSWORD: "Please enter a different password from current",
   WALLET_NOT_FOUND:"wallet not found"
} as const;

export const SUCCESS_MESSAGES = {
	BOOKING_SUCCESS: "Booking completed",
	CREATED: "Created successfully",
	LOGIN_SUCCESS: "Login successful",
	REGISTRATION_SUCCESS: "Registration completed successfully",
	OTP_SEND_SUCCESS: "OTP sent successfully",
	LOGOUT_SUCCESS: "Logged out successfully",
	UPDATE_SUCCESS: "Updated successfully",
	DELETE_SUCCESS: "Deleted successfully",
	OPERATION_SUCCESS: "Operation completed successfully",
	PASSWORD_RESET_SUCCESS: "Password reset successfully",
	VERIFICATION_SUCCESS: "Verification completed successfully",
	DATA_RETRIEVED: "Data retrieved successfully",
	ACTION_SUCCESS: "Action performed successfully",
	RESETMAIL_SEND_SUCCESS:"Reset mail send successfully"
} as const;

export const WALLET_TRANSACTION_TYPES = {
	DEPOSIT:"deposit",
	REFUND:"refund",
	PURCHASE:"purchase"
} as const

export type TWalletTransactionType = keyof typeof WALLET_TRANSACTION_TYPES;

export interface IWalletTransaction {
    type: TWalletTransactionType;
    amount: number;
    timestamp: Date;
}
export const VERIFICATION_MAIL_CONTENT = (
	otp: string
) =>  `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #ffffff; background-color: #12181f;">
   <!-- Logo & Header Section -->
   <div style="text-align: center; margin-bottom: 30px; padding-top: 20px;">
      <h1 style="font-size: 42px; font-weight: bold; margin: 0; color: #30db5b;">
         ⚽ TURF<span style="color: #ffffff;">-X</span>
      </h1>
   </div>

   <h2 style="color: #30db5b; text-align: center; margin-bottom: 30px;">
      Verify Your Turf-X Account! 🔐
   </h2>
   
   <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; text-align: center; color: #CCCCCC;">
      Welcome to Turf-X — your ultimate turf booking experience! <br> Use the code below to verify your account and start booking games with ease.
   </p>
   
   <div style="background-color: #1a1f26; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; border: 1px solid #30db5b;">
      <p style="margin-bottom: 10px; font-size: 16px; font-weight: bold; color: #CCCCCC;">Your verification code:</p>
      <h1 style="background-color: #20262e; color: #30db5b; font-size: 36px; margin: 10px 0; padding: 20px; border-radius: 8px; letter-spacing: 5px;">
         ${otp}
      </h1>
      <p style="color: #999999; font-size: 14px;">
         ⏳ This code will expire in 5 minutes.
      </p>
   </div>
   
   <p style="font-size: 14px; color: #999999; margin-top: 20px; text-align: center;">
      🔒 For your security, never share this code with anyone.
   </p>

   <!-- Support Section -->
   <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333840; text-align: center;">
      <p style="font-size: 14px; color: #BBBBBB;">
         Need help? Contact Turf-X support anytime! 💬<br>
         📧 Email: <a href="mailto:support@turf-x.com" style="color: #30db5b; text-decoration: none;">support@turf-x.com</a>
      </p>
   </div>

   <!-- Footer -->
   <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999999;">
      © ${new Date().getFullYear()} <span style="color: #30db5b;">Turf-X</span>. All rights reserved.
   </div>
</div>
`;

export const RESET_PASSWORD_MAIL_CONTENT = (
	resetLink: string
) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #ffffff; background-color: #12181f;">
   <!-- Logo & Header Section -->
   <div style="text-align: center; margin-bottom: 30px; padding-top: 20px;">
      <h1 style="font-size: 42px; font-weight: bold; margin: 0; color: #ffffff;">
         ⚽ TURF<span style="color: #30db5b;">-X</span>
      </h1>
   </div>

   <h2 style="color: #30db5b; text-align: center; margin-bottom: 30px;">
      Reset Your Turf-X Password 🔐
   </h2>
   
   <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; text-align: center; color: #CCCCCC;">
      We received a request to reset your Turf-X password. <br> Click the button below to set up a new one.
   </p>
   
   <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" style="background-color: #30db5b; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
   </div>
   
   <div style="background-color: #1a1f26; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; border: 1px solid #30db5b;">
      <p style="margin-bottom: 10px; font-size: 16px; color: #CCCCCC;">
        If the button doesn’t work, copy and paste this link:
      </p>
      <a href="${resetLink}" style="color: #30db5b; word-break: break-all; display: block; margin-bottom: 10px;">${resetLink}</a>
      <p style="color: #999999; font-size: 14px;">
         ⏳ This link will expire in 30 minutes.
      </p>
   </div>
   
   <p style="font-size: 14px; color: #999999; margin-top: 20px; text-align: center;">
      Didn’t request this? Just ignore this message or contact our support team.
   </p>

   <!-- Support Section -->
   <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333840; text-align: center;">
      <p style="font-size: 14px; color: #BBBBBB;">
         Need help? Contact Turf-X support! 🛠️<br>
         📧 Email: <a href="mailto:support@turf-x.com" style="color: #30db5b; text-decoration: none;">support@turf-x.com</a>
      </p>
   </div>

   <!-- Footer -->
   <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999999;">
      © ${new Date().getFullYear()} <span style="color: #30db5b;">Turf-X</span>. All rights reserved.
   </div>
</div>
`;