import nodemailer from "nodemailer";
const senEmail = async ({receiver, subject, text}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,

        },
    });

    console.log("Email user:", process.env.EMAIL_USER),
    console.log("Email pass:", process.env.EMAIL_PASS)
    console.log("receiver:", receiver, "subject:", subject, "text:", text)
   
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: receiver,
        subject,
        html: text,
    });
};

export default senEmail;