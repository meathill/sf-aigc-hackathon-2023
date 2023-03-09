const { getMacAddress } = require("./utils");

const params = {
  // # 发音人选择, 基础音库：0为度小美，1为度小宇，3为度逍遥，4为度丫丫，
  // # 精品音库：5为度小娇，103为度米朵，106为度博文，110为度小童，111为度小萌，默认为度小美
  PER: 106,
  // # 语速，取值0-15，默认为5中语速
  SPD: 5,
  // # 音调，取值0-15，默认为5中语调
  PIT: 10,
  // # 音量，取值0-9，默认为5中音量
  VOL: 9,
  // # 下载的文件格式, 3：mp3(default) 4： pcm-16k 5： pcm-8k 6. wav
  AUE: 3,

  // CUID
  CUID: getMacAddress(),

  // 语音转换请求地址
  TTS_URL: "http://tsn.baidu.com/text2audio",
};

const getTokenParams = {
  TOKEN_URL: "http://aip.baidubce.com/oauth/2.0/token",
  SCOPE: "audio_tts_post",
};

// 百度语音识别所需参数
const baiduConfig = {
  API_KEY: process.env.AK,
  SECRET_KEY: process.env.SK,
};

// content-type
const FORMATS = {
  3: "mp3",
  4: "pcm",
  6: "wav",
};

const OUTPUT_FORMAT = FORMATS[params.AUE] || FORMATS[3];

const CONTENT_TYPE_FORMATS = {
  mp3: "audio/mp3",
  pcm: "audio/basic;codec=pcm;rate=16000;channel=1",
  wav: "audio/wav",
};

module.exports = {
  params,
  getTokenParams,
  ...baiduConfig,
  OUTPUT_FORMAT,
  CONTENT_TYPE_FORMATS,
};
