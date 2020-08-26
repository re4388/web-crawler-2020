// let productName = `MOS 摩斯漢堡 葡萄蒟蒻`
let searchTerm = `i-Rocks K76MN`
let domainUrl = `https://ecshweb.pchome.com.tw/search/v3.3/?q=`
let completeUrl = domainUrl + searchTerm
const selector = `ul.price_box > li > span`;


let data = {
  searchTerm,
  completeUrl,
  selector
}

module.exports = data
