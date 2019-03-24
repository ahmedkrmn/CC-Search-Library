const catalog = require("./lib/client");
const config = require("./config");

const Catalog = new catalog(config.CLIENT_ID, config.CLIENT_SECRET);

(async () => {
  const res = await Catalog.imageSearch({
    key_words: "Warrior",
    page_size: 1
  });
  console.log(res);
})();
