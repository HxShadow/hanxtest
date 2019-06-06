#! /bin/bash
# 2019/06/06 by HAN Xiao
# Description   ：
sed -i '/<li>/d' files.html
sed -i '/<!-- -->/d' files.html
for file in `ls ../files/`
do
#	echo "<li> <a href=\"html/$file\">$file</a></li>"
	echo "<li> <a href=\"../files/$file\">$file</a></li><br/>" >> files.html
done
echo "<br/> <hr/> </head> </html> <!-- -->" >> files.html
