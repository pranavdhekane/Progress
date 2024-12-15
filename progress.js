import { exec } from 'child_process';
import path from 'path';

// Get the current working directory (where the .exe is executed)
const currentDir = process.cwd();
console.log(`Running in directory: ${currentDir}`);

// Change to the current directory
process.chdir(currentDir);

// Function to execute terminal commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve();
    });
  });
}

// Main function to start the servers
async function startServers() {
  try {
    console.log('Starting backend server...');
    runCommand('npm start'); // Start backend server in the background
    
    console.log('Opening app in browser...');
    runCommand('start http://localhost:5173'); // Open the app in the browser

    console.log('Starting Vite development server...');
    await runCommand('npm run dev'); // Start Vite development server

  } catch (err) {
    console.error('Error starting servers:', err);
  }
}

startServers();
