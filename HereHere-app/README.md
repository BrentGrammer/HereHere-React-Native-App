# Here Here Mobile App

### Find out what's happening at a place from those who are there right now!

React Native App built with Expo and consuming Google Places API. Integration with socket.io. Built for Android.

### Features:

- Users search places in Google Maps and chat live with other users who are there to find out what's going on.
- Users can find out how many people are at a place - if it's crowded or not, what the crowd is like, any special deals going on, what's on the menu, etc. to determine if they want to visit without having to call. Get inside information from people who are there!
- Socket.io for live chat over web sockets
- Search for any place and get auto suggestions through the Google Places API
- Login to save places or use the app without logging in
- Ephemereal chat messages which are cleared every 3 hours - get the latest info on what's going on at a place

### Technologies used:

- React
- Redux
- redux-thunk
- Expo (using React-Navigation)
- Socket.io library to use WebSockets
- MongoDB for persisting data
- Consumes Google Places API - \* You must have billing enabled for the project in GCP for this to work

### Running the app:

- \$ `yarn install`
- \$ `yarn start` (see note below to run on expo on your device)

### Running the app with Expo (made need to do this with latest version?):

- #### Pre-requisites:

  - Expo app loaded on your android device, download from Google Play Store
  - Expo-cli installed globally: `npm install -g expo-cli`

- `expo start -c`
  (switch to tunnel or LAN option)
- Open Expo app on phone and scan the barcode in the browser that opens up

### Deploying to Expo:

- see https://docs.expo.io/versions/latest/workflow/publishing/
- Just run \$ `expo publish`
- When done you will have a link to the published app on Expo

### Build:

- _Don't forget to update and increment the version code and number in app.json_
  - this generates an apk and gives you a link to download it when done - you use this to upload to Google Play
- \$ `expo build:android`

### Debugging:

- Install _React Native Tools_ extension in VS Code
- Click on run/play debugger icon in left view bar and select top option button if present to create a launch.json file for Android debugging
- Use Flipper 
- Using `adb`:  See instructions [here](https://www.hexnode.com/mobile-device-management/help/obtain-android-device-logs-using-windows-and-mac/) and this [post](https://stackoverflow.com/questions/17511867/android-logcat-is-empty-when-debug-with-device-in-android-studio/25331900). Navigate to Android platform-tools folder on your machine and run:
  - `adb kill-server;` 
  - `adb start-server;`
  - `adb devices`
  - `adb.exe logcat -v threadtime [device id] > C:\android-debug.log`

### Getting Enzyme to Work:

- You need these dependencies:
  "enzyme": "^3.8.0",
  "enzyme-adapter-react-16": "^1.7.1",
  "enzyme-to-json": "^3.3.5",
  "jest-expo": "^32.0.0",
  "react-dom": "^16.8.4"
  \*\*In particular you need react-dom

### Upgrading Expo SDK:

- Go through each upgrade guide for individual version upgrades until you get to the latest version:
  - [Expo SDK Versions List](https://docs.expo.io/workflow/upgrading-expo-sdk-walkthrough/)
  - [See this forum post](https://forums.expo.io/t/question-about-upgrading-expo-sdk-and-expokit/32631/2)
- #### Troublshooting:
  - invalid regular expression error: Change your node_modules/metro-config/src/defaults/blacklist.js entry to add `\`. This is a problem with latest node version. -
    ` var sharedBlacklist = [ /node_modules[\/\\]react[\/\\]dist[\/\\].*/, /website\/node_modules\/.*/, /heapCapture\/bundle\.js/, /.*\/__tests__\/.*/ ];`

### Troubleshooting

- Missing Google Maps SDK api key: follow steps at (https://docs.expo.io/versions/latest/sdk/map-view/#deploying-to-a-standalone-app-on-android)
  - #### NOTE: using App Signing by Google Play, you will need to grab their app signing certificate in production rather than the upload certificate returned by expo fetch:android:hashes. You can do this by grabbing the signature from Play Console -> Your App -> Release management -> App signing, and then going to the API Dashboard -> Credentials and adding the signature to your existing credential.
    - Use the App Signing Certificate SHA-1, not the upload certificate (remove `SHA-1:` at the beginning before pasting into API credentials in your Google Api Dashboard)
  - If using the expo hash command, add the keytool in `C:\Program Files\Java\jdk1.8.0_221\bin` to your system environment variables path in Windows 10 if you get missing keytool error when running `expo fetch:android:hashes`
    - NOTE: You may need to run this in a CMD prompt outside of bash

## Tips

### Z-INDEX
- On IOS `zIndex` can be used in styles, but on Android, you may need to use `elevation` (this may not be needed with the latest SDK)

### Keyboard Related Problems:
- KeyboardAvoidingView problems - see `MainScreen.js` for a working example.
- Keyboard squishes and rearranges elements 
  - in `app.json` change the keyboard layout mode to `"pan"`: 
  ```json
  "android": {
      "softwareKeyboardLayoutMode": "pan",
  ```
  - The Alternative is to apply `position: 'absolute'` (may need to add `width: '100%'`) to the container
