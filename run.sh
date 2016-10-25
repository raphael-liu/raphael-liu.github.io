echo on
cd ../myhexo
hexo clean
hexo g
hexo d
cp -rf public/* ../raphael-liu.github.io/
cd ../raphael-liu.github.io