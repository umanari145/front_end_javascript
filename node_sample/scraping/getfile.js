const client = require("cheerio-httpcli");

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

      client.fetch(this.siteurl, (err, $, res) => {
        if(err) {
          console.log(res)
          return false
        }

        $('.c-job_offer-box').each((i,v) => {
          //アロー演算子で記述しているので
          //thisが同一オブジェクトをさすため使える

          //$()で囲めばJavaScriptのオブジェクトは
          //jQueryのメソッドが使える
          this.get_single_recruit($(v))
        })
      })
    }

    /**
     * 1求人の取得
     * @param obj parent_obj jquery親要素
     * @return {[type]} [description]
     */
    get_single_recruit(parent_obj) {
      let link_str = parent_obj.find('.c-job_offer-box__header__title__link').attr('href') ||''
      let recruit_id = link_str.split('/')[3]
      let company_obj = parent_obj.find('.c-job_offer-recruiter__name a')
      let company_hash = this.get_company(company_obj)
      console.log(company_hash)
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
}
