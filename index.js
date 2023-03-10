const express = require("express");
const { getSpeech, initSpeech } = require("./utils/getSpeech");
const app = express();
const fs = require('fs');
const path = require('path');


//通过获取到参数：文字和语速spd，声色per来获得一个mp3的语音文件，并且返回给前端
app.get('/getSpeech', async (req, res) => {

    //per 度小宇=1，度小美=0，度逍遥（基础）=3，度丫丫=4
    //spd 语速，取值0-15，默认为5中语速
    //vol 音量，取值0-15，默认为5中音量（取值为0时为音量最小值，并非为无声）
    const { text = '你好啊', spd = '3', per = '1' } = req.query

    //生成的mp3文件存储的路径
    const filePath = path.normalize('./mp3/speech.mp3');
    getSpeech(text, spd, per, filePath)
    if (fs.existsSync(filePath)) {
        res.sendFile(path.resolve(filePath))
    } else {
        res.send("once again")
    }
});



app.listen(7001, () => console.log('listening on port 7001!'))
