# How to run:
copy constants.local.js to constants.js
```
# Install mongo dev:
npm i mongodb-runner@latest -g
# run mongo
mongodb-runner start
# install project dependencies
cp constants.local.js constants.js
npm i
# run project
npm run dev
npm run server
```

* dashboard locally: localhost:4000/dashboard/login
* user/pass: x

# workflow
* Checkout master
* PR to master
* Code review and test
* Merge master
* Push prod

# Deployment
Just push to prod :D
there is a cron that runs every 10 min and deploy
