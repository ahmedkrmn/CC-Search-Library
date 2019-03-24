const catalog = require("./lib/catalog");
const config = require("./config");

const Catalog = new catalog(config.CLIENT_ID, config.CLIENT_SECRET);

Catalog.imageSearch({ q: "Sun,Beach", pagesize: 12, li: ["BY-NC-SA", "BY"] })
  .then(res => console.log(res))
  .catch(err => console.log(err));
