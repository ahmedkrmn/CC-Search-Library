const client = require("../../lib/client");
const config = require("../../config");

const Client = new client(config.CLIENT_ID, config.CLIENT_SECRET);

it("should return no more than 10 images when page size is 10", async () => {
  expect.assertions(1);
  const res = await Client.imageSearch({ key_words: "Warrior", page_size: 10 });
  expect(res.results.length).toBeLessThan(11);
});
