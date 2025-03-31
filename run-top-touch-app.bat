@echo off
echo ==============================================
echo        Iniciando juego en modo kiosko        
echo ==============================================

:: Validar primero si Node.js está instalado
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo ----------------------------------------------
  echo ERROR: Node.js no esta instalado.
  echo Por favor instala Node.js antes de continuar.
  echo ----------------------------------------------
  timeout /t 5 >nul
  exit
) else (
  for /f "delims=" %%i in ('node -v') do set "NODE_VERSION=%%i"
  echo Node.js detectado.
)

:: Cerrando servidor anterior en puerto 5550 (si existe)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5550" ^| find "LISTENING"') do (
  echo Cerrando servidor anterior en puerto 5550...
  taskkill /PID %%a /F >nul 2>&1
)

:: Inicia servidor Node.js (puerto 5550)
echo Iniciando servidor del juego en puerto 5550...
start /b node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let filePath=path.join(__dirname,'dist',req.url==='/'?'/index.html':req.url);fs.readFile(filePath,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');}else{const ext=path.extname(filePath);const mimeTypes={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};res.writeHead(200,{'Content-Type':mimeTypes[ext]||'text/plain'});res.end(data);}});}).listen(5550);"

timeout /t 3 >nul

:: Validación antes de abrir Chrome
netstat -aon | find ":5550" | find "LISTENING" >nul
if %ERRORLEVEL% equ 0 (
  echo Servidor iniciado correctamente.
  echo Abriendo Chrome en modo kiosko...
  start chrome.exe --kiosk http://localhost:5550
  echo ----------------------------------------------
  echo           Juego iniciado con exito           
  echo ----------------------------------------------
) else (
  echo ----------------------------------------------
  echo ERROR: No se pudo iniciar el servidor.
  echo Revisa que el puerto 5550 este disponible.
  echo ----------------------------------------------
)

timeout /t 5 >nul
exit
