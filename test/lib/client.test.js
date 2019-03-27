/**
 * @jest-environment node
 */
const catalog = require("../../lib/catalog");
const mock = require("./mock_response");
const nock = require("nock");

const BASE_URL = "https://api.creativecommons.engineering";
const CLIENT_ID = "fakeIDk4620cUve3qyhoDP3Xs";
const CLIENT_SECRET = "fakeSECRET54wQeiRi2b7G5vTSC9Vsl4tzPCAUhueW0TG2Lbiw7";

describe("Catalog", () => {
  describe("#constructor", () => {
    describe("this.auth", () => {
      it("should authenticate if both client_id and client_secret are provided", () => {
        const Catalog = new catalog(CLIENT_ID, CLIENT_SECRET);
        expect(Catalog.auth).toBe(true);
      });

      it("should not authenticate if client_id and client_secret are missing", () => {
        const Catalog = new catalog();
        expect(Catalog.auth).toBe(false);
      });
    });

    describe("this.getToken()", () => {
      nock(BASE_URL, {
        reqheaders: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .post(
          "/oauth2/token/",
          `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
        )
        .reply(200, { access_token: "fakeTOKEN7G5vTSC9Vsl4tzPC" });
      it("should return access_token if authenticated", async () => {
        expect.assertions(1);
        const Catalog = new catalog(CLIENT_ID, CLIENT_SECRET);
        expect(await Catalog.getToken()).toEqual("fakeTOKEN7G5vTSC9Vsl4tzPC");
      });
      it("should return undefined if not authenticated", async () => {
        expect.assertions(1);
        const Catalog = new catalog();
        expect(await Catalog.getToken()).toBeUndefined();
      });
    });
  });

  describe("imageSearch()", () => {
    nock(BASE_URL)
      .get("/image/search")
      .query(true)
      .reply(200, mock);

    it("should return search results when queries are passed ", async () => {
      expect.assertions(1);
      const Catalog = new catalog();
      const res = await Catalog.imageSearch({
        q: "math,physics",
        pagesize: 5
      });
      expect(res.result_count).toBeTruthy();
    });

    nock(BASE_URL)
      .get("/image/search")
      .reply(400);

    it("should return an error with status code 400 if no search queries are passed", async () => {
      expect.assertions(1);
      const Catalog = new catalog();
      try {
        await Catalog.imageSearch();
      } catch (err) {
        expect(err).toBe("Request failed with status code 400");
      }
    });
  });
});

describe("makeRequest()", () => {});
