# youtube-chatApp-auth

Video code, create authentication with Firebase in expo React Native.

## Video Link

https://www.youtube.com/@vanderotis

## Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/vanotis720/youtube-chatApp-auth
```

```bash
cd chatApp
```

```bash
npm install
```

## Usage

```bash
expo start
```

## Note

Remember to create a firebaseConfig.js file and add your Firebase credentials as I explained in the video.

Sample Content of firebaseConfig.js:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "appName.firebaseapp.com",
  projectId: "appName-id",
  storageBucket: "appName.firebasestorage.app",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
```

## Support

If you found this video helpful, consider buying me a coffee!

<a href="https://www.buymeacoffee.com/vanderotis" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

If you prefer, you can also support me via PayPal.

[![PayPal](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://paypal.me/vancodes)
