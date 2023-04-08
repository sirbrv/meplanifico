Para pase a github
************************************************************************
    git init 
git remote add origin https://github.com/sirbrv/meplanificobackend.git
git add .
git status
git commit -m "Carga inicial del proyecto"
git push
git push --set-upstream origin master
git remote set-url origin https://github.com/sirbrv/meplanificobackend.git
git remote rm origin


Para pase a Heroku.
******************************************************************
heroku login
git remote -v
*** para crear ** Heroku create
*** pra renombrar Herohu apps:rename --app nombreinicial nombrenuevo 
heroku git:remote -a meplanificobackend
git remote -v
git push heroku master
Heroku logs --tail 

heroku ps:scale web=1

*** para Mysql ********************
heroku addons:create cleardb:ignite 
heroku config
heroku config --app meplanificobackend
heroku config:set DATABASE_URL=´mysql://b954e91af793b9:b0b4f80e@us-cdbr-east-06.cleardb.net/heroku_b72450ee00ac91b?reconnect=true´

CLEARDB_DATABASE_URL: mysql://b954e91af793b9:b0b4f80e@us-cdbr-east-06.cleardb.net/heroku_b72450ee00ac91b?reconnect=true

https://meplanificobackend.herokuapp.com