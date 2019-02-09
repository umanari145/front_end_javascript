const $ = require('jquery');
require('bootstrap');

module.exports = class AddressClass {

    constructor(apiKey,apiUrl) {
        this.apiKey = apiKey
        this.apiUrl = apiUrl
        this.set_pref()

        $('#select_pref').click(()=>{
            this.select_pref()
        })

        $('#back_to_pref').click(() =>{
            this.back_to_pref()
        })

        $('#select_city').click(()=>{
            this.select_city()
        })
    }

    /**
     * 県の設定
     */
    set_pref () {
        $.ajax({
            url:this.apiUrl + 'prefectures',
            type:'GET',
            headers:{
                'X-API-KEY':this.apiKey
            }
        }).done((data) => {
            let pref_html = '';
            if (data['result'] !== undefined && data['result'].length > 0) {
                let pref_html = this.loadHtml(data,'pref', 6)
                $('#pref_table').html(pref_html)
            }
        }).fail((data) => {
            alert("サーバーとの通信に失敗しました。")
        })
    }

    /**
     * 県選択に戻る
     *
     */
    back_to_pref(){
        $('#prefModal').modal()
    }

    /**
     * 都道府県の選択
     *
     */
    select_pref(){

        let checked_pref_ele = $('input[name="pref"]:checked')

        if (checked_pref_ele.length === 0) {
            return false
        }

        let pref_val = checked_pref_ele.val()
        let pref_name = checked_pref_ele.attr('data-areaname')


        $("#input_pref_str").val(pref_name)
        $("#pref_val").html(pref_val)

        $.ajax({
            url:this.apiUrl + "cities",
            type:'GET',
            headers:{
                'X-API-KEY':this.apiKey
            },
            data:{
                'prefCode':pref_val
            }
        }).done((data) => {
            let city_html = '';
            if (data['result'] !== undefined && data['result'].length > 0) {
                let city_html = this.loadHtml(data,'city', 5)
                $('#city_table').html(city_html)
            }
        }).fail((data) => {
            alert("サーバーとの通信に失敗しました。")
        })
        $('#cityModal').modal()
    }

    /**
     * 市区町村の選択
     */
    select_city() {
        let checked_city_ele = $('input[name="city"]:checked')

        if (checked_city_ele.length === 0) {
            return false
        }

        let city_val = checked_city_ele.val()
        let city_name = checked_city_ele.attr('data-areaname')

        $('#input_address_str').val(city_name)
        $('#city_val').html(city_val)
    }

    /**
     * areaのHTML生成
     * @param  array data APIからのエリアデータ
     * @param  string type pref/city
     * @param  string oneline 1行あたりの行数
     * @return string      HTML
     */
    loadHtml(data, type, oneline) {
        let area_length = data['result'].length
        let area_html
        for(var i = 0; i< area_length;i++) {
            let each_data = data['result'][i]
            let code_name = `${type}Code`
            let label_name = `${type}Name`
            let checkbox_valname = `${each_data[code_name]}`
            let label_id =`${type}_${each_data[code_name]}`

            let t_index = i + 1
            if (t_index == 1) area_html = '<tr>'
            area_html += `<td>`
            area_html += `<span class="area_wrap"><input type="radio" name="${type}" value="${checkbox_valname}" id="${label_id}" data-areaname="${each_data[label_name]}">`
            area_html += `<label for="${label_id}">${each_data[label_name]}</label></span>`
            area_html += `</td>`
            if (t_index % oneline == 0) area_html +=` </tr><tr>`
        }
        return area_html
    }


}
