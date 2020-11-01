require('dotenv').config()
const nodemailer = require("nodemailer");
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const communication = function () {

  async function sendMail(mail, sender, text) {
    console.log(mail + " " + sender + " " + text);
    console.log(process.env.EMAIL + " " + process.env.EMAIL_PASS);

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

  async function sendSMS(phoneNum, sender, text) {
    twilio.messages
      .create({
        body: 'Test the twilio package',
        from: '+19382008816',
        to: '+972524201605'
      })
      .then(message => console.log(message.sid)).done()
  }

  return { sendMail, sendSMS }
}

module.exports = communication