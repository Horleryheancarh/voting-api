import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MAIL_PASS, MAIL_USER } from 'src/config';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'oladipoolayinka@zohomail.com',
      to,
      subject,
      html,
    });
  }
}
