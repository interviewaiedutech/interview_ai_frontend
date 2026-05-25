@echo off
echo Cleaning node_modules...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo Installing dependencies...
call npm install

echo Installing additional packages...
call npm install axios react-router-dom

echo Installation complete!
echo Run 'npm start' to start the application
pause