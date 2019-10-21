mkdir -p /srv/deploy/versions
cd /srv/deploy/versions
newDir=$(date +%Y%m%d%H%M%S)
git clone --single-branch --branch prod git@github.com:ahmedengu/merquant_prelunch.git "$newDir"
cd "$newDir"
chown -R www-data:www-data /srv/deploy/
cp -rf constants.prod.js constants.js

npm i
#supervisorctl stop all
npm run build

ln -sfn /srv/deploy/versions/"$newDir" /srv/deploy/current
supervisorctl restart all

cp -rf deploy.sh /srv/deploy/deploy.sh

cd ..
find "$(pwd)" -type d -ctime +10 -exec rm -rf {} \;
