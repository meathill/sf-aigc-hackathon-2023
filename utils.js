var os = require("os");

function getMacAddress() {
  var networkInterfaces = os.networkInterfaces();
  var mac = "";
  for (var i in networkInterfaces) {
    for (var j in networkInterfaces[i]) {
      if (
        networkInterfaces[i][j]["family"] === "IPv4" &&
        networkInterfaces[i][j]["mac"] !== "00:00:00:00:00:00" &&
        networkInterfaces[i][j]["address"] !== "127.0.0.1"
      ) {
        mac = networkInterfaces[i][j]["mac"];
      }
    }
  }
  return mac || "";
}

const getSortParams = (params) => {
  return Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&")
    .replace("+", "%20")
    .replace("*", "%2A")
    .replace("%7E", "~")
    .replaceAll(":", "%3A");
};

/**
 * 获取文件base64编码
 * @param string  path 文件路径
 * @return string base64编码信息，不带文件头
 */
function getFileContentAsBase64(path) {
  const { readFile } = require("fs/promises");
  try {
    return readFile(path, { encoding: "base64" });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getMacAddress,
  getSortParams,
  getFileContentAsBase64,
};
