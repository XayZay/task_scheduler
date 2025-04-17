:A
@echo off
Title Website Pinger
color 0e
echo Enter the website you would like to ping
set input=
set /p input= Enter your Website here:
if %input%==goto A if NOT B
echo Processing Your request
ping localhost>nul
echo -------------------------------------------------------------------------------------
echo If you do not close this in 45 seconds you will go to GOOGLE.COM
echo -------------------------------------------------------------------------------------
ping localhost>nul
echo This is the IP=
ping %input%
set input=
set /p input= If you want to open this address please enter the IP here:
start iexplore.exe %input%
set input2=
set /p input2=
if %input% exit goto exit
ping localhost -n 45 >nul
start iexplore.exe google.com
exit
:exit
exit