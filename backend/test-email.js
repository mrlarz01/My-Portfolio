/**
 * Email Notification Test Script
 * 
 * This script tests the email notification feature without needing to submit
 * a contact form through the website.
 * 
 * Usage:
 *   node test-email.js
 */

require('dotenv').config();
const { sendContactNotification } = require('./services/emailService');

// Test contact data
const testContact = {
  name: 'Test User',
  email: 'testuser@example.com',
  phone: '+1 (555) 123-4567',
  subject: 'Test Email Notification',
  message: 'This is a test message to verify that email notifications are working correctly. If you receive this email, your email notification system is set up properly!',
  date: new Date().toISOString(),
};

console.log('🧪 Testing Email Notification System...\n');
console.log('Configuration:');
console.log('  Email Service:', process.env.EMAIL_SERVICE || 'NOT SET');
console.log('  Email User:', process.env.EMAIL_USER || 'NOT SET');
console.log('  Email Password:', process.env.EMAIL_PASSWORD ? '***SET***' : 'NOT SET');
console.log('  Admin Email:', process.env.ADMIN_EMAIL || 'bakrinola80@gmail.com');
console.log('\n');

if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('❌ Email configuration is incomplete!');
  console.error('\nPlease update your backend/.env file with:');
  console.error('  EMAIL_SERVICE=gmail');
  console.error('  EMAIL_USER=your-email@gmail.com');
  console.error('  EMAIL_PASSWORD=your-app-password');
  console.error('  ADMIN_EMAIL=bakrinola80@gmail.com');
  console.error('\nSee EMAIL_NOTIFICATION_SETUP.md for detailed instructions.');
  process.exit(1);
}

console.log('📧 Sending test email notification...\n');

sendContactNotification(testContact)
  .then((result) => {
    if (result.success) {
      console.log('✅ SUCCESS! Email notification sent successfully!');
      console.log('   Message ID:', result.messageId);
      console.log('\n📬 Check your inbox at:', process.env.ADMIN_EMAIL || 'bakrinola80@gmail.com');
      console.log('\nIf you don\'t see the email:');
      console.log('  1. Check your spam/junk folder');
      console.log('  2. Wait a few minutes (email delivery can be delayed)');
      console.log('  3. Verify your email credentials in .env file');
    } else {
      console.error('❌ FAILED! Email notification could not be sent.');
      console.error('   Reason:', result.message || result.error);
      console.error('\nTroubleshooting:');
      console.error('  1. Verify your email credentials in backend/.env');
      console.error('  2. Make sure you\'re using an App Password (not regular password)');
      console.error('  3. Check if 2FA is enabled for Gmail');
      console.error('  4. See EMAIL_NOTIFICATION_SETUP.md for detailed setup instructions');
    }
  })
  .catch((error) => {
    console.error('❌ ERROR! An unexpected error occurred:');
    console.error('   ', error.message);
    console.error('\nFull error:', error);
  });
