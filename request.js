const axios = require("axios");
const { OUTPUT_CONTENT_FORMAT } = require("./config");
const { getSortParams } = require("./utils");

const apis = {
  speechToTexUrl: "https://vop.baidu.com/server_api",
  tokenUrl: "http://aip.baidubce.com/oauth/2.0/token",
  texToSpeechUrl: "http://tsn.baidu.com/text2audio",
};

const request = {
  speechToTexAPI: (params) => {
    return axios({
      url: apis.speechToTexUrl,
      method: "post",
      headers: {
        "Content-Type": "application/json;",
      },
      responseType: "application/json",
      data: params,
    });
  },
  getTokenAPI: (params) => {
    return axios({
      url: apis.tokenUrl + `?${params}`,
      method: "get",
    });
  },
  texToSpeechAPI: (speechParams) => {
    return axios({
      url: apis.texToSpeechUrl + `?${getSortParams(speechParams)}`,
      method: "get",
      headers: {
        "Content-Type": OUTPUT_CONTENT_FORMAT,
      },
      responseType: "arraybuffer",
    });
  },
};

module.exports = request;
