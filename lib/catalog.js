const fetch = require("node-fetch");
const url = require("url");

const BASE_URL = "https://api.creativecommons.engineering";

/**
 * @param {string} [client_id]
 * @param {string} [client_secret]
 *
 * @see https://api.creativecommons.engineering/oauth2/register
 */
class Catalog {
  constructor(client_id, client_secret) {
    if ((client_id && !client_secret) || (!client_id && client_secret))
      throw new Error(
        "You only passed one key, please pass both your client_id and client_secret"
      );
    this.auth = client_id && client_secret ? true : false;
    let access_token;
    /**
     * Retrun access token from the API
     *
     * @returns {Promise<string>} access_token promise
     * @private
     */
    this.getToken = async () => {
      // check if access_token is defined and this.auth is true
      if (!access_token && this.auth) {
        const res = await fetch(`${BASE_URL}/oauth2/token/`, {
          method: "post",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
        });
        const response_data = await res.json();
        access_token = response_data.access_token;
      }
      // returns undefined if this.auth is false and the user access_token otherwise
      return access_token;
    };
  }

  /**
   * Search for images by providing full search queries
   *
   * @example
   * Catalog.imageSearch({q: "hello,world",pagesize: 2, li:['BY-NC-SA', 'BY']})
   *     .then(response => { //handle response })
   *     .catch(error => { //handle error });
   *
   *
   * @param {Object} - Search queries
   * @returns {Promise<object>} - response data promise
   * @see https://api.creativecommons.engineering/#operation/image_search
   * @memberof Catalog
   */
  async imageSearch(queries) {
    let config = {
      method: "get",
      url: "/image/search",
      params: queries
    };
    return await this.makeRequest(config);
  }

  /**
   * Search for images by creator name
   *
   * @example
   * Catalog.imageSearchByCreator("James", {pagesize: 2})
   *     .then(response => { //handle response })
   *     .catch(error => { //handle error });
   *
   * @param {string} creator - Creator name
   * @param {object} [params] - Additional parameters for search
   * @returns {Promise<object>} - response data promise
   * @memberof Catalog
   */
  async imageSearchByCreator(creator, params = {}) {
    params.creator = creator;
    return this.imageSearch(params);
  }

  /**
   * Make a request with the provided configuration
   *
   * @param {Object} - Configurations for request
   * @returns {Promise<object>} - response promise
   * @private
   */
  async makeRequest(config) {
    try {
      if (this.auth) {
        const token = await this.getToken();
        config["headers"] = { Authorization: `Bearer ${token}` };
      }
      const requestURL =
        config.method === "get"
          ? BASE_URL +
            url.format({
              pathname: config.url,
              query: config.params
            })
          : BASE_URL + config.url;
      const res = await fetch(requestURL, {
        method: config.method,
        body: JSON.stringify(config.body),
        headers: config.headers
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json();
    } catch (err) {
      throw err.message;
    }
  }
}

module.exports = Catalog;
