// Simple test to verify dependencies are working
console.log('Running tests...');

try {
  // Test if required modules can be loaded (ES module syntax)
  const inquirer = await import('inquirer');
  const qr = await import('qr-image');
  const fs = await import('fs');
  
  console.log('All dependencies loaded successfully');
  
  // Test QR code generation without saving
  const testUrl = 'https://github.com/noumanic/qrcode-generator';
  const qrCode = qr.default.image(testUrl, { type: 'png' });
  
  if (qrCode) {
    console.log('QR code generation test passed');
  }
  
  console.log('All tests passed!');
  process.exit(0);
  
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
}