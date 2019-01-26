const Sugar = require("Sugar");

module.exports =  class RegistRecuit{

    /**
     * コンストラクタ
     * @param sting siteurl トップのURL
     */
    constructor(dbUtil){
        this.dbUtil = dbUtil
    }

    /**
     * 求人登録
     * @param  array regist_data 求人データ
     */
    registRecruit(regist_data){
        Sugar.Array(regist_data).forEach((recruit, i) =>{
            this.regist_single_recruit(recruit)
        })
    }

    /**
     * 1求人の登録
     * @param  object recruit 1求人データの登録
     */
    regist_single_recruit(recruit) {
        this.regist_company(recruit['company_info'])
        this.regist_recruit_self(recruit)
        this.regist_skills(recruit)
    }

    /**
     * 会社登録
     * @return object company_info 会社情報の登録
     */
    regist_company(company_info) {
        let company_id = company_info['company_id']
        let res = this.dbUtil.find('company', 'company_id', company_id)
        if (!res) {
            this.dbUtil.insert('company', company_info)
        }
    }
    /**
     * 求人登録
     * @return object recruit 求人情報の登録
     */
    regist_recruit_self(recruit) {
        let recruit_id = recruit['recruit_id']
        let res = this.dbUtil.find('recruit', 'recruit_id', recruit_id)

        let recruit_hash = {
            low_salary: recruit['low_salary'],
            high_salary:recruit['high_salary'],
            company_id:recruit['company_info']['company_id']
        }

        if (!res) {
            recruit_hash['recruit_id'] = recruit_id
            this.dbUtil.insert('recruit', recruit_hash)
        } else {
            this.dbUtil.update('recruit', recruit_hash, `recruit_id = ${recruit_id}`)
        }
    }

    /**
     * スキルの登録
     * @param  object recruit 求人のハッシュ
     */
    regist_skills(recruit) {


        let recruit_id = recruit['recruit_id']
        let total_skill_arr = new Array()
        if (recruit['total_skill_arr']['priority'] !== undefined) {
            total_skill_arr = this.make_skill_hash(recruit, total_skill_arr, 'priority')
        }
        if (recruit['total_skill_arr']['second'] !== undefined) {
            total_skill_arr = this.make_skill_hash(recruit, total_skill_arr, 'second')
        }
        this.dbUtil.delete('recruit_skill', `recruit_id = ${recruit_id}`)
        this.dbUtil.bulk_insert('recruit_skill', total_skill_arr)
    }

    /**
     * skillテーブルへの登録
     * @param  object recruit         求人オブジェクト
     * @param  array total_skill_arr  skill配列
     * @param  string skill_status    skill状態
     * @return array                 skill-recruitオブジェクトのarray
     */
    make_skill_hash(recruit, total_skill_arr, skill_status) {

        let status
        if (skill_status === 'priority') {
            status = '10'
        } else if(skill_status === 'second') {
            status = '20'
        }
        let skills = recruit['total_skill_arr'][skill_status]
        let skill_length = skills.length
        for (var i=0; i < skill_length; i++) {
            let hash = {
                'skill': skills[i]
            }
            let sql = `SELECT skill_id FROM skill WHERE skill = '${skills[i]}' `
            let select_res = this.dbUtil.select(sql)
            let skill_id;
            if (!select_res) {
                let ins_res = this.dbUtil.insert('skill', hash)
                skill_id = ins_res['insertId']
            } else {
                skill_id = select_res[0]['skill_id']
            }
            total_skill_arr.push({
                'skill_id': skill_id,
                'recruit_id':recruit['recruit_id'],
                'status':status
            })
        }
        return total_skill_arr
    }

}
