const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  // Check if email service is configured
  if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email service not configured. Email notifications will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'outlook', 'yahoo'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Format date for email
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

// Send new contact notification to admin
const sendContactNotification = async (contactData) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email service not configured. Skipping email notification.');
    return { success: false, message: 'Email service not configured' };
  }

  const { name, email, phone, subject, message, date } = contactData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'bakrinola80@gmail.com',
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
          }
          .field-label {
            font-weight: bold;
            color: #667eea;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .field-value {
            color: #333;
            font-size: 14px;
          }
          .message-box {
            background: white;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #e0e0e0;
            margin-top: 10px;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 10px 10px;
            font-size: 12px;
          }
          .reply-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔔 New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new message from your portfolio website</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </div>
          </div>
          
          ${phone ? `
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${phone}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Date & Time</div>
            <div class="field-value">${formatDate(date)}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${message}</div>
          </div>
          
          <div style="text-align: center;">
            <a href="mailto:${email}" class="reply-button">Reply to ${name}</a>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0;">This is an automated notification from your portfolio website.</p>
          <p style="margin: 10px 0 0 0; opacity: 0.7;">You can view and manage all messages in your admin panel.</p>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission

From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}
Date: ${formatDate(date)}

Message:
${message}

---
Reply to: ${email}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
};
