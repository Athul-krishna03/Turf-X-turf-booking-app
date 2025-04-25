import nodemailer from "nodemailer";
import { injectable } from "tsyringe";
import { INodemailerService } from "../../entities/services/INodeMailerService";
import { config } from "../../shared/config";
import { VERIFICATION_MAIL_CONTENT,HTTP_STATUS,ERROR_MESSAGES,SUCCESS_MESSAGES,RESET_PASSWORD_MAIL_CONTENT } from "../../shared/constants";

@injectable()
export class NodemailerService implements INodemailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: config.nodemailer.EMAIL_USER,
                pass: config.nodemailer.EMAIL_PASS,
            },
        });
    }

    async sendOtpEmail(email: string, otp: string): Promise<{ success: boolean; message: string }> {
        try {
            if (!email || !otp) {
                return { success: false, message: "Email and OTP are required!" };
            }

            const mailOptions = {
                from: `"Auto Auction" <${config.nodemailer.EMAIL_USER}>`,
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
                html: `${VERIFICATION_MAIL_CONTENT(otp)}`
            };

            await this.transporter.sendMail(mailOptions);
            return { success: true, message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS };
        } catch (error) {
            console.error("❌ Error sending OTP email:", error);
            return { success: false, message: "Failed to send OTP email. Please try again later." };
        }
    }

    async sendRestEmail(email: string, subject: string, resetLink: string): Promise<void> {
            const mailOptions = {
                from:`Auo Auction <${config.nodemailer.EMAIL_USER}>`,
                to:email,
                subject:subject,
                html:`${RESET_PASSWORD_MAIL_CONTENT(resetLink)}`
            }
            await this.transporter.sendMail(mailOptions);
    }

    async sendEmail(email: string, subject: string,content:string): Promise<void> {

        const mailOptions = {
            from:`Auo Auction <${config.nodemailer.EMAIL_USER}>`,
            to:email,
            subject:subject,
            html:`${RESET_PASSWORD_MAIL_CONTENT(content)}`
        }
        await this.transporter.sendMail(mailOptions);
}
}
