# Setup script for the project
Write-Host "Installing project dependencies..." -ForegroundColor Green

# Change to project directory
Set-Location "C:\Users\pedro\Desktop\ROLETA\criacao-de-site-roleta"

# Install all dependencies
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    
    # Install the missing nookies package
    Write-Host "Installing nookies package..." -ForegroundColor Yellow
    npm install nookies
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "nookies package installed successfully!" -ForegroundColor Green
        Write-Host "Now starting the development server..." -ForegroundColor Green
        npm run dev
    } else {
        Write-Host "Failed to install nookies package" -ForegroundColor Red
    }
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
}