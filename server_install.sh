sudo apt-get update -y
sudo apt-get upgrade -y
curl -sL https://deb.nodesource.com/setup_10.x | bash -
sudo add-apt-repository ppa:ondrej/php
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update -y

wget -O- https://raw.github.com/ajenti/ajenti/1.x/scripts/install-ubuntu.sh | sudo sh
ufw allow 8000
sudo ufw allow 143
sudo ufw allow 25
sudo ufw allow 993
sudo ufw allow 110
sudo ufw allow 995

sudo apt-get autoremove && sudo apt-get remove apache2*
sudo apt-get install -y ajenti-v ajenti-v-nginx ajenti-v-mail ajenti-v-ftp-pureftpd ajenti-v-nodejs ajenti-v-php7.0-fpm php7.0-mysql php7.0-mbstring php7.0-cli php7.0-curl php7.0-dom apache2-utils
sudo apt-get install -y bind9
sudo apt-get install -y fail2ban

sudo apt-get install -y mongodb-org python-pip build-essential python-dev libssl-dev unzip --allow-unauthenticated
sudo pip install pymongo
sudo systemctl enable mongod

sudo apt-get install -y mysql-server
sudo mysql_secure_installation

sudo apt-get install -y nodejs

ssh-keygen -t rsa

sudo apt-get install -y gitolite3
#/root/.ssh/id_rsa.pub

service ajenti restart


sudo fallocate -l 4G /swapfile
sudo mkswap /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile


#
#
#db.createUser(
#  {
#    user: "admin",
#    pwd: "PASSWORD",
#    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
#  }
#)
#
#use MerQuantDB
#
#db.createUser(
#    {
#      user: "MerQuantUser",
#      pwd: "PASSWORD",
#      roles: [
#         { role: "readWrite", db: "MerQuantDB" },
#      ]
#    }
#)
#

# rainloop

wget -qO- http://repository.rainloop.net/installer.php | php
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chown -R www-data:www-data .

