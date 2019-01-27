'use strict';

const $ = require('jquery');
require('bootstrap');

$(function(){

    $.ajax({
        url:"https://opendata.resas-portal.go.jp/api/v1/prefectures",
        type:'GET',
        headers:{
            'X-API-KEY':'ucC12wVgsngvVL8gxokroFuHSgMgvgem5ZTL3LnA'
        }
    }).done((data) => {
        let pref_html = '';
        if (data['result'] !== undefined && data['result'].length > 0) {
            let pref_html = loadHtml(data,'pref', 6)
            $('#pref_table').html(pref_html)
        }
    }).fail((data) => {
        alert("サーバーとの通信に失敗しました。")
    })

    $('#back_to_pref').click(function(){
        $('#prefModal').modal()
    })

    $('#select_pref').click(function(){

        let checked_pref_ele = $('input[name="pref"]:checked')

        if (checked_pref_ele.length === 0) {
            return false
        }

        let pref_val = checked_pref_ele.val()
        let pref_name = checked_pref_ele.attr('data-areaname')

        $("#pref_name").html(pref_name)
        $("#pref_val").html(pref_val)

        $.ajax({
            url:"https://opendata.resas-portal.go.jp/api/v1/cities",
            type:'GET',
            headers:{
                'X-API-KEY':'ucC12wVgsngvVL8gxokroFuHSgMgvgem5ZTL3LnA'
            },
            data:{
                'prefCode':pref_val
            }
        }).done((data) => {
            let city_html = '';
            if (data['result'] !== undefined && data['result'].length > 0) {
                let city_html = loadHtml(data,'city', 5)
                $('#city_table').html(city_html)
            }
        }).fail((data) => {
            alert("サーバーとの通信に失敗しました。")
        })
        $('#cityModal').modal()
    })

    $('#select_city').click(function(){
        let checked_city_ele = $('input[name="city"]:checked')

        if (checked_city_ele.length === 0) {
            return false
        }

        let city_val = checked_city_ele.val()
        let city_name = checked_city_ele.attr('data-areaname')
        $('#city_name').html(city_name)
        $('#city_val').html(city_val)
    })

    /**
     * areaのHTML生成
     * @param  array data APIからのエリアデータ
     * @param  string type pref/city
     * @param  string oneline 1行あたりの行数
     * @return string      HTML
     */
    function loadHtml(data, type, oneline) {
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

});
