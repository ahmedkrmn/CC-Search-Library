const axios = require("axios");
const config = require("../config");

axios.defaults.baseURL = config.BASE_URL;


class Client {
  constructor(client_id, client_secret) {
    if (!client_id || !client_secret) {
      throw new Error(
        "Please pass your client_id and client_secret to the Client constructor!"
      );
    }

    let access_token = null;

    this.getToken = () => {
      if (access_token === null) {
        access_token = logIn(client_id, client_secret);
      }
      return access_token;
    };
  }
  imageSearch(ops) {
    let axios_config = {
      method: "get",
      url: "/image/search",
      params: {
        q: ops.key_words,
        li: ops.licenses,
        lt: ops.li_types,
        page: ops.page,
        pagesize: ops.page_size,
        creator: ops.creator,
        tags: ops.tags,
        title: ops.title,
        filter_dead: ops.filter_dead,
        provider: ops.provider
      }
    };
    return this.getToken()
      .then(token => {
        axios_config["headers"] = { Authorization: `Bearer ${token}` };
        return axios(axios_config);
      })
      .then(res => res.data);
  }
}

function logIn(client_id, client_secret) {
  return axios({
    method: "post",
    url: "/oauth2/token/",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
  }).then(res => res.data.access_token);
}

module.exports = Client;
