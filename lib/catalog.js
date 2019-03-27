const axios = require("axios");
require("dotenv").config();

axios.defaults.baseURL = process.env.BASE_URL;

/**
 * @param {string} client_id
 * @param {string} client_secret
 *
 * @see https://api.creativecommons.engineering/oauth2/register
 */
class Catalog {
  constructor(client_id, client_secret) {
    this.auth = client_id && client_secret ? true : false;
    let access_token;

    /**
     * Retrun access token from the API
     *
     * @param {String} client_id
     * @param {String} client_secret
     * @returns {Promise<string>} access_token promise
     * @private
     */
    this.getToken = async () => {
      if (!access_token && this.auth) {
        const res = await axios({
          method: "post",
          url: "/oauth2/token/",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
        });
        access_token = res.data.access_token;
      }
      return access_token;
    };
  }

  /**
   * Search for images
   *
   * @example
   * Catalog.imageSearch({q: "hello,world",pagesize: 2, li:['BY-NC-SA', 'BY']})
   *     .then(response => { handle response })
   *     .catch(error => { handle error });
   *
   *
   * @param {Object} - Search queries
   * @returns {Promise<object>} - response data promise
   * @see https://api.creativecommons.engineering/#operation/image_search
   * @public
   */
  async imageSearch(queries) {
    let axios_config = {
      method: "get",
      url: "/image/search",
      params: queries
    };
    const res = await this.makeRequest(axios_config);
    return res;
  }

  /**
   * Make a request with the provided configuration
   *
   * @param {Object} - Configurations for request
   * @returns {Promise<object>} - response promise
   * @public
   */
  async makeRequest(axios_config) {
    try {
      if (this.auth) {
        const token = await this.getToken();
        axios_config["headers"] = { Authorization: `Bearer ${token}` };
      }
      const res = await axios(axios_config);
      return res.data;
    } catch (err) {
      throw err.message;
    }
  }
}

module.exports = Catalog;
