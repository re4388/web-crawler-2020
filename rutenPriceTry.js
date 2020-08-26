const searchTerm = 'Ducky One 2'
let completeUrl = `https://www.ruten.com.tw/item/show?22004246878744`
const selector = `div > div.item-purchase-stack > strong.rt-text-xx-large.rt-text-important`;

let data = {
  searchTerm,
  completeUrl,
  selector
}

module.exports = data
