# reFurb

## Setup

<br>

1. Generate `API_KEY` for the frontend service, _the same key should be used for backend service._ All outgoing requests should have this key or else server will reject the request and will respond back with `401 HTTP STATUS`.

   ```
   $ npm install uuid
   $ node
   Welcome to Node.js v14.17.6.
   > const { v4: uuidv4 } = require("uuid");
   > uuidv4()
   '232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'

   ```

2. Export the `API_KEY` to the `ENVIRONMENT`

   ### Windows (Powershell)

   ```
   $Env:REACT_APP_API_KEY='232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'
   ```

   ### Linux/Unix/Macos

   ```
   REACT_APP_API_KEY='232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'
   ```

3. Export the firebase config to the `ENVIRONMENT`

   #### Windows (Powershell)

   ```
   $Env:REACT_APP_FIREBASE_CONFIG='{"apiKey":"xxxxxxx","authDomain":"refurb-f5219.firebaseapp.com","projectId":"refurb-f5219","storageBucket":"refurb-f5219.appspot.com","messagingSenderId":"11111111111","appId":"1:11111111:web:7aeb850c411227264ade27","measurementId":"G-9T2KQVCJKN"}'
   ```

   ####

   ```
   REACT_APP_FIREBASE_CONFIG='{"apiKey":"xxxxxxx","authDomain":"refurb-f5219.firebaseapp.com","projectId":"refurb-f5219","storageBucket":"refurb-f5219.appspot.com","messagingSenderId":"11111111111","appId":"1:11111111:web:7aeb850c411227264ade27","measurementId":"G-9T2KQVCJKN"}'
   ```

4. Export stripe key and backend service host to the `ENVIRONMENT`

   #### Windows (Powershell)

   ```
   $Env:REACT_APP_STRIPE_PUBLIC_KEY='pk_test_51KiJnwL9LLEQmnBTpVAHuu05zwxSzUapKQHa5TRf9LygTqkT38DVVIM2F2ViqUFKIBDDQBAo2Hm0ry3399gVGwHb006yaAFJLl'
   $Env:REACT_APP_API_URL='http://<backend_host>:<port>'
   ```

   ####

   ```
   REACT_APP_STRIPE_PUBLIC_KEY='pk_test_51KiJnwL9LLEQmnBTpVAHuu05zwxSzUapKQHa5TRf9LygTqkT38DVVIM2F2ViqUFKIBDDQBAo2Hm0ry3399gVGwHb006yaAFJLl'
   REACT_APP_API_URL='http://<backend_host>:<port>'
   ```

5. To start the server run

   ```
   npm start
   ```

### Features

1.  User Sign in

2.  User Sign Up with email verification

3.  Product search

4.  Add to cart

5.  Remove from cart

6.  Payment

7.  Order history

8.  Deployed on [Heroku](https://refurb-frontend.herokuapp.com/)
