@echo off
echo ==========================================
echo      Iniciando juego en modo kiosko       
echo ==========================================

:: Cerrar servidor anterior en puerto 5550 (si existe)
echo Cerrando servidor anterior (si existe)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5550" ^| find "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>&1
  echo Servidor anterior cerrado correctamente.
)

:: Iniciar servidor Node desde archivo temporal .cjs
echo Iniciando servidor del juego...
echo require('http').createServer((req,res)=^>require('fs').createReadStream(__dirname+'/dist'+(req.url==='/'?'/index.html':req.url)).on('error',()=^>(res.statusCode=404,res.end('404 Not Found'))).pipe(res)).listen(5550); > temp-server.cjs
start /b node temp-server.cjs

:: Esperar y validar servidor
timeout /t 4 >nul
netstat -aon | find ":5550" | find "LISTENING" >nul
if %ERRORLEVEL% equ 0 (
  echo Servidor iniciado correctamente.
  echo Abriendo Chrome en modo kiosko...
  start chrome.exe --kiosk http://localhost:5550
  echo ==========================================
  echo          Juego lanzado con exito!         
  echo ==========================================
) else (
  echo ==========================================
  echo   ERROR: No se pudo iniciar el servidor   
  echo ==========================================
  echo Verifica la instalacion de Node.js y puerto 5550 disponible.
)

timeout /t 3 >nul
exit
