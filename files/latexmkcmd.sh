latexmk -pvc -pdf -e '$pdflatex=q/xelatex %O -interaction=nonstopmode %S/' sample-master.tex
latexmk -pvc -pdf -xelatex -interaction=nonstopmode sample-master.tex
