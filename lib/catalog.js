const axios = require("axios");
const config = require("../config");

axios.defaults.baseURL = config.BASE_URL;

/**
 * @param {string} client_id
 * @param {string} client_secret
 *
 * @see https://api.creativecommons.engineering/oauth2/register
 */
class Catalog {
  constructor(client_id, client_secret) {
    this.auth = client_id && client_secret ? true : false;
    let access_token = null;
    this.getToken = () => {
      if (access_token === null) {
        access_token = logIn(client_id, client_secret);
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
  imageSearch(queries) {
    let axios_config = {
      method: "get",
      url: "/image/search",
      params: queries
    };
    return this.makeRequest(axios_config).then(res => res.data);
  }
  /**
   * Make a request with the provided configuration
   *
   * @param {Object} - Configurations for request
   * @returns {Promise<object>} - response promise
   * @public
   */
  makeRequest(axios_config) {
    if (this.auth) {
      return this.getToken()
        .then(token => {
          axios_config["headers"] = { Authorization: `Bearer ${token}` };
          return axios(axios_config);
        })
        .then(res => res);
    } else {
      return axios(axios_config).then(res => res);
    }
  }
}

/**
 * Retrun access token from the API
 *
 * @param {String} client_id
 * @param {String} client_secret
 * @returns {Promise<string>} access_token promise
 * @private
 */
function logIn(client_id, client_secret) {
  return axios({
    method: "post",
    url: "/oauth2/token/",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
  }).then(res => res.data.access_token);
}

module.exports = Catalog;
