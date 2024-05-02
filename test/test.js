const assert = require('chai').assert;
const { extMeta } = require('../index.js');
const { quickSearch } = require('../index.js');
const { fullSearch } = require('../search.js');
const { getExtComments } = require('../comment.js');

describe.skip("Chrome Web Store API Tests", function () {
	this.timeout(6000); // Set timeout for all tests in this describe block
	describe.skip("Single ID Tests", function () {
		it("should handle existing extension ID:gkkmiofalnjagdcjheckamobghglpdpm", async function () {
			const data = await extMeta('gkkmiofalnjagdcjheckamobghglpdpm');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'YouTube Windowed FullScreen');
			assert.equal(data.details.languages, 'English');
			assert.equal(data.details.email, 'navi.jador@gmail.com');
			// console.log(data);
		});

		it.skip("should handle existing extension ID:hlepfoohegkhhmjieoechaddaejaokhf", async function () {
			const data = await extMeta('hlepfoohegkhhmjieoechaddaejaokhf');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Refined GitHub');
			assert.equal(data.details.languages, 'English');
			assert.equal(data.details.email, 'sindresorhus@gmail.com');
			// console.log(data);
		});

		it("should handle existing extension ID:hlepfoohegkhhmjieoechaddaejaokhf", async function () {
			const data = await extMeta('bkhaagjahfmjljalopjnoealnfndnagc');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.details.languages, 'English (United States)');
			assert.equal(data.details.email, 'support@octotree.io');
			assert.equal(data.details.websiteUrl, 'https://octotree.io');
			// console.log(data);
		});

		it.skip("should handle existing extension ID:gmimocjjppdelmhpcmpkhekmpoddgima", async function () {
			const data = await extMeta('gmimocjjppdelmhpcmpkhekmpoddgima');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Full Screen for Google Chrome');
			// assert.equal(data.details.languages, '55 languages');
		});


		it.skip("should handle existing extension ID:cdnlfphfngnfhjcnoikfhaomaaflaiie", async function () {
			const data = await extMeta('cdnlfphfngnfhjcnoikfhaomaaflaiie');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Video Maximizer');
			assert.equal(data.details.languages, 'English');
			assert.equal(data.details.email, 'trophygeek@trophygeek.com');
		});
	});

	describe("Multiple IDs Tests", function () {
		this.timeout(6000); // Set timeout for all tests in this describe block
		it("should handle array of IDs", async function () {
			var data = await extMeta(['gkkmiofalnjagdcjheckamobghglpdpm', 'gkkmiofalnjagdcjheckamobghglpdpz']);
			assert.typeOf(data, 'object');
			assert.lengthOf(Object.keys(data), 2);

			// console.log(data);

			const e1 = data['gkkmiofalnjagdcjheckamobghglpdpm'];
			const e2 = data['gkkmiofalnjagdcjheckamobghglpdpz'];

			assert.equal(e1.success, true);
			assert.isNull(e1.error);
			assert.equal(e1.name, 'YouTube Windowed FullScreen');
			assert.typeOf(e1.installCount, 'number');
			assert.typeOf(e1.reviewCount, 'number');
			assert.typeOf(e1.rating, 'number');

			assert.equal(e2.success, false);
			assert.equal(e2.error, 'Couldn\'t find extension with ID gkkmiofalnjagdcjheckamobghglpdpz');
		});
	});

	describe("Edge Cases", function () {
		it("should handle empty instantiation", async function () {
			const data = await extMeta();

			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
		});

		it("should handle null instantiation", async function () {
			const data = await extMeta(null);
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
		});

		it("should handle undefined instantiation", async function () {
			const data = await extMeta(undefined);
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');

		});

		it("should handle numeric extension ID", async function () {
			const data = await extMeta(3409);
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');

		});

		it("should handle incorrect string instantiation", async function () {
			const data = await extMeta('3409');
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');

		});
	});
});


//fail
describe.skip("chrome Quick Search ", () => {
	it("should handle existing keyword", async () => {
		const data = await quickSearch('youtube');
		console.log(data);
		assert.equal(data.success, true);
		assert.isNull(data.error);
		assert.isAbove(data.data.length, 0);
		assert.isBelow(data.data.length, 11);

	});

	it("should handle existing keyword", async () => {
		const data = await quickSearch('飞书');
		console.log('data', data)
		assert.equal(data.success, true);
		assert.isNull(data.error);
		assert.isAbove(data.data.length, 0);
		// console.log(data.data);
	});

})


describe.skip('chorm full searh', () => {
	it('should handle existing keyword', async () => {
		const data = await fullSearch('youtube', 18);
		console.log(data.data);
		assert.equal(data.success, true);
		assert.isNull(data.error);
		assert.isAbove(data.data.length, 3);
		// assert.equal(data.number, 10);
	});
	it('grade make it', async () => {
		const data = await fullSearch('豆瓣', {
			limit: 10,
			minRating: 4,
		});
		assert.isNull(data.error);
		assert.equal(data.number, 10);
		assert.isAbove(data.number, 10);
	});
	it.only('should handle existing keyword', async () => {
		const data = await fullSearch('monica', {
			limit: 10
		});
		console.log(data.data);
		assert.equal(data.success, true);
		assert.isNull(data.error);
		// assert.isAbove(data.data.length, 3);
		// assert.equal(data.number, 10);
	});
	it('should handle existing keyword', async () => {
		const data_ = await fullSearch('豆瓣', {
			quantity: 100,
			minRating: 5
		});
		const data__ = await fullSearch('豆瓣', {
			quantity: 100,
			minRating: 4
		});
		assert.notEqual(data_.data.length, data__.data.length);
	});

	// ifFeatured = false,
	it('should handle existing keyword', async () => {
		const data = await fullSearch('豆瓣', {
			quantity: 100,
			ifWellKnown: false
		});
		console.log(data.data.length);
		const data_ = await fullSearch('豆瓣', {
			quantity: 100,
			ifWellKnown: true
		});
		console.log(data_.data.length);
		assert.notEqual(data.data.length, data_.data.length);
	});
})

describe.only('chrome comment', function () {
	this.timeout(8000); // 设置较长的超时时间，以防 API 响应较慢

	it('amount test', async () => {
		const data = await getExtComments('ofpnmcalabcbjgholdjcjblkibolbppb', {
			limit: 300
		});
		assert.strictEqual(data.data.length, 300);
	});

	it('lanuguage test', async () => {
		const data = await getExtComments('ofpnmcalabcbjgholdjcjblkibolbppb', {
			limit: 3,
			lang: 'zh'
		});
		const allChinese = data.data.every(item => {
			return /[\u4e00-\u9fa5]/.test(item.review);
		});
		assert.isTrue(allChinese);
	});

	it('sturcture test', async () => {
		const data = await getExtComments('ofpnmcalabcbjgholdjcjblkibolbppb', {
			limit: 2
		});

		const firstComment = data.data[0];
		console.log('firstComment', firstComment)
		assert.hasAllKeys(firstComment, ['userId', 'name', 'avatarUrl', 'rating', 'review', 'version']);
	});
});

// test qu
