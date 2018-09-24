now --public --name=hearth | xargs -I {} now alias {} hearth-app.com

if [ $? -eq 0 ]; then
    echo Successfully deployed to hearth-app.com!
else
    echo There was an error while deploying the app to the production environment.
fi