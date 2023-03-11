const path = require("path");
const request = require("./request");
const { getSortParams, getFileContentAsBase64 } = require("./utils");
const { writeFile, stat } = require("fs/promises");
const {
  texToSpeechParams,
  speechToTexParams,
  API_KEY,
  SECRET_KEY,
  OUTPUT_FORMAT,
} = require("./config");

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
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
    const { data } = await request.getTokenAPI(sortParams);
    if (!data) {
      return console.log("result is empty");
    }
    const hasToken = Object.keys(data).includes("access_token");
    const hasScope = Object.keys(data).includes("scope");
    const existScope = data["scope"].split(" ").includes("audio_tts_post");
    if (hasToken && hasScope) {
      if (!existScope) {
        console.log("scope is not correct");
        return;
      }
      return data["access_token"];
    } else {
      console.log("接口异常");
    }
  } catch (err) {
    console.log("err :>> ", err);
  }
};

const texToSpeech = async (token) => {
  try {
    const tex = encodeURI(encodeURI(TEXT));

    const params = {
      tex,
      tok: token,
      lan: "zh",
      ctp: 1,
      ...texToSpeechParams,
    };

    const result = await request.texToSpeechAPI(params);
    const filePath = path.join(__dirname, `output.${OUTPUT_FORMAT}`);
    await writeFile(filePath, result.data, {
      encoding: "utf8",
    });
    console.log("写入成功");
  } catch (err) {
    console.log("err :>> ", err);
  }
};

const speechToTex = async (token) => {
  try {
    const target = "./output.pcm";
    const targetSuffix = target.split(".").pop(); //.txt
    const targetSize = (await stat(target)).size;
    const supportSpeechFormat = ["pcm", "wav", "amr", "m4a"];
    // 支持的格式
    if (!supportSpeechFormat.includes(targetSuffix)) {
      console.log(
        `语音格式不支持: ${targetSuffix},仅支持: ${supportSpeechFormat.join(
          ","
        )}`
      );
      return;
    }
    const params = {
      ...speechToTexParams,
      token,
      // 支持的格式: pcm/wav/amr/m4a
      format: targetSuffix,
      len: targetSize,
      speech: await getFileContentAsBase64(target),
    };
    const result = await request.speechToTexAPI(params);
    const transformResult = JSON.parse(result.data);
    console.log("result :>> ", transformResult);
    if (transformResult.err_no != 0) {
      console.log(
        `接口请求失败: ${transformResult.err_no}, ${transformResult.err_msg}`
      );
      return;
    }
    writeFile("./output.json", JSON.stringify(transformResult, null, "\t"))
      .then((res) => {
        console.log("文件写入成功");
      })
      .catch((err) => {
        console.log(`文件写入失败: ${err}`)
      });
  } catch (err) {
    if (err.errno === -2 && err.code === "ENOENT") {
      console.log(`${err.path}文件不存在`);
    }
  }
};

const TEXT = "我要结婚啦, 请恭喜我, 哈哈哈哈哈";

create_token().then((token) => {
  // 文字转语音
  texToSpeech(token);
  // 语音转文字
  // speechToTex(token);
});
