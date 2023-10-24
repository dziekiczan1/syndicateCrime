import { footer } from "./footer";
import { header } from "./header";

export const forgotPasswordEmail = (
  resetPasswordToken: string,
  userName: string
) => `
  ${header()}
  <div style="background: #333333; width: 100%; padding: 16px 0">
  <div
    style="
      color: #333333;
      background-color: #f5f5f5;
      padding: 16px 32px;
      border-radius: 5px;
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      font-family: 'Arial', 'Helvetica', sans-serif;
    "
  >
    <p>Dear ${userName},</p>
    <p>
      We have received your request to reset your password for your
      <b>Syndicate Crime</b> account. To complete the password reset process,
      please click on the link below. This link will be valid for the next 1
      hour:
    </p>
    <p>
      <strong>
        Password Reset Link:
        <a
          href="http://152.70.166.180:3001/forgot/${resetPasswordToken}"
          style="color: #cc0303"
          >Click Here!</a
        ></strong
      >
    </p>
    <p>
      If you did not request a password reset or if you believe this request was
      made in error, please disregard this email. Your current password will
      remain unchanged.
    </p>
    <p>
      If you have any questions or encounter any issues during the password
      reset process, please don't hesitate to contact our support team at
      <strong
        ><a href="mailto:synd.crime@gmail.com" style="color: #cc0303"
          >synd.crime@gmail.com</a
        ></strong
      >
    </p>
    <p style="margin: 0; margin-block-end: 0;">Best regards,</p>
    <p style="margin: 0; margin-block-start: 0;">Syndicate Crime</p>
  </div>
</div>
${footer()}
  `;
