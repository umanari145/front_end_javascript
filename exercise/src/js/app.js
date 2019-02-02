'use strict';

const $ = require('jquery');
const AddressClass = require('./address.js');
const apiKey = 'ucC12wVgsngvVL8gxokroFuHSgMgvgem5ZTL3LnA';
const apiUrl = "https://opendata.resas-portal.go.jp/api/v1/";

$(function(){
    const address = new AddressClass(apiKey,apiUrl)
});
