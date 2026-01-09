// Quick test script to verify upload endpoint
const fs = require('fs');
const path = require('path');

console.log('Testing upload configuration...\n');

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  console.log('✓ Uploads directory exists:', uploadsDir);
  
  // Check if writable
  try {
    const testFile = path.join(uploadsDir, 'test.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✓ Uploads directory is writable');
  } catch (err) {
    console.log('✗ Uploads directory is NOT writable:', err.message);
  }
} else {
  console.log('✗ Uploads directory does NOT exist');
  console.log('  Creating uploads directory...');
  fs.mkdirSync(uploadsDir);
  console.log('✓ Uploads directory created');
}

// Check if data directory exists
const dataDir = path.join(__dirname, 'data');
if (fs.existsSync(dataDir)) {
  console.log('✓ Data directory exists:', dataDir);
} else {
  console.log('✗ Data directory does NOT exist');
}

// Check if resume.json exists
const resumeFile = path.join(dataDir, 'resume.json');
if (fs.existsSync(resumeFile)) {
  console.log('✓ Resume.json exists');
  const resume = JSON.parse(fs.readFileSync(resumeFile, 'utf8'));
  console.log('  Current cvFile:', resume.cvFile || 'null');
} else {
  console.log('✗ Resume.json does NOT exist');
}

console.log('\nConfiguration check complete!');
