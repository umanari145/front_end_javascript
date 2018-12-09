const client = require("cheerio-httpcli");
const url = "https://paiza.jp/career/job_offers"

const GetFile = require('./scraping/getfile.js');
const gf = new GetFile();
let param = {}

client.fetch(url, param , function(err, $, res){
  if (err) {
    console.log("Error:", err);
    return;
  }
  let body = $.html();
  gf.printName()
})
