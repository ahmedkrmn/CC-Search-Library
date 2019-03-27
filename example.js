const catalog = require("./lib/catalog");
require("dotenv").config();

const Catalog = new catalog(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

Catalog.imageSearch({ q: "sun,beach", pagesize: 4 })
  .then(res => console.log(res))
  .catch(err => console.log(err));
