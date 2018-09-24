now alias staging.hearth-app.com hearth-app.com

if [ $? -eq 0 ]; then
    echo Successfully promoted staging!
else
    echo There was an error while promoting staging to production.
fi