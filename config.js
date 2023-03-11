const { getMacAddress } = require("./utils");

const texToSpeechParams = {
  // # 发音人选择, 基础音库：0为度小美，1为度小宇，3为度逍遥，4为度丫丫，
  // # 精品音库：5为度小娇，103为度米朵，106为度博文，110为度小童，111为度小萌，默认为度小美
  per: 106,
  // # 语速，取值0-15，默认为5中语速
  spd: 5,
  // # 音调，取值0-15，默认为5中语调
  pit: 10,
  // # 音量，取值0-9，默认为5中音量
  vol: 9,
  // # 下载的文件格式, 3：mp3(default) 4： pcm-16k 5： pcm-8k 6. wav
  aue: 3,
  // CUID
  cuid: getMacAddress(),
};

const speechToTexParams = {
  dev_pid: 1537,
  rate: 16000,
  channel: 1,
  cuid: getMacAddress(),
};

// 百度语音识别所需参数
const BAIDU_CONFIG = {
  API_KEY: process.env.AK,
  SECRET_KEY: process.env.SK,
};

// content-type
const FORMATS = {
  3: "mp3",
  4: "pcm",
  6: "wav",
};

const OUTPUT_FORMAT = FORMATS[texToSpeechParams.aue] || FORMATS[3];

const CONTENT_TYPE_FORMATS = {
  mp3: "audio/mp3",
  pcm: "audio/basic;codec=pcm;rate=16000;channel=1",
  wav: "audio/wav",
};

const OUTPUT_CONTENT_FORMAT = CONTENT_TYPE_FORMATS[OUTPUT_FORMAT];

module.exports = {
  texToSpeechParams,
  speechToTexParams,
  ...BAIDU_CONFIG,
  OUTPUT_FORMAT,
  CONTENT_TYPE_FORMATS,
  OUTPUT_CONTENT_FORMAT,
};
