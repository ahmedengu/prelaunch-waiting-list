mkdir -p versions
cd versions
newDir=$(date +%Y%m%d%H%M%S)
git clone git@github.com:ahmedengu/merquant_prelunch.git "$newDir"
cd "$newDir"
npm i
npm run build
ln -sfn "$(pwd)" /srv/deploy/current

supervisorctl restart all

cp -rf deploy.sh /srv/deploy/deploy.sh

cd ..
find "$(pwd)" -type d -ctime +10 -exec rm -rf {} \;
