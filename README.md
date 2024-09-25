## RN Shopy

Install deps and configure build pipeline:

```
// Install deps
yarn

// Launch expo server, press I or A to open iOS or Android sim in debug mode
// yarn start

// Install eas-cli for production build
npm install -g eas-cli

// Login to eas
eas login

// Configure eas.json and app.json for your build and account (or simply remove project id from app.json)

// Run android prod build
yarn release:android

// For iOS, you need paid account to launch in production mode, configure in promts by running
yarn release:ios
```

## About

Project was created with feature-based architecture and declarative routing.

app - app with react files, this directory is used by Expo Router for generating navigation tree
core - central dependencies of app, this module could be shared between apps cause it does not contain any app-specific logic
entites - contains domain models, repositories and SQL queries
features - independent app features
- home - posts CRUD features
- settings - customizations features
- auth - users CRUD features
- bootstrap - glue for all layers, app launches from this code

## Features

### What's done

- auth (regexp on each field; email should be valid; name should contain at least 8 symbols; password should contain at least 8 symbols; including one capital and one symbol)
- theming (you could switch theme in settings)
- i18n (you could switch language in settings)
- DI (hand-made, without inversify, located in bootstrap feature)
- basic logging & analytics template (not used yet, but you could check this provider-based solutions inside core/utils)
- comments (home screen UI, SQL requests, pagination)
- security (storing current session in secure storage, using password hash)
- performance (using react-native-screens with native navigation primitives)

### What's can be done, but time is running out

- optimize way of storing comments tree in SQLite, without initial precalculating of nodes and childs
- implement KeyboardAvoidingView not only on auth screen, but also on home screen
- inject logger and analytics classes into screen view models and collect user activity to any provider (just implement your provider and inject into wrapper)
- #### you cannot use a username and email if they are already registered in a different pair; to log in, you must specify the same username, password, and email; if the username-email pair is not registered yet, the system will automatically register and login; this flow can be normalized by making different flows for login and registration
- react-native-freeze was disabled cause of small UI glitch after theme switch (native header will rerender after navigation finishes). To solve this, we could use JS-only header, but again time is running out
