require('dotenv').config()
const nodemailer = require("nodemailer");

const communication = function () {

  async function sendMail(mail, sender, text) {

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ManageMe Website" <${sender}>`,
      to: mail,
      subject: "New Job ✔",
      text: text,
      html: `<b>${text}</b>`,
    });
  }


  return { sendMail }

}

module.exports = communication