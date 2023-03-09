const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { getSortParams } = require("./utils");


// 设置语音转换所需参数
const {
  params,
  getTokenParams,
  API_KEY,
  SECRET_KEY,
  CONTENT_TYPE_FORMATS,
  OUTPUT_FORMAT,
} = require("./config");



const OUTPUT_CONTENT_FORMAT = CONTENT_TYPE_FORMATS[OUTPUT_FORMAT];

// 判断是否有权限
const hasPermission = (result) => {
  result = result || {};

  const hasToken = Object.keys(result).includes("access_token");

  const hasScope = Object.keys(result).includes("scope");

  const existScope = result["scope"].split(" ").includes(getTokenParams.SCOPE);
  if (hasToken && hasScope) {
    if (!existScope) {
      console.log("scope is not correct");
      return;
    }
    return result["access_token"];
  } else {
    console.log("接口异常");
  }
};

const request = {
  getToken: (params) => {
    return axios({
      url: getTokenParams.TOKEN_URL + `?${params}`,
      method: "get",
    });
  },

  queryTexToSpeech: (params1) => {
    return axios({
      url: params.TTS_URL + `?${getSortParams(params1)}`,
      method: "get",
      headers: {
        "Content-Type": OUTPUT_CONTENT_FORMAT,
      },
      responseType: "arraybuffer",
    });
  },
};

const create_token = async () => {
  console.log("fetch token begin");

  const params = {
    grant_type: "client_credentials",
    client_id: API_KEY,
    client_secret: SECRET_KEY,
  };

  let sortParams = getSortParams(params);
  sortParams = encodeURI(sortParams);
  try {
    const result = await request.getToken(sortParams);
    return hasPermission(result.data) || "";
  } catch (err) {}
};

const texToSpeech = async (token) => {
  const tex = encodeURI(encodeURI(TEXT));

  const { PER, SPD, PIT, VOL, AUE, CUID } = params;

  const params1 = {
    tok: token,
    tex: tex,
    per: PER,
    spd: SPD,
    pit: PIT,
    vol: VOL,
    aue: AUE,
    cuid: CUID,
    lan: "zh",
    ctp: 1,
  };

  try {
    const result = await request.queryTexToSpeech(params1);

    const filePath = path.join(__dirname, `result.${OUTPUT_FORMAT}`);
    fs.writeFileSync(filePath, result.data, {
      encoding: "utf8",
    });
  } catch (err) {
    console.log("err :>> ", err);
  }
};

const initAllParams = async () => {
  const token = await create_token();

  const result = await texToSpeech(token);
};


const TEXT = "设置语音转换所需参数";

initAllParams();
