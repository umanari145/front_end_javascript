
const url = "https://paiza.jp/career/job_offers"
const GetFile = require('./scraping/getfile.js');
const gf = new GetFile(url);
gf.get_recruits()
