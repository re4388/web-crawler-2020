const puppeteer = require('puppeteer');
const ChromeEXEinYourLocal = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const moment = require('moment');
const currentTime = moment().format('MMMM_Do_YYYY_h_mm_ss_a');
const ObjectsToCsv = require('objects-to-csv');
let csvData = new Array();

// let productName = `MOS 摩斯漢堡 葡萄蒟蒻`
let productName = `i-Rocks K76MN`

/* variables we might keep change */
const firstOpenUrl = `https://shopping.pchome.com.tw/`;
// const selector = `#ItemContainer.value`;
const selector = `ul.price_box > li > span`;
// const selector = `#button_DBAB06-19009DWZ2 > ul.price_box > li > span`;

(async () => {
  const browser = await puppeteer.launch({
    executablePath:ChromeEXEinYourLocal,
    headless:true
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // https://medium.com/@filipvitas/how-to-set-user-agent-header-with-puppeteer-js-and-not-fail-28c7a02165da
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0')

  // await page.setViewport({
  //   width: 1920,
  //   height: 1080
  // });


  // await page.waitFor(1000); // wait 1 sec
  // await page.goto(firstOpenUrl);
  // await page.type('input[id="keyword"]', 'MOS 摩斯漢堡 葡萄蒟蒻');
  // await (await page.$('input[id="keyword"]')).press('Enter'); // type enter

  await page.goto(`https://ecshweb.pchome.com.tw/search/v3.3/?q=${productName}`)
  await page.waitFor(500); // wait 1 sec
  const price = await page.$eval(selector ,ele => ele.innerText);
  // await page.screenshot({ path: `result/${currentTime}.png`});

  console.log(price);


  let obj = {
    product: productName,
    price: price,
    recordTime: currentTime,
  };
  csvData.push(obj)
  let csv = new ObjectsToCsv(csvData);
  await csv.toDisk('./result/price_record.csv')
  // await csv.toDisk('./result/price_record.csv', { append: true})


  await browser.close();
})();