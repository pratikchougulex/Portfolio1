"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var dataDir = import_path.default.join(process.cwd(), "data");
if (!import_fs.default.existsSync(dataDir)) {
  import_fs.default.mkdirSync(dataDir, { recursive: true });
}
var inquiriesFilePath = import_path.default.join(dataDir, "inquiries.json");
function saveInquiryLocally(inquiry) {
  try {
    let list = [];
    if (import_fs.default.existsSync(inquiriesFilePath)) {
      const fileData = import_fs.default.readFileSync(inquiriesFilePath, "utf-8");
      list = fileData ? JSON.parse(fileData) : [];
    }
    list.unshift(inquiry);
    import_fs.default.writeFileSync(inquiriesFilePath, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("Could not save inquiry locally:", err.message);
  }
}
var rateLimitMap = /* @__PURE__ */ new Map();
var RATE_LIMIT_WINDOW_MS = 10 * 60 * 1e3;
var MAX_REQUESTS_PER_WINDOW = 10;
function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"]?.toString() || "anonymous";
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: "Rate limit reached. Please email directly at pratikchougulex@gmail.com."
    });
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  next();
}
function sanitize(input) {
  if (!input) return "";
  return input.trim().replace(/[<>]/g, "");
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
  app.use(import_express.default.json({ limit: "50kb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "50kb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
  const rawUser = process.env.GMAIL_USER || process.env.SMTP_USER || process.env.EMAIL_USER;
  const rawPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const smtpUser = rawUser && rawUser.trim().length > 0 ? rawUser.trim() : null;
  const smtpPass = rawPass && rawPass.trim().length > 0 ? rawPass.trim().replace(/\s+/g, "") : null;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const isSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "pratikchougulex@gmail.com";
  let transporter = null;
  if (smtpUser && smtpPass) {
    const isGmail = smtpHost.includes("gmail.com");
    const transportOptions = isGmail ? {
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    } : {
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      }
    };
    transporter = import_nodemailer.default.createTransport(transportOptions);
    transporter.verify((err) => {
      if (err) {
        console.warn("\x1B[33m[SMTP Notice] SMTP authentication check:\x1B[0m", err.message);
        console.log("\x1B[36m[Backend Resilience] Automatic local backup & console pipeline active so zero messages will be lost.\x1B[0m");
      } else {
        console.log(`\x1B[32m[SMTP Success] Transporter verified. Messages will be dispatched directly to ${receiverEmail}\x1B[0m`);
      }
    });
  }
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      uptime: process.uptime(),
      smtpConfigured: !!(smtpUser && smtpPass),
      receiver: receiverEmail,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/profile", (req, res) => {
    res.json({
      name: "Pratik Chougule",
      role: "Financial Analyst",
      education: "MSc in Finance (UCC) | B.Eng Computer Engineering",
      email: "pratikchougulex@gmail.com",
      phone: "089 946 2795",
      internationalPhone: "+353899462795",
      whatsappUrl: "https://wa.me/353899462795",
      linkedinUrl: "https://linkedin.com/in/pratikchougule10",
      location: "Limerick, Ireland",
      availableForHire: true
    });
  });
  app.post("/api/contact", rateLimiter, async (req, res) => {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const subject = sanitize(req.body.subject) || "Portfolio Inquiry";
    const message = sanitize(req.body.message);
    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, error: "Please enter your name (minimum 2 characters)." });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }
    if (!message || message.length < 5) {
      return res.status(400).json({ success: false, error: "Please enter a message (minimum 5 characters)." });
    }
    const formattedPlainBody = `name: ${name}
recipents mail id : ${email}
subject and message: ${subject ? `${subject} - ` : ""}${message}`;
    console.log("\n=============================================");
    console.log("\u{1F4EC} NEW CONTACT FORM SUBMISSION RECEIVED");
    console.log("=============================================");
    console.log(formattedPlainBody);
    console.log("=============================================\n");
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
          `
        };
        await transporter.sendMail(mailOptions);
        sentViaSmtp = true;
        console.log(`\x1B[32m\u2714 Email successfully delivered to ${receiverEmail}\x1B[0m`);
      } catch (smtpErr) {
        console.warn(`\x1B[33m[SMTP Fallback] Could not send via SMTP (${smtpErr.message}). Captured safely in server database.\x1B[0m`);
      }
    }
    saveInquiryLocally({
      name,
      email,
      subject,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      sentViaSmtp
    });
    return res.status(200).json({
      success: true,
      message: `Thank you, ${name}! Your message has been received successfully.`
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\x1B[32m\u2714 Portfolio server running at http://localhost:${PORT}\x1B[0m`);
    console.log(`\x1B[36m\u2714 Ready to handle inquiries for pratikchougulex@gmail.com\x1B[0m`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
