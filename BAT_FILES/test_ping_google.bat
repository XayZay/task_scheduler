@echo off
echo Running ping test at %time% >> C:\Users\%USERNAME%\Desktop\bat_logs\ping_log.txt
ping www.google.com >> C:\Users\%USERNAME%\Desktop\bat_logs\ping_log.txt
echo. >> C:\Users\%USERNAME%\Desktop\bat_logs\ping_log.txt
