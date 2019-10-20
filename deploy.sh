cd versions
newDir=$(date +%Y%m%d%H%M%S)
git clone git@github.com:ahmedengu/merquant_prelunch.git "$newDir"
cd "$newDir"
npm i
npm run build
ln -s "$(pwd)" /srv/deploy/current

supervisorctl restart all

cd ..
find "$(pwd)" -type d -ctime +10 -exec rm -rf {} \;
