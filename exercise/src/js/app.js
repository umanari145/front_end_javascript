'use strict';

const $ = require('jquery');
require('bootstrap');

$(function(){

    $.ajax({
        url:"https://opendata.resas-portal.go.jp/api/v1/prefectures",
        type:'GET',
        headers:{
            'X-API-KEY':''
        }
    }).done((data) => {
        let area_html = '';
        if (data['result'] !== undefined && data['result'].length > 0) {
            let area_html = loadHtml(data,'pref')
            $('#area_table').html(area_html)
        }
    }).fail((data) => {
        alert("サーバーとの通信に失敗しました。")
    })

    /**
     * areaのHTML生成
     * @param  array data APIからのエリアデータ
     * @param  string type pref/shiku/shoson
     * @return string      HTML
     */
    function loadHtml(data, type) {
        let area_length = data['result'].length
        let area_html
        for(var i = 0; i< area_length;i++) {
            let each_data = data['result'][i]
            let code_name = `${type}Code`
            let label_name = `${type}Name`
            let checkbox_valname = `${each_data[code_name]}`
            let label_id =`type_${each_data[code_name]}`

            let t_index = i + 1
            if (t_index == 1) area_html = '<tr>'
            area_html += `<td>`
            area_html += `<span class="area_wrap"><input type="radio" name="pref" value="${checkbox_valname}" id="${label_id}">`
            area_html += `<label for="${label_id}">${each_data[label_name]}</label></span>`
            area_html += `</td>`
            if (t_index % 4 == 0) area_html +=` </tr><tr>`
        }
        return area_html
    }

});
