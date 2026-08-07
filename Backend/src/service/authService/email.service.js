import transporter from "../config/mail.js";
import env from "../config/env.js";

export const sendOTPEmail = async ({ email, username, otp }) => {

    await transporter.sendMail({
        from: env.SMTP_FROM,
        to: email,
        subject: "Verify Your Email",
        html: otpTemplate(otp, username)
    });

};


export const sendResetPasswordEmail = async ({
    email,
    otp
}) => {

    await transporter.sendMail({
        from: env.SMTP_FROM,
        to: email,
        subject: "Reset Your Password",
        html: resetPasswordTemplate(otp),
    });

};


export const sendWelcomeEmail = async ({
    email,
    username
}) => {

    await transporter.sendMail({
        from: env.SMTP_FROM,
        to: email,
        subject: "Welcome to URL Shortener",
        html: welcomeTemplate(username),
    });

};