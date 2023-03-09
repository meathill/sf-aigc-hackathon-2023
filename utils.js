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

module.exports = {
  getMacAddress,
  getSortParams
};
