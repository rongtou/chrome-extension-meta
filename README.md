# **chrome-extension-meta** 🌐

<samp>
    
 👉 Explore [demo api](https://chrome-store.zeabur.app/reference) here. 
 
 🫰 Auth token: 0081jCQMz5
 
</samp>

## Introduction 📜

`chrome-extension-meta` is a Node.js library designed to fetch essential details about extensions available on the Chrome Web Store. It offers programmatic access to various extension details such as name, approximate install count, user ratings, and more.

## Key Features 🗝️

- **QuickSearch and FullSearch:** Quickly find extensions with partial data or perform comprehensive searches with detailed results.
- **Get Extension Details:** Retrieve detailed information about a specific extension by its ID.
- **Get Comments:** Retrieve comments for a specific extension by its ID.
- **Efficient Retrieval:** Retrieve extension details using a single ID, an array of IDs, or through quick and full search functionalities.
- **JSON-Formatted Response:** The API returns information in a well-structured JSON format for easy data processing.
- **Asynchronous Support:** Supports asynchronous operations using `async/await` for a smooth development flow.

## Installation 💿

To integrate `chrome-extension-meta` into your project, run the following command in your terminal:

```bash
npm install chrome-extension-meta
```

## Usage 📊

### Import the Module

Initialize the library in your JavaScript file.

```javascript
const chromeStoreApi = require('chrome-extension-meta');
```

### Fetching Details

Retrieve information for a single extension by its ID.

```javascript
async function getExtensionDetails(extensionID) {
    try {
        const data = await chromeStoreApi.getExtensionDetails(extensionID);
        if (data.success) {
            console.log(data); // Log the extension details
        } else {
            console.error(data.error); // Handle errors
        }
    } catch (error) {
        console.error(error); // Handle exceptions
    }
}

// Example usage:
getExtensionDetails('gkkmiofalnjagdcjheckamobghglpdpm');
```

### Fetching for Multiple IDs

Retrieve details for multiple extensions by passing an array of IDs.

```javascript
async function getMultipleExtensionsDetails(extensionIDs) {
    try {
        const data = await chromeStoreApi.extMeta(extensionIDs);
        console.log(data); // Log details for each extension ID
    } catch (error) {
        console.error(error); // Handle exceptions
    }
}

// Example usage:
getMultipleExtensionsDetails(['gkkmiofalnjagdcjheckamobghglpdpm', 'cfidkbgamfhdgmedldkagjopnbobdmdn']);
```

### QuickSearch

Quickly search for extensions using a query.

```javascript
async function quickSearch(query) {
    try {
        const results = await chromeStoreApi.quickSearch(query);
        console.log(results); // Log the search results
    } catch (error) {
        console.error(error);
    }
}

// Example usage:
quickSearch('youtube');

//Example Reponse
{
  success: true,
  error: null,
  number: 10,
  data: [
    {
      name: 'Adblock for Youtube™',
      id: 'cmedhionkhpnakcndndgjdbohmhepckk',
      version: '1',
      iconURL: 'https://lh3.googleusercontent.com/bMu6IzWn8zG4yCpDcUrrTHA8bh5pVuAW706__3d2e6Lw_XwpqY3qxn_BfqUS3aaCTisvqFQIN1C9ac4Dm6s0Fz-vOg'
    },
    {
      name: 'Magic Actions for YouTube™',
      id: 'abjcfabbhafbcdfjoecdgepllmpfceif',
      version: '1',
      iconURL: 'https://lh3.googleusercontent.com/RZIl-KcDWp_GzAotuO4KZkfrDYMFyQm3yAT6v5k-BRshCIcegVon164qNmfS9DWWoX0nCBgg3_B_srbtQdxJzT_4PA'
    },
    {
      name: 'Return YouTube Dislike',
      id: 'gebbhagfogifgggkldgodflihgfeippi',
      version: '1',
      iconURL: 'https://lh3.googleusercontent.com/X0-M21C_VbWyXYuUjN55oyMDvOukjbzAxbs_WrUjwzsebWbyjFCIEchOtczI0DBvbyL9MUpuEWnghm19gF6dp8Vriw'
    },
    //..
  ]}
```

### FullSearch

Perform a comprehensive search to get detailed information about extensions.
```js
async function fullSearch(query, count) {
    try {
        const results = await chromeStoreApi.fullSearch(query, {
          limit:count
        });
        console.log(results); // Log the detailed search results
    } catch (error) {
        console.error(error);
    }
}

// Example usage:
fullSearch('tiktok', 10);


// Example Response
{
  success: true,
  error: null,
  number: 11,
  data: [
    [
  {
    id: 'ofpnmcalabcbjgholdjcjblkibolbppb',
    iconURL: 'https://lh3.googleusercontent.com/rLhEeo6TgST5H4WmCNWKO4fDJDvZVGfoXJNt035pGtnamBRJenmcXhqiI3RvZbRM71LWlQkTL6B825XzbAwAx52c9Q',
    title: 'Monica - Your AI Copilot powered by ChatGPT4',
    rating: '4.901862789641072',
    reviewCount: '15407',
    coverURL: 'https://lh3.googleusercontent.com/qlN70mLwKZnfWS8U51LGosEj1fOaF3gt_q5PDfN2HalyTpO2Dxh997y4CoZWE1N7oW3ISP9Y0ZxyUlrrTxJmHLaFbQ',
    description: 'Your AI Copilot powered by GPT-4. Answers complex questions. Writes emails reads articles searches smartly. Usable everywhere.',
    publish: 'monica.im',
    ifEstablish: 'true',
    ifFeatured: 'true',
    category: 'productivity/tools',
    categoryNo: '5',
    userCount: '2000000'
  },
  {
    id: 'pmbmfhhbllfiifceolpogjoagoiollkc',
    iconURL: 'https://lh3.googleusercontent.com/HdWI7e2ftmvKA6tmnW7Cyhlq3pkA_hrjWih2I7kBAWbbEIhoVTYsn-hAO1AJNFvVY2wH0KOZb4ZVLUv8PtmDtXV-wQ',
    title: 'Monica Search - New Tab for AI Search',
    rating: '3.9047619047619047',
    reviewCount: '21',
    coverURL: 'https://lh3.googleusercontent.com/MtbY2KnnR_3RJi6y5-VHVST_ht4B9GnQQpWbvVdWEdIVFCcOyMj1ba8XMiJ9YNI6Yy_vOFTs9abNtCk2BnZ_5pOJp-o',
    description: 'Experience the free unlimited search capabilities of ChatGPT!',
    publish: 'monica.im',
    ifEstablish: 'true',
    ifFeatured: 'null',
    category: 'productivity/workflow',
    categoryNo: '4',
    userCount: '10000'
  },
  {
    id: 'kbhaffhbhcfmogkkbfanilniagcefnhi',
    iconURL: 'https://lh3.googleusercontent.com/_WjLv3duUHKMcxhNLvh8F8foITtjesi4Z0YvZIb0C1HXzgz83oTqs-qMi_Fzz0vl5AkElbjjYPuztLnQEyvL-_cXsA',
    title: 'Jarvis AI: Chat GPT Bing Claude Bard Grok',
    rating: '4.923705722070845',
    reviewCount: '367',
    coverURL: 'https://lh3.googleusercontent.com/M6xkr64CgaD0MriN4DF8VN3ngKCt_Vygqaj4jC2ffDmnKRC-M_z2D97mldC-4UAepPKGLQvIgqih61JC3GH6I3HD',
    description: 'Jarvis AI Copilot Chatbot by ChatGPT quillbot Grok Jasper Xai to write email better grammar checker \\u0026 spelling mail enhancer',
    publish: 'jarvis.cx',
    ifEstablish: 'true',
    ifFeatured: 'true',
    category: 'productivity/tools',
    categoryNo: '5',
    userCount: '6000'
  }
  //...
]
}
```

### Full Search Options

``` js
iterface SearchOptions {
    limit?: number; // Number of results to return
    minRating?: number; // Minimum rating value
    ifFeatured?: boolean; // If the extension is featured by Chrome
    ifWellKnown?: boolean; // If the extension is made by a well-known developer
}
```


## Returned Data Structure 📐

### Single Extension ID

```json
{
  "success": true,
  "error": false,
  "name": "YouTube Picture-in-Picture",
  "installCount": "12,651",
  "ratingCount": 158,
  "ratingValue": 4.55
}
```

### Multiple Extension IDs

An object is returned with each key as an extension ID, and the value is the respective data structure.

### Field Descriptions

| Field                 | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `success`             | Indicates successful retrieval.                                      |
| `error`               | Provides error information if applicable.                            |
| `name`                | The name of the extension.                                           |
| `installCount`        | Approximate install count as a string.                               |
| `ratingCount`         | The number of user ratings.                                          |
| `ratingValue`         | The average user rating.                                             |
| `description`         | A brief description of the extension.                                |
| `iconUrl`             | The URL to the extension's icon.                                     |
| `coverUrl`            | The URL to the extension's cover image.                              |
| `detailUrl`           | The URL to the extension's detail page.                              |
| `detailedDescription` | A more comprehensive description of the extension.                   |
| `additionalImages`    | An array of URLs to additional images associated with the extension. |
| `version`             | The current version of the extension.                                |
| `offeredBy`           | The provider of the extension.                                       |
| `updated`             | The last update timestamp.                                           |
| `size`                | The size of the extension.                                           |
| `languages`           | Languages supported by the extension.                                |
| `developer`           | The name of the developer.                                           |
| `email`               | The developer's contact email.                                       |
| `websiteUrl`          | The developer's website.                                             |
| `privacyPolicyUrl`    | The URL to the developer's privacy policy.                           |

### Get Comments

Retrieve comments for a specific extension by its ID.

```javascript
async function getExtensionComments(extensionID) {
    try {
        const data = await chromeStoreApi.getExtComments(extensionID);
        if (data.success) {
            console.log(data); // Log the extension comments
        } else {
            console.error(data.error); // Handle errors
        }
    } catch (error) {
        console.error(error); // Handle exceptions
    }
}

// Example usage:
getExtensionComments('gkkmiofalnjagdcjheckamobghglpdpm');

// Example Response
{
  success: true,
  error: null,
  number: 10,
  data: [
    {
        userId: 'fc5ec3b2-519e-43e7-b13e-9d3ed3d64b09',
  name: 'Vamsi Nallamalli',
  avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjVGU8kqRVs4VEEsh8bUGoMixXYQXOhzCWyJuMvy45qeeajyY8OYag=s32',
  rating: 1,
  review: 'asking to login everytime i open chrome, even after giving cookies\n' +
    'Other AI like Merlin, Sider are too good in this problem for side bar Auto search in Google search',
  version: '5.2.1'
    }]}
```

Comment Search Option
```json
  interface CommentOptions {
    limit?: number;
    sort?: "recent" | "helper" | "high-rate-first" | "low-rate-first";
    lang?: "en" | "zh" | 'all'
  }
``` 



## Notes 📝

- The `installCount` field provides an approximation and may not reflect the exact number of installations.
- Due to potential changes in the Chrome Web Store's HTML structure, regular expression patterns may need to be updated to ensure accurate data extraction.

## Recommendations 🔍

- For production environments, consider implementing caching to enhance performance and minimize API calls.

## Caveats ⚠️

- **Install Count Accuracy:** Following updates to the Google Web Store, the exact install count is no longer available. The API provides an approximate string value (e.g., "41,678+").
- **Data Extraction:** The library uses regular expressions for data extraction, which may require updates if the Chrome Web Store's HTML structure changes.

## Author 👤

River (laolei@forkway.cn)

## GitHub Repository 📦

For more information and to contribute, visit the GitHub repository: [leizhenpeng/chrome-extension-meta](https://github.com/leizhenpeng/chrome-extension-meta)
