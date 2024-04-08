const fetch = require('node-fetch');

// 通用函数：对象转 URL 编码字符串
function objectToUrlEncoded(obj) {
    return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
}

// 通用函数：异步获取数据
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

// 数据处理函数
function processData(rawData) {
    const lines = rawData.split('\n');
    const cleanData = lines[3]?.trim();
    const json = JSON.parse(cleanData);
    const data = json[0][2];
    return data;
}

// 解析数据
function parseFields(block, patterns) {
    const entries = block.replace(/, /g, ' ').
        replace(/\[\[/g, '[').replace(/\]\]/g, ']').split('],[');
    return entries.map(entry => {
        const fields = entry.split(',').map(field => field.replace(/^["[]+|["\]]+$/g, '').trim());

        let result = {};
        let lastIndex = -1;
        patterns.forEach(pattern => {
            for (let i = lastIndex + 1; i < fields.length; i++) {
                if (pattern.regex.test(fields[i])) {
                    result[pattern.name] = fields[i];
                    lastIndex = i;
                    break; // 停止当前循环，因为已经找到匹配项
                }
            }
        });
        // 过滤 unkown 字段
        delete result.unknow;

        return result;
    }).filter(result => Object.keys(result).length);
}
// 高级搜索
async function quickSearch(keyword) {
    const baseUrl = 'https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute';
    const queryParams = {
        'rpcids': 'QcU9bc',
        'source-path': '/',
        'bl': 'boq_chrome-webstore-consumerfe-ui_20240306.00_p1',
        'hl': 'en-GB',
        'soc-app': '1',
        'soc-platform': '1',
        'soc-device': '1',
        'rt': 'c'
    };
    const bodyObject = {
        'f.req': `[[["QcU9bc","[\\"${keyword}\\",null,null,2]"]]]`
    };

    try {
        const rawData = await fetchData(baseUrl, queryParams, bodyObject);
        const dataBlocks = processData(rawData);
        const patterns = [
            { name: 'name', regex: /.+?/ },
            { name: 'id', regex: /.+?/ },
            { name: 'version', regex: /\d+(?:\.\d+)?/ },
            { name: 'iconURL', regex: /https?:\/\/[^\s"]+/ }
        ];

        const results = parseFields(dataBlocks, patterns);
        return { success: true, error: null, number: results.length, data: results };
    } catch (error) {
        console.error('Error in quickSearch:', error);
        return { success: false, error: `Error searching keyword ${keyword}: ${error.message}`, data: null };
    }
}

// 完整搜索
async function fullSearch(keyword, options = {}) {
    const {
        limit = 10,
        minRating = 0,
        ifFeatured = false,
        ifWellKnown = false
    } = options;

    const baseUrl = 'https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute';
    const queryParams = {
        'rpcids': 'zTyKYc',
        'source-path': '/search/%E8%B1%86%E7%93%A3',
        'bl': 'boq_chrome-webstore-consumerfe-ui_20240306.00_p1',
        'hl': 'en-GB',
        'soc-app': '1',
        'soc-platform': '1',
        'soc-device': '1',
        'rt': 'c'
    };

    const validMinRating = Math.max(0, Math.min(minRating, 5));
    const minRatingFilter = validMinRating === 0 ? "null" : validMinRating.toString();
    const featuredFilter = ifFeatured ? "1" : "null";
    const wellKnownFilter = ifWellKnown ? "1" : "null";

    const bodyObject = {
        'f.req': `[[["zTyKYc","[[null,[null,null,null,[\\"${keyword}\\",[${limit}],${minRatingFilter},null,${featuredFilter},${wellKnownFilter},1]]]]",null,"1"]]]`
    };
    console.log('bodyObject', bodyObject)

    try {
        const rawData = await fetchData(baseUrl, queryParams, bodyObject);
        // console.log('rawData', rawData)
        const dataBlocks = processData(rawData);
        console.log('dataBlocks', dataBlocks)
        const patterns = [
            { name: 'id', regex: /^[a-z0-9]{32}$/ },
            { name: 'iconURL', regex: /^https:\/\/lh3\.googleusercontent\.com\// },
            { name: 'title', regex: /.+/ },
            // 修改，rating 和 reviewCount 可能为 null
            { name: 'rating', regex: /^\d+(\.\d+)?$|null/ },
            { name: 'reviewCount', regex: /^\d+$|null/ },
            { name: 'coverURL', regex: /^https:\/\/lh3\.googleusercontent\.com\// },
            // 允许空字符串
            { name: 'description', regex: /[^\s]+/ },
            { name: 'publish', regex: /.+/ },
            // true or null
            { name: 'ifEstablish', regex: /true|null/ },
            { name: 'ifFeatured', regex: /true|null/ },
            // 必须包含 / 例如 productivity/tools 
            { name: 'category', regex: /.+\/.+/ },
            { name: 'categoryNo', regex: /^\d+$/ },
            { name: 'unknow', regex: /^\d+$/ },
            { name: 'userCount', regex: /^\d+$/ },

        ];
        const results = parseFields(dataBlocks, patterns);
        return { success: true, error: null, number: results.length, data: results };
    } catch (error) {
        console.error('Error in fullSearch:', error);
        return { success: false, error: `Error searching keyword ${keyword}: ${error.message}`, data: null };
    }
}

// 模块导出
module.exports = { quickSearch, fullSearch };
