import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import Mail from 'nodemailer/lib/mailer';

import { AppError } from '../errors/app.error';

dotenv.config();

interface EmailInfos {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  date: Date;
}

class SendEmailController {
  private transporter?: Mail;
  private isAuthorizedToSendEmail = false;
  private emailInfos?: EmailInfos;

  constructor() {
    this.createTransporter();
    this.verifyTransporterConfiguration();
  }

  private createTransporter(): void {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
  }

  private verifyTransporterConfiguration() {
    this.transporter?.verify((error) => {
      if (error) {
        console.error(error);
        this.isAuthorizedToSendEmail = false;
      } else {
        this.isAuthorizedToSendEmail = true;
      }
    });
  }

  private sendEmailUsingTransporter(mail: Mail.Options): void {
    if (this.transporter) {
      this.transporter?.sendMail(mail, (error) => {
        if (error) {
          throw new AppError('Error sending email!', 500);
        }
      });
      return;
    }
    throw new AppError('Transporter not defined!', 500);
  }

  makeEmailMsg(): string | undefined {
    if (this.emailInfos) {
      const phoneString = this.emailInfos.phone
        ? `<div>Telefone / Whatsapp: ${this.emailInfos.phone}</div>`
        : '';

      return `
        <div>Nome:  <strong>${this.emailInfos.name}</strong></div>
        <div>E-mail: <strong>${this.emailInfos.email}</strong></div>
        ${phoneString}
        <h1></h1>
        <strong>Mensagem:</strong>
        <div>${this.emailInfos.message}</div>
      `;
    }
  }

  sendMail(req: Request, res: Response) {
    if (this.isAuthorizedToSendEmail) {
      const { name, subject, email, phone, message } = req.body;

      this.emailInfos = {
        name,
        subject,
        email,
        phone,
        message,
        date: new Date(),
      };

      const mail: Mail.Options = {
        from: name,
        to: process.env.EMAIL,
        subject: subject,
        date: String(Date.now()),
        html: this.makeEmailMsg(),
      };

      this.sendEmailUsingTransporter(mail); // Throws an error if something goes wrong
      return res.status(200).json({
        success: `Email successfully sent to ${name}!`,
      });
    } else {
      throw new AppError('Not authorized to send email!', 500);
    }
  }
}

export default new SendEmailController();
