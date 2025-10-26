const https = require("https");

getAgeofEmpires = async () => {
    console.log('1');
    await fetchAgeofEmpires();
    console.log('expansion',expansion);
    console.log('2');
}

fetchAgeofEmpires = () => {
    return new Promise(resolve => {
        const url = "https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations";
        let data;
    
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                data = body;
                data.civilizations.forEach(civil => {
                    if (civil.name === 'Aztecs') {
                        expansion = civil.expansion;
                        resolve(true);
                    }
                });
            });
        });
    })
}

getAgeofEmpires();