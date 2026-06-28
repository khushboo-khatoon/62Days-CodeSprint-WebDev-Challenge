// import { config } from "../config/config";
// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: "OAuth2",
//         user: config.userEmail,
//         clientId: config.googleClientId,
//         clientSecret: config.googleSecretId,
//         refreshToken: config.googleRefreshToken
//     }
// })

// const verifyConnection = async () => {
//     try {
//         await transporter.verify();
//         console.log("Email transporter is ready to send emails");
//     }
//     catch (error) {
//         console.error("Error verifying email transporter:", error);
//     }
// }

// verifyConnection()



// NEW CODE FOR EMAIL UTIL WITH SAME TRANSPORTER AND CONNECTION VERIFICATION
import nodemailer from "nodemailer";
import { config } from "../config/config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.userEmail,
    pass: config.appPassword,
  },
});

const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log("Email transporter is ready");
  } catch (error) {
    console.error("Error verifying email transporter:", error);
  }
};

verifyConnection();
