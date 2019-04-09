# CC Search JavaScript Library

JavaScript API client library for obtaining search data from the CC Catalog API.

You can check the official [API Page](https://api.creativecommons.engineering/) for detailed response data format.

## Setup

To start using this library, you need a `client_id` and a `client_secret`. You can register [here](https://api.creativecommons.engineering/oauth2/register) and recieve your credentials. (*A new function will be added later to the library to facilitate the registration process.*)

1. Install [Node.js](https://nodejs.org/en/)

2. Clone Repo or download as [zip](https://github.com/ahmedkrmn/CC-Search-Library/archive/master.zip).

3. `cd` into the project directory and Install required packages:

   ```bash
   npm install
   ```

4. Import the library in your JavaScript file.

   ```javascript
   const catalog = require("./lib/catalog");
   ```

**Or, you can just use the bundled version in the `dist` directory and import it in your HTML within a `<script>` tag.**

## Example Usage

```javascript
const catalog = require("./lib/catalog");

const Catalog = new catalog(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

Catalog.imageSearch({ q: "Sun,Beach", pagesize: 12, li: ["BY-NC-SA", "BY"] })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

- _Make sure you add your `client_id` and `client_secret` to the environment variables._
- _Note that this step is optional. You can construct the `Catalog` class without passing any parameters, but authorized clients have a higher rate limit of requests. Additionally, Creative Commons can give your key an even higher limit that fits your application's needs._

More usage examples [here](https://github.com/ahmedkrmn/CC-Search-Library/blob/master/example.js).

## Testing

This library uses [Jest](https://jestjs.io/) testing framework for unit tests. New tests can be added [here](https://github.com/ahmedkrmn/CC-Search-Library/blob/master/test/lib/client.test.js) and ran using:

```bash
npm run test
```

## Library Docs

Documentation is generated using [JSDocs](<http://usejsdoc.org/>) and rendered using the [docdash](<https://github.com/clenemt/docdash>) theme.
The full documentation for the library is available [here](https://ahmedkrmn.github.io/CC-Search-Library/).