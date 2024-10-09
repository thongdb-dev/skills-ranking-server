import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const sendMail = async (message) => {
  const EMAIL = process.env.EMAIL_ADDRESS;
  const PASSWORD = process.env.EMAIL_PASSWORD;

  const config = {
    service: 'Gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);
  return transporter.sendMail(message);
};

export const sendActivateAccountEmail = async (user, token) => {
  const EMAIL = process.env.EMAIL_ADDRESS;

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Skills Ranking',
      link: 'https://skills-ranking-ui.vercel.app/',
    },
  });

  const response = {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro:
        "Welcome to Skills Ranking! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Skills Ranking, please click here:',
        button: {
          color: '#f02c56',
          text: 'Confirm your account',
          link: `https://skills-ranking-ui.vercel.app/activate?token=${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: user.email,
    subject: 'Skill Ranking - Activate Account',
    html: mail,
  };
  return sendMail(message);
};
