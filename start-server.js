// Simple script to verify installation and start dev server
const { exec } = require('child_process');
const path = require('path');

console.log('Checking project structure...');

// Try to use Next.js directly through Node modules
try {
  const nextPath = require.resolve('next/dist/bin/next', { paths: [path.resolve(__dirname)] });
  console.log('Next.js found at:', nextPath);
  
  // Start dev server
  exec('npx next dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Next.js dev server: ${error}`);
      return;
    }
    console.log(`Next.js Dev Server Output:\n${stdout}`);
  });
} catch (error) {
  console.log('Next.js not found directly, trying npm run...');
}

// Try running the commands directly
exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running npm run dev: ${error.message}`);
    console.log('stderr:', stderr);
  } else {
    console.log('npm run dev output:\n' + stdout);
  }
});