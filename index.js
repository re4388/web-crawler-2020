/* package import */
const puppeteer = require('puppeteer');
const moment = require('moment');
const ObjectsToCsv = require('objects-to-csv');
const currentTime = moment().format('MMMM_Do_YYYY_h_mm_ss_a');
var CronJob = require('cron').CronJob;



/* global variable */
const ChromeEXEinYourLocal = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
let csvData = new Array();



/* Config  */
// let productName = `MOS 摩斯漢堡 葡萄蒟蒻`
let productName = `i-Rocks K76MN`
// const selector = `#ItemContainer.value`;
const selector = `ul.price_box > li > span`;
// const selector = `#button_DBAB06-19009DWZ2 > ul.price_box > li > span`;

async function getWebInfo(){
  const browser = await puppeteer.launch({
    executablePath:ChromeEXEinYourLocal,
    headless:true
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // https://medium.com/@filipvitas/how-to-set-user-agent-header-with-puppeteer-js-and-not-fail-28c7a02165da
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0')



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
  // await csv.toDisk('./result/price_record.csv')
  await csv.toDisk('./result/price_record.csv', { append: true})


  await browser.close();
}

// getWebInfo()


/* cron job */

// every 1 hour: 0 0 */1 * * *
var job = new CronJob('0 */3 * * * *', function() {
  console.log('You will see this message 3 min');
  getWebInfo()
}, null, true, 'Asia/Hong_Kong');

job.start();
