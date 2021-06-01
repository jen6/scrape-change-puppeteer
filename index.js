// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
// cheerio를 가져온다.
const cheerio = require('cheerio');
const TurndownService = require('turndown');

var turndownService = new TurndownService();


(async() => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    args: [
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
    ],
    slowMo: 50,
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 375,
      height: 667,
      isMobile: true,
    }
  });

  const iPhone = puppeteer.devices['iPhone 6'];
  const page = await browser.newPage();
  await page.emulate(iPhone)

  let argv = process.argv.slice(2)
  let url = argv[0]
  let jquery_selector = argv[1]

  await page.goto(url,{waitUntil: 'networkidle0'});
  const content = await page.content();

  const $ = cheerio.load(content);
  var contentHtml = $(jquery_selector).html();

  if (contentHtml === null){
    contentHtml = "no content"
  }
  console.log(turndownService.turndown(contentHtml));
  browser.close();
})();
