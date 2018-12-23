
const url = "https://paiza.jp/career/job_offers"
const GetFile = require('./scraping/getfile.js');
const getfile = new GetFile(url);
let total_recuit_info_arr= getfile.get_recruits()
console.log(total_recuit_info_arr)
