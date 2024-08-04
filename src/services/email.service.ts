// import nodemailer, { Transporter } from "nodemailer";
// import hbs from "nodemailer-express-handlebars";
//
// import { configs } from "../configs/configs";
//
// class EmailService {
//   public async sendEmail(to: string): Promise<void> {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       from: configs.SMTP_EMAIL,
//       auth: {
//         user: configs.SMTP_EMAIL,
//         password: configs.SMTP_PASSWORD,
//       },
//     });
//     transporter.sendMail({
//         to,
//     subject: "Hello!!!",
//     template: "Hello!",});
//   }
// }
// export const emailService = new EmailService();
