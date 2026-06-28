// utils/mailService.js
import nodemailer from'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  },
   tls: {
    rejectUnauthorized: false // ⛔ ignorer la vérification SSL (pour dev uniquement)
  }
});

export const sendVerificationEmail = async (to, username) => {
  await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to,
    subject: 'Bienvenue sur notre plateforme !',
    html: `<h2>Bonjour ${username},</h2>
           <p>Merci de vous être inscrit sur NDAKO !</p>
           <p>Nous sommes ravis de vous avoir avec nous.</p>`
  });
};


