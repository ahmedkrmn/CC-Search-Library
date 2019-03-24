const client = require("./lib/client");
const config = require("./config");

const Client = new client(config.CLIENT_ID, config.CLIENT_SECRET);

(async () => {
  const res = await Client.imageSearch({
    key_words: "Warrior"
  });
  console.log(res);
})();
