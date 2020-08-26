/* package import */
const puppeteer = require('puppeteer');
const moment = require('moment');
const ObjectsToCsv = require('objects-to-csv');
const currentTime = moment().format('MMMM_Do_YYYY_h_mm_ss_a');
var CronJob = require('cron').CronJob;

/* import data, we use different data config here*/
var data = require('./pchomePage')
// console.log(data);


/* global variable */
const ChromeEXEinYourLocal = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
let csvData = new Array();
let searchTerm = data.searchTerm
let completeUrl = data.completeUrl
let selector = data.selector

async function getWebInfo(){
  const browser = await puppeteer.launch({
    executablePath:ChromeEXEinYourLocal,
    headless:true
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0')

  await page.goto(completeUrl)
  await page.waitFor(500); // wait 1 sec
  const price = await page.$eval(selector ,ele => ele.innerText);

  console.log(price);


  let obj = {
    product: searchTerm,
    price: price,
    recordTime: currentTime,
  };
  csvData.push(obj)
  let csv = new ObjectsToCsv(csvData);
  // await csv.toDisk('./result/price_record.csv')
  await csv.toDisk('./result/price_record.csv', { append: true})

  await browser.close();
}

getWebInfo()


/* cron job */

// every 1 hour: 0 0 */1 * * *
// every 1 hour: 0 0 */1 * * *

// var job = new CronJob('0 0 */1 * * *', function() {
//   console.log('You will see this message 3 min');
//   getWebInfo()
// }, null, true, 'Asia/Hong_Kong');

// job.start();
