const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'))
});

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("Favicon", () => {
    test("Page should contain `favicon` icon from the `images` folder ", async () => {
        const favicon = await page.$eval('head link', el => el.href);
        expect(favicon).toMatch(/images\/favicon.png$/);
    });
});

describe('Title', () => {
    test("`title` tag should be in the document and should not be empty", async () => {
        const title = await page.$eval('title', el => el.innerHTML);
        expect(title).not.toBe('');
    });
});

describe('Head', () => {
    test("`HEAD` tag should contain a `base` tag with target attribute set to `_blank`", async () => {
        const newTab = await page.$eval('head base', el => el.target);
        expect(newTab).toBe('_blank');
    });
});

describe('Anchor Tags', () => {
    test("Anchor tags on page should change color on hover", async () => {
        const linkColors = await page.$eval('a', el => getComputedStyle(el).getPropertyValue('color'));
        await page.hover('a');
        const linkColorsHover = await page.$eval('a', el => getComputedStyle(el).getPropertyValue('color'));
        expect(linkColorsHover).not.toBe(linkColors);
    });
});