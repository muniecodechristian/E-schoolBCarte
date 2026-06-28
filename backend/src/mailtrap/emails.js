import nodemailer from"nodemailer";
import dotenv   from 'dotenv'

dotenv.config();


import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";



/**
 * Email de vérification
 */
export const sendVerificationEmai = async (email, verificationToken) => {
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.address}>`,
      to: email,
      subject: "Vérifiez votre adresse email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("✅ Verification email sent to", email);
  } catch (error) {
    console.error("❌ Error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};

/**
 * Email de bienvenue
 */

/**
 * Demande de réinitialisation de mot de passe
 */
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.address}>`,
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ),
    });

    console.log("✅ Password reset email sent to", email);
  } catch (error) {
    console.error("❌ Error sending password reset email", error);
    throw new Error("Error sending password reset email");
  }
};

/**
 * Confirmation de reset réussi
 */
export const sendResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${sender.address}>`,
      to: email,
      subject: "Mot de passe modifié avec succès",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("✅ Password reset success email sent to", email);
  } catch (error) {
    console.error("❌ Error sending reset success email", error);
    throw new Error("Error sending reset success email");
  }
};



// Configurer le transporteur nodemailer





// Configurer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "maddison53@ethereal.email",  // Utilise bien l'email généré par Ethereal
    pass: "jn7jnAPss4f63QBp6D",         // Et son mot de passe
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Fonction d'envoi d'email
export const sendVerificationEma = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ndako Support" <maddison53@ethereal.email>',
      to: email,
  
      subject: "Bienvenue sur Fatshi Emploi 🎉",
      html: `
        <h2>Bienvenue ${name} 👋</h2>
        <p>Votre compte a été créé avec succès.</p>
        <p>Merci de nous faire confiance.</p>
      `,
    });

    console.log("Email envoyé :", info.messageId);
  } catch (emailErr) {
    console.error("Erreur d'envoi d'email :", emailErr.message);
  }
};









/**
 * Fonction pure pour envoyer un email
 * @param {string} to - Adresse du destinataire
 * @param {string} subject - Sujet de l'email
 * @param {string} html - Contenu HTML de l'email
 */


export const  sendVerificationEmail = async (to, code) => {
 try {
    // Transporteur SMTP avec Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,           // Ton adresse email
        pass: process.env.EMAIL_PASSWORD,     // Mot de passe d'application Gmail 0835728874
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: to,
      subject: 'fatshiEmploi',
      html:VERIFICATION_EMAIL_TEMPLATE(code),
    };

    // Envoie de l'email
    await transporter.sendMail(mailOptions);
    console.log('email send ')

    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
     return false;
  }  } 



  export const sendWelcomeEmail = async (email, name) => {

try {
    // Transporteur SMTP avec Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,           // Ton adresse email
        pass: process.env.EMAIL_PASSWORD,     // Mot de passe d'application Gmail 0835728874
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: to,
      subject: "Bienvenue sur Fatshi Emploi 🎉",
      html:WELCOME_EMAIL_TEMPLATE(email ,name),
    };

    // Envoie de l'email
    await transporter.sendMail(mailOptions);
    console.log('email send ')

    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
     return false;
  }



};


