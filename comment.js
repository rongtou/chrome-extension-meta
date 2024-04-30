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

const getComment = async (keyword, size) => {
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
        'f.req': `[[["x1DgCd","[\\"${keyword}\\",[${size}],2,null,null,[\\"en\\"]]",null,"generic"]]]`
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
        return { success: true, error: null, data: usefulData };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
};

module.exports = {
    getComment
};
