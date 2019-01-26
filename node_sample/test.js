const loadenv = require('node-env-file');
const DButil =  require('./util/dbUtil.js');
const Recruit = require('./scraping/registRecruit.js');

loadenv('.env')

const dbutil = new DButil(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);
const recruit = new Recruit(dbutil);

dotest()

function dotest(){
    regist_recruit_test()
}

function regist_recruit_test() {
  let obj1 = {
  recruit_id:100,
  low_salary: '450',
  high_salary: '600',
  total_skill_arr:
   { priority:[
       'PHP'
   ],
     second:
      [ 'Ruby',
        'JavaScript',
        'React',
        'Node.js' ] },
  company_info: { company_id: '3818', company_name: 'セルスペクト株式会社' }
  }
  let obj2 = {
  recruit_id:200,
  low_salary: '550',
  high_salary: '650',
  total_skill_arr:
   { priority:[
       'Java'
   ],
     second:
      [ 'PHP',
        'JavaScript',
        'Node.js' ] },
  company_info: { company_id: '3818', company_name: 'セルスペクト株式会社' } }

  let arr = new Array()
  arr.push(obj1)
  arr.push(obj2)
  recruit.registRecruit(arr);
}



function select_test(){
    var res = dbutil.select("select * from recruit")
    console.log(res[0]['low_salary'])
}

function insert_test(){
    let res = dbutil.insert('recruit', {
        'company_id':2,
        'low_salary':456,
        'high_salary':798
    })
    console.log(res)
}

function bulk_insert_test(){
    var ins_arr = new Array();
    ins_arr.push({
        'company_id':2,
        'low_salary':500,
        'high_salary':700
    })

    ins_arr.push({
        'company_id':2,
        'low_salary':600,
        'high_salary':700
    })

    let res = dbutil.bulk_insert('recruit', ins_arr)
    console.log(res)
}

function update_test(){
    let res = dbutil.update('recruit',{company_id:1,low_salary:500},'id=3')
    console.log(res)
}

function delete_test(){
    let res = dbutil.delete('recruit','id >=3')
    console.log(res)
}
