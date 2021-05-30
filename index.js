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
    devtools: true,
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 375,
      height: 667,
      isMobile: true,
    }
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setUserAgent("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/78.0.1025.133 Mobile Safari/535.19")

  let argv = process.argv.slice(2)
  let url = argv[0]
  let jquery_selector = argv[1]

  await page.goto(url,{waitUntil: 'networkidle0'});
  // 페이지의 HTML을 가져온다.
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const contentHtml = $(jquery_selector).html();
  // 모든 리스트를 순환한다.
  console.log(turndownService.turndown(contentHtml));
  // 브라우저를 종료한다.
  browser.close();
})();
