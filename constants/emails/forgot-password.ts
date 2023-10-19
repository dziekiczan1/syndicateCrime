import { header } from "./header";

export const forgotPasswordEmail = (resetPasswordToken: string) => `
  ${header()}
  <p>Reset Password Link: <a href="http://localhost:3000/forgot/${resetPasswordToken}">Reset Password</a></p>
`;
