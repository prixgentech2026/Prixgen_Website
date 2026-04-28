@echo off
echo Installing dependencies for Prixgen Enterprise...
pnpm install
if %ERRORLEVEL% NEQ 0 (
    echo pnpm failed, trying npm...
    npm install
)
echo.
echo Dependencies installed successfully!
echo To start the development server, run: pnpm dev (or npm run dev)
pause
