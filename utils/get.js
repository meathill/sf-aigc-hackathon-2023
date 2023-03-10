const request = require('request')
//以下代码是开发中的辅助代码，用来获取token
async function main() {
    var options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/oauth/2.0/token?client_id=Em0dn3Kn8rdnoEjdcoAOpLIK&client_secret=7vqnPM5o2MHF0jizZjYZpRgzIvMCEFvc&grant_type=client_credentials',
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

main();