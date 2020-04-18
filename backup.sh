mkdir -p /root/backups
cd /root/backups
newDir=$(date +%Y%m%d%H%M%S)
mkdir "$newDir"
cd "$newDir"

mongodump --uri=$DATABASE_URI --gzip
mysqldump -u root -p$MYSQL_PASS --all-databases > dump.sql

cd ..
ls -dt */ | tail -n +10 | xargs rm -rf
