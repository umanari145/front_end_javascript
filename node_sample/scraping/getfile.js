const client = require("cheerio-httpcli");
const Sugar = require("Sugar");

module.exports =  class GetFile{

    /**
     * コンストラクタ
     * @param sting siteurl トップのURL
     */
    constructor(siteurl){
      this.siteurl = siteurl
    }

    /**
     * 求人の取得
     * @return  [description]
     */
    get_recruits(){
      console.log(`${this.siteurl}の取得を開始します。`)
      //同期的に使う
      let result = client.fetchSync(this.siteurl)

      if(result.err) {
        console.log(result.res)
        return false
      }
      this.jQuery = result.$
      let total_recuit_info_arr = this.do_recurit_process()
      return total_recuit_info_arr
    }

    /**
     * １ページの情報
     * @param  obj err     エラー
     * @param  obj jQuery jquery
     * @param  obj res  レスポンス
     * @return array  求人の配列
     */
    do_recurit_process() {

      let total_recuit_info_arr = []
      this.jQuery('.c-job_offer-box').each((i,v) => {
        //アロー演算子で記述しているので
        //thisが同一オブジェクトをさすため使える
        //jQuery()で囲めばJavaScriptのオブジェクトは
        //jQueryのメソッドが使える
        let total_recuit_info = this.get_single_recruit(this.jQuery(v))
        total_recuit_info_arr.push(total_recuit_info)
      })
      return total_recuit_info_arr
    }

    /**
     * 1求人の取得
     * @param obj parent_obj jquery親要素
     * @return obj 求人情報
     */
    get_single_recruit(parent_obj) {
      let link_str = parent_obj.find('.c-job_offer-box__header__title__link').attr('href') ||''
      let recruit_id = link_str.split('/')[3]
      let company_obj = parent_obj.find('.c-job_offer-recruiter__name a')
      let company_hash = this.get_company(company_obj)
      //console.log(company_hash)
      let total_recuit_info = this.get_recruit_detail(parent_obj)
      //console.log('--トータル求人情報--')
      //console.log(recuit_info)
      total_recuit_info['company_info'] = company_hash
      return total_recuit_info
    }

    /**
     *会社情報の取得
     *
     * @param  obj company_obj 会社要素
     * @return obj 会社オブジェクト
     */
    get_company(company_obj){
      let company_id_ele = company_obj.attr('href')
      let regexp = new RegExp(/recruiters\/(\d+)/);

      let regexp_res = company_id_ele.match(regexp)
      let company_id = ''
      if (regexp_res[1] !== undefined) {
        company_id = regexp_res[1]
      }
      let company_name = company_obj.text()
      let company_hash = {
        'company_id':company_id,
        'company_name':company_name
      }
      return company_hash
    }

    /**
     *求人情報の取得
     *
     * @param  obj parent_obj 会社要素
     * @return obj 求人オブジェクト
     */
    get_recruit_detail(parent_obj){
      let recuit_info = {}

      let salary_parent = parent_obj.find('.c-job_offer-detail__salary')
      let salary_string = Sugar.String(salary_parent.html()).trim().raw
      let salary_arr = salary_string.split('〜')
      let low_salary = salary_arr[0].replace(/[万円, ]/g, '')
      let high_salary = null
      if (salary_arr[1] !== undefined) {
        high_salary = salary_arr[1].replace(/[万円, ]/g, '')
      }
      //console.log('----' + high_salary)
      recuit_info['low_salary'] = low_salary
      recuit_info['high_salary'] = high_salary
      let total_skill_arr = this.get_skill(parent_obj)
      recuit_info['total_skill_arr'] = total_skill_arr
      return recuit_info
    }

    /**
     *スキルの取得
     *
     * @param  obj parent_obj 会社要素
     * @return obj スキルオブジェクト
     */
    get_skill(parent_obj){
      let skill_arr = parent_obj.find('.c-job_offer-detail__description .priority a').html()

      //console.log('--priority--')
      let priority_skill_arr = []
      parent_obj.find('.c-job_offer-detail__description .priority a').each((i,v) => {
        let priority_skill = Sugar.String(this.jQuery(v).html()).trim().raw
        priority_skill_arr.push(priority_skill)
      })
      //console.log(priority_skill_arr)

      //console.log('--second--')
      let second_skill_arr = []
      parent_obj.find('.c-job_offer-detail__description .lang_tag a').each((i,v) => {
        let second_skill = Sugar.String(this.jQuery(v).html()).trim().raw
        if (priority_skill_arr.indexOf(second_skill) == -1) {
          second_skill_arr.push(second_skill)
        }
      })

      parent_obj.find('.c-job_offer-detail__description .fw_tag a').each((i,v) => {
        let second_skill = Sugar.String(this.jQuery(v).html()).trim().raw
        if (priority_skill_arr.indexOf(second_skill) == -1) {
          second_skill_arr.push(second_skill)
        }
      })
      //console.log(second_skill_arr)

      let total_skill_arr = {}

      if (priority_skill_arr.length > 0) {
        total_skill_arr['priority'] = priority_skill_arr
      }

      if (second_skill_arr.length > 0) {
        total_skill_arr['second'] =second_skill_arr
      }
      //console.log('----- total_skill -----')
      //console.log(total_skill_arr)

      return total_skill_arr
    }

}
