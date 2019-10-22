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

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/71fcc53d4888eb19341472ec225e947d/purge_cache" \
      -H "Content-Type:application/json" \
      -H "Authorization: Bearer HOQUFhnlDKlVZ4BYP6v9qP0NfNqtr50pVucbPHmm" \
     --data '{"purge_everything":true}'
