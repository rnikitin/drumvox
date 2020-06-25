# DRUMVOX
DrumVox is the app and best online drum school ever

# How to run

Run development server
```
ionic serve
```

Run android project
```
ionic cap copy
ionic cap open android
```

To update plugins and break everything use
```
ionic cap copy
```

To run the app with local development host
```
ionic capacitor run android -l --external=http://192.168.0.100:8100
```

To deploy drumvox webapp to firebase hosting
```
ionic build --prod
firebase deploy --only hosting
```