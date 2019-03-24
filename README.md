# CC Search JavaScript Library

JavaScript API client library for obtaining search data from the CC Catalog API.

You can check the [API Page](https://api.creativecommons.engineering/) for detailed response data format.

## Example Usage

To start using this library, you need a `client_id` and a `client_secret`. You can register [here](https://api.creativecommons.engineering/oauth2/register) and recieve your credentials.

```javascript
const Catalog = new catalog(client_id, client_secret);

Catalog.imageSearch({ q: "Sun,Beach", pagesize: 12, li: ["BY-NC-SA", "BY"] })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

*Note that providing a `client_id` and `client_secret` is optional. You can construct the `Catalog` class without passing any parameters, but authorized clients have a higher rate limit of requests. Additionally, Creative Commons can give your key an even higher limit that fits your application's needs.*

## Library Docs

Usage documentation for the library is available [here]()
