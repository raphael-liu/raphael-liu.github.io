git rm -rf ./
cd ../myhexo
hexo clean
hexo g
hexo d
cp -rf static/ ../raphael-liu.github.io/static/
cp -rf public/* ../raphael-liu.github.io/
cp -f CNAME ../raphael-liu.github.io/
cp -f 404.html ../raphael-liu.github.io/
cp -f run.sh ../raphael-liu.github.io/
cd ../raphael-liu.github.io
#wget -P ./static/ http://pac.internal.baidu.com/bdnew.pac 
chmod +x run.sh