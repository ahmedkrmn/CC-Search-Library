const catalog = require("../../lib/catalog");
const config = require("../../config");

jest.setTimeout(10000);

it("should return no more than 10 images when page size is 10", async () => {
  const Catalog = new catalog(config.CLIENT_ID, config.CLIENT_SECRET);
  expect.assertions(1);
  const res = await Catalog.imageSearch({ q: "test", pagesize: 10 });
  expect(res.results.length).toBeLessThan(11);
});

it("should authorize when CLIENT_ID and CLIENT_SECRET are passed", async () => {
  const Catalog = new catalog(config.CLIENT_ID, config.CLIENT_SECRET);
  expect.assertions(1);
  const res = await Catalog.makeRequest({
    method: "get",
    url: "/image/search",
    params: {
      q: "test"
    }
  });
  expect(res.config.headers.Authorization).toBeDefined();
});
