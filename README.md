## Setup

<br>

1. Generate `API_KEY` for the backend service, all incoming request should have this key or else server will reject the request and will respond back with `401 HTTP STATUS`.

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

   ### VS Code Terminal

   ```
   REACT_APP_API_KEY='232c4ce8-b0f9-4b85-94a0-d56bac7ac18d'
   ```

3. To start the server run

```
npm start
```
