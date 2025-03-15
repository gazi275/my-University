import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  // Ensure both plain-text and HTML versions are provided
  const mailOptions = {
    from: config.EMAIL_USER,
    to,
    subject: "Password Recovery Request", // Changed to sound more natural
    text: `Dear user, click the following link to reset your password: ${resetLink}`,
    html: `<p>Dear user,</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    headers: {
      'Reply-To': config.EMAIL_USER || '',
    },
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
