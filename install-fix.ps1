# NEXA AI Platform - Installation Fix Script
# Run this in PowerShell as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXA AI Platform - Installation Fix  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check npm version
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 1: Cleaning npm cache           " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
npm cache clean --force
Write-Host "✓ Cache cleaned" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 2: Configuring npm               " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
npm config set registry https://registry.npmjs.org/
npm config set fetch-timeout 600000
npm config set maxsockets 1
Write-Host "✓ npm configured" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 3: Installing Core Dependencies  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "This may take several minutes..." -ForegroundColor Yellow
Write-Host ""

# Navigate to project directory
Set-Location -Path $PSScriptRoot

# Try installing in batches
Write-Host "Installing Next.js and React..." -ForegroundColor Yellow
npm install --no-save next@15.1.4 react@19.0.0 react-dom@19.0.0

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Core frameworks installed" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Installing UI libraries..." -ForegroundColor Yellow
    npm install --no-save lucide-react@0.468.0 clsx@2.1.1 tailwind-merge@2.7.0 date-fns@4.1.0
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ UI libraries installed" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "Installing dev dependencies..." -ForegroundColor Yellow
        npm install --save-dev typescript@5.7.3 @types/node@22.10.5 @types/react@19.0.7 @types/react-dom@19.0.2
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ TypeScript installed" -ForegroundColor Green
            
            Write-Host ""
            Write-Host "Installing build tools..." -ForegroundColor Yellow
            npm install --save-dev eslint@9.18.0 eslint-config-next@15.1.4 tailwindcss@3.4.17 postcss@8.4.49 autoprefixer@10.4.20
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Build tools installed" -ForegroundColor Green
                
                Write-Host ""
                Write-Host "========================================" -ForegroundColor Cyan
                Write-Host "  Installation Complete!                " -ForegroundColor Green
                Write-Host "========================================" -ForegroundColor Cyan
                Write-Host ""
                Write-Host "Run 'npm run dev' to start the development server" -ForegroundColor Yellow
                Write-Host "Then open http://localhost:3000 in your browser" -ForegroundColor Yellow
            } else {
                Write-Host "✗ Build tools installation failed" -ForegroundColor Red
                Write-Host "Try running: npm install --save-dev --legacy-peer-deps" -ForegroundColor Yellow
            }
        } else {
            Write-Host "✗ TypeScript installation failed" -ForegroundColor Red
            Write-Host "Check your network connection and try again" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ UI libraries installation failed" -ForegroundColor Red
        Write-Host "Check your network connection and try again" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ Core frameworks installation failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible solutions:" -ForegroundColor Yellow
    Write-Host "1. Check your internet connection" -ForegroundColor White
    Write-Host "2. Disable antivirus/firewall temporarily" -ForegroundColor White
    Write-Host "3. Try using a VPN" -ForegroundColor White
    Write-Host "4. Run this script as Administrator" -ForegroundColor White
    Write-Host "5. Try manual installation (see INSTALLATION.md)" -ForegroundColor White
}

Write-Host ""
Write-Host "For more help, see INSTALLATION.md" -ForegroundColor Cyan
