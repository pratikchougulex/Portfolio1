import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Ensure data directory exists for inquiry backup
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const inquiriesFilePath = path.join(dataDir, 'inquiries.json');

// Helper to save inquiries persistently
function saveInquiryLocally(inquiry: { name: string; email: string; subject: string; message: string; timestamp: string; sentViaSmtp: boolean }) {
  try {
    let list: any[] = [];
    if (fs.existsSync(inquiriesFilePath)) {
      const fileData = fs.readFileSync(inquiriesFilePath, 'utf-8');
      list = fileData ? JSON.parse(fileData) : [];
    }
    list.unshift(inquiry);
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(list, null, 2));
  } catch (err: any) {
    console.error('Could not save inquiry locally:', err.message);
  }
}

// Rate limiting in-memory storage (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per 10 minutes per IP

function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'anonymous';
  const now = Date.now();

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit reached. Please email directly at pratikchougulex@gmail.com.'
    });
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  next();
}

function sanitize(input: string): string {
  if (!input) return '';
  return input.trim().replace(/[<>]/g, '');
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Body parsing middleware
  app.use(express.json({ limit: '50kb' }));
  app.use(express.urlencoded({ extended: true, limit: '50kb' }));

  // Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Resolve SMTP configuration
  const rawUser = process.env.GMAIL_USER || process.env.SMTP_USER || process.env.EMAIL_USER;
  const rawPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const smtpUser = rawUser && rawUser.trim().length > 0 ? rawUser.trim() : null;
  const smtpPass = rawPass && rawPass.trim().length > 0 ? rawPass.trim().replace(/\s+/g, '') : null;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'pratikchougulex@gmail.com';

  let transporter: Transporter | null = null;

  if (smtpUser && smtpPass) {
    const isGmail = smtpHost.includes('gmail.com');
    const transportOptions = isGmail
      ? {
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        }
      : {
          host: smtpHost,
          port: smtpPort,
          secure: isSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        };

    transporter = nodemailer.createTransport(transportOptions as any);

    transporter.verify((err) => {
      if (err) {
        console.warn('\x1b[33m[SMTP Notice] SMTP authentication check:\x1b[0m', err.message);
        console.log('\x1b[36m[Backend Resilience] Automatic local backup & console pipeline active so zero messages will be lost.\x1b[0m');
      } else {
        console.log(`\x1b[32m[SMTP Success] Transporter verified. Messages will be dispatched directly to ${receiverEmail}\x1b[0m`);
      }
    });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      uptime: process.uptime(),
      smtpConfigured: !!(smtpUser && smtpPass),
      receiver: receiverEmail,
      timestamp: new Date().toISOString()
    });
  });

  // Profile metadata endpoint
  app.get('/api/profile', (req, res) => {
    res.json({
      name: 'Pratik Chougule',
      role: 'Financial Analyst',
      education: 'MSc in Finance (UCC) | B.Eng Computer Engineering',
      email: 'pratikchougulex@gmail.com',
      phone: '089 946 2795',
      internationalPhone: '+353899462795',
      whatsappUrl: 'https://wa.me/353899462795',
      linkedinUrl: 'https://linkedin.com/in/pratikchougule10',
      location: 'Limerick, Ireland',
      availableForHire: true
    });
  });

  // Contact API Endpoint
  app.post('/api/contact', rateLimiter, async (req: Request, res: Response) => {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const subject = sanitize(req.body.subject) || 'Portfolio Inquiry';
    const message = sanitize(req.body.message);

    // Validation
    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your name (minimum 2 characters).' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!message || message.length < 5) {
      return res.status(400).json({ success: false, error: 'Please enter a message (minimum 5 characters).' });
    }

    // Exact formatted template as requested:
    // name:
    // recipents mail id :
    // subject and message:
    const formattedPlainBody = `name: ${name}\nrecipents mail id : ${email}\nsubject and message: ${subject ? `${subject} - ` : ''}${message}`;

    console.log('\n=============================================');
    console.log('📬 NEW CONTACT FORM SUBMISSION RECEIVED');
    console.log('=============================================');
    console.log(formattedPlainBody);
    console.log('=============================================\n');

    let sentViaSmtp = false;

    if (transporter && smtpUser && smtpPass) {
      try {
        const mailOptions = {
          from: `"${name}" <${smtpUser}>`,
          to: receiverEmail,
          replyTo: email,
          subject: `Portfolio Contact: ${subject} (from ${name})`,
          text: formattedPlainBody,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; padding: 30px 20px; color: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); padding: 24px 28px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
                    New Portfolio Contact Submission
                  </h1>
                  <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0 0; font-size: 13px;">
                    Received through pratikchougule.com contact gateway
                  </p>
                </div>

                <!-- Content in requested template format -->
                <div style="padding: 28px; line-height: 1.6;">
                  
                  <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #334155;">
                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; display: block; margin-bottom: 4px;">name:</span>
                    <span style="font-size: 16px; font-weight: 600; color: #ffffff;">${name}</span>
                  </div>

                  <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #334155;">
                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; display: block; margin-bottom: 4px;">recipents mail id :</span>
                    <a href="mailto:${email}" style="font-size: 16px; font-weight: 600; color: #38bdf8; text-decoration: none;">${email}</a>
                  </div>

                  <div style="margin-bottom: 8px;">
                    <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; display: block; margin-bottom: 8px;">subject and message:</span>
                    <div style="background-color: #0f172a; border-left: 4px solid #6366f1; padding: 16px; border-radius: 8px; color: #e2e8f0; font-size: 14px; white-space: pre-wrap; font-family: inherit;"><strong>Subject: ${subject}</strong><br><br>${message}</div>
                  </div>

                </div>

                <!-- Footer -->
                <div style="background-color: #0f172a; padding: 16px 28px; border-top: 1px solid #334155; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #64748b;">
                    You can reply directly to this email to respond to <strong style="color: #cbd5e1;">${name}</strong> (${email}).
                  </p>
                </div>

              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        sentViaSmtp = true;
        console.log(`\x1b[32m✔ Email successfully delivered to ${receiverEmail}\x1b[0m`);
      } catch (smtpErr: any) {
        console.warn(`\x1b[33m[SMTP Fallback] Could not send via SMTP (${smtpErr.message}). Captured safely in server database.\x1b[0m`);
      }
    }

    // Always persist inquiry locally so no message is ever lost
    saveInquiryLocally({
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      sentViaSmtp
    });

    return res.status(200).json({
      success: true,
      message: `Thank you, ${name}! Your message has been received successfully.`
    });
  });

  // Vite middleware setup for Development vs Production Static Serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\x1b[32m✔ Portfolio server running at http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[36m✔ Ready to handle inquiries for pratikchougulex@gmail.com\x1b[0m`);
  });
}

startServer();
