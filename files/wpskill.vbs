do
CreateObject("WScript.Shell").Run "taskkill /f /im wpscenter.exe", 0
CreateObject("WScript.Shell").Run "taskkill /f /im wpscloudsvr.exe", 0
CreateObject("WScript.Shell").Run "taskkill /f /im TaobaoProtect.exe", 0
CreateObject("WScript.Shell").Run "taskkill /f /im wpsrenderer.exe", 0
CreateObject("WScript.Shell").Run "taskkill /f /im SohuNews.exe", 0
CreateObject("WScript.Shell").Run "taskkill /f /im SGTool.exe", 0
wscript.sleep 12000
loop