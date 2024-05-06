const fetch = require('node-fetch');

function objectToUrlEncoded(obj) {
    return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
}

async function fetchData(baseUrl, queryParams, bodyObject, headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) {
    const queryString = objectToUrlEncoded(queryParams);
    const url = `${baseUrl}?${queryString}`;
    const body = objectToUrlEncoded(bodyObject);

    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        return await response.text();
    } catch (error) {
        console.error('Error:', error);
        throw error;  // 外部调用会处理异常
    }
}

function processData(rawData) {
    const lines = rawData.split('\n');
    const cleanData = lines[3]?.trim();
    const json = JSON.parse(cleanData);
    const data = json[0][2];
    return data;
}

const getExtComments = async (keyword, options = {}) => {
    const {
        limit = 10,
        lang = "all",
        sort = "recent"
    } = options;

    function sortValue(input) {
        switch(input) {
            case "helper":
                return 1;
            case "recent":
                return 2;
            case "low-rate-first":
                return 3;
            case "high-rate-first":
                return 4;
        }
    }

    const baseUrl = 'https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute';
    const queryParams = {
        'rpcids': 'x1DgCd',
        'bl': 'boq_chrome-webstore-consumerfe-ui_20240428.07_p0',
        'hl': 'zh-CN',
        'soc-app': '1',
        'soc-platform': '1',
        'soc-device': '1',
        'rt': 'c'
    };
    const bodyObject = {
        'f.req': `[[["x1DgCd","[\\"${keyword}\\",[${limit}],${sortValue(sort)},null,null,[\\"${lang}\\"]]",null,"generic"]]]`
    };

    try {
        const rawData = await fetchData(baseUrl, queryParams, bodyObject);
        const comments = processData(rawData);
        // const result = JSON.prase(comments);
        const parsedData = JSON.parse(comments);
        const usefulData = parsedData[1].map(entry => {
            return {
                userId: entry[0],
                name: entry[1][0],
                avatarUrl: entry[1][1],
                rating: entry[2],
                review: entry[3],
                version: entry[11]
            };
        });
        const num = usefulData.length;
        return { success: true, error: null, number: num, data: usefulData };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
};

module.exports = {
    getExtComments
};
