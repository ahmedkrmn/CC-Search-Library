# CC Search JavaScript Library

JavaScript API client library for obtaining search data from the CC Catalog API.

You can check the [API Page](https://api.creativecommons.engineering/) for detailed response data format.

## Setup
To start using this library, you need a `client_id` and a `client_secret`. You can register [here](https://api.creativecommons.engineering/oauth2/register) and recieve your credentials.

1. Install [Node.js](https://nodejs.org/en/)

2. Clone Repo or download as [zip](https://github.com/ahmedkrmn/CC-Search-Library/archive/master.zip).

3. `cd` into the project directory and Install required packages:

   ```bash
   npm install
   ```

4. Edit the `config.js` file in the root directory to add your `client_id` and `client_secret`.

5. Import the library and the `config` file in your JavaScript file.

   ```javascript
    const catalog = require("./lib/catalog");
    const config = require("./config");
   ```

## Example Usage

```javascript
const catalog = require("./lib/catalog");
const config = require("./config");

const Catalog = new catalog(config.CLIENT_ID, config.CLIENT_SECRET);

Catalog.imageSearch({ q: "Sun,Beach", pagesize: 12, li: ["BY-NC-SA", "BY"] })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

*Note that providing a `client_id` and `client_secret` is optional. You can construct the `Catalog` class without passing any parameters, but authorized clients have a higher rate limit of requests. Additionally, Creative Commons can give your key an even higher limit that fits your application's needs.*

More usage examples [here](https://github.com/ahmedkrmn/CC-Search-Library/blob/master/example.js).

## Testing
[Jest](https://jestjs.io/) framework is used for testing. New tests can be add [here](https://github.com/ahmedkrmn/CC-Search-Library/tree/master/test/lib) and ran using:

 ```bash
npm run test
 ```

## Library Docs

Usage documentation for the library is available [here](https://ahmedkrmn.github.io/CC-Search-Library/).

