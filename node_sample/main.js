
const url = "https://paiza.jp/career/job_offers"
const GetFile = require('./scraping/getfile.js');
const Recruit = require('./scraping/registRecruit.js');
const loadenv = require('node-env-file');
const DButil =  require('./util/dbUtil.js');
loadenv('.env')

const dbUtil = new DButil(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);


const getfile = new GetFile(url);
const recruit = new Recruit(dbUtil);

let total_recuit_info_arr= getfile.get_recruits()
recruit.registRecruit(total_recuit_info_arr)
