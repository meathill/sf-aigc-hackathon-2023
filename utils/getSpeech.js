const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

async function getSpeech(text, spd, per, filePath) {
    const Data = querystring.stringify({
        'tex': text,
        'tok': '24.547429524ff49de1b2f9757bd9d5e68b.2592000.1680789290.282335-31051418',
        'cuid': '123612963921649182',
        'ctp': '1',
        'lan': 'zh',
        'spd': spd,
        'per': per
    });

    const options = {
        "method": "GET",
        "hostname": "tts.baidu.com",
        "path": "/text2audio?" + Data
    };


    const req = http.request(options, function (res) {
        //获取到的语音文件流存入到Buffer
        let chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            // fs模块写文件  
            fs.writeFileSync(filePath, body);
        });
    });
    req.end();
}

function initSpeech(filePath) {
    const body = Buffer.concat([]);
    fs.writeFileSync(filePath, body);
}

module.exports = { getSpeech, initSpeech }