const fs = require("fs");
const Nls = require("alibabacloud-nls");

const URL = "wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1";
const APPKEY = "4lP9qwrK34u5kHHQ"; //获取Appkey请前往控制台：https://nls-portal.console.aliyun.com/applist
const TOKEN = "dcba785f862a4b7b89478c2cba335742"; //获取Token具体操作，请参见：https://help.aliyun.com/document_detail/450514.html

async function textToSpeech(text, outputFilePath) {
  console.log(`speak: ${text}`);

  let dumpFile = fs.createWriteStream(outputFilePath, { flags: "w" });
  let tts = new Nls.SpeechSynthesizer({
    url: URL,
    appkey: APPKEY,
    token: TOKEN,
    voice: "xiaogang",
    speech_rate: -500,
  });

  tts.on("meta", (msg) => {
    console.log("Client recv metainfo:", msg);
  });

  // 拿到数据
  tts.on("data", (msg) => {
    // console.log(`recv size: ${msg.length}`)
    dumpFile.write(msg, "binary");
  });

  tts.on("completed", (msg) => {
    console.log("Client recv completed:", msg);
    dumpFile.end();
  });

  tts.on("closed", () => {
    console.log("Client recv closed");
  });

  tts.on("failed", (msg) => {
    console.log("Client recv failed:", msg);
  });

  let param = tts.defaultStartParams();
  param.text = text;
  param.voice = "aixia";
  try {
    await tts.start(param, true, 6000);
  } catch (error) {
    console.log("error on start:", error);
    return;
  }
  console.log("synthesis done");
}

textToSpeech("你好, 有什么可以帮助你的吗", `demo_${process.pid}.wav`);
