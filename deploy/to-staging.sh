now --public --name=hearth | xargs -I {} now alias {} staging.hearth-app.com

if [ $? -eq 0 ]; then
    echo Successfully deployed to staging.hearth-app.com!
else
    echo There was an error while deploying the app to the staging environment.
fi