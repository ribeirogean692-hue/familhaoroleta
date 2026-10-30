@echo off
echo Installing dependencies...
npm install
if %errorlevel% equ 0 (
    echo Dependencies installed successfully!
    echo Starting development server...
    npm run dev
) else (
    echo Failed to install dependencies
    pause
)