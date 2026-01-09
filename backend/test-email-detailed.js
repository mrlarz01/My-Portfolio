/**
 * Detailed Email Test with Debugging
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔍 Detailed Email Test\n');

// Show configuration
console.log('Configuration:');
console.log('  EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
console.log('  EMAIL_USER:', process.env.EMAIL_USER);
console.log('  EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : 'NOT SET');
console.log('  ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('\n');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
});

// Verify connection
console.log('📡 Verifying SMTP connection...\n');
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ SMTP Connection Failed:', error);
  } else {
    console.log('✅ SMTP Server is ready to send emails\n');
    
    // Send test email
    console.log('📧 Sending test email...\n');
    
    const mailOptions = {
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🧪 TEST EMAIL - Portfolio Notification System',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 30px; border-radius: 10px; }
            .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px; }
            .content { background: white; padding: 20px; margin-top: 20px; border-radius: 5px; }
            .success { color: #4CAF50; font-size: 24px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Email System Test</h1>
            </div>
            <div class="content">
              <p class="success">SUCCESS!</p>
              <p>If you're reading this, your email notification system is working correctly!</p>
              <hr>
              <p><strong>Test Details:</strong></p>
              <ul>
                <li>Sent from: ${process.env.EMAIL_USER}</li>
                <li>Sent to: ${process.env.ADMIN_EMAIL}</li>
                <li>Time: ${new Date().toLocaleString()}</li>
                <li>Service: Gmail SMTP</li>
              </ul>
              <hr>
              <p><strong>What this means:</strong></p>
              <p>✅ Your email credentials are correct<br>
              ✅ SMTP connection is working<br>
              ✅ Emails can be sent successfully<br>
              ✅ Contact form notifications will work</p>
              <hr>
              <p style="color: #666; font-size: 12px;">
                This is a test email from your portfolio website email notification system.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
TEST EMAIL - Portfolio Notification System

SUCCESS! If you're reading this, your email notification system is working correctly!

Test Details:
- Sent from: ${process.env.EMAIL_USER}
- Sent to: ${process.env.ADMIN_EMAIL}
- Time: ${new Date().toLocaleString()}
- Service: Gmail SMTP

What this means:
✅ Your email credentials are correct
✅ SMTP connection is working
✅ Emails can be sent successfully
✅ Contact form notifications will work

This is a test email from your portfolio website email notification system.
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('❌ Email Send Failed:', error);
      } else {
        console.log('✅ Email Sent Successfully!');
        console.log('   Message ID:', info.messageId);
        console.log('   Response:', info.response);
        console.log('\n📬 Check your email at:', process.env.ADMIN_EMAIL);
        console.log('\nIf you don\'t see it:');
        console.log('  1. Check SPAM/JUNK folder');
        console.log('  2. Search for: "TEST EMAIL"');
        console.log('  3. Check All Mail folder');
        console.log('  4. Wait 2-3 minutes for delivery');
        console.log('\n💡 TIP: Since you\'re sending from and to the same email,');
        console.log('   Gmail might filter it. Check your Spam folder first!');
      }
    });
  }
});
