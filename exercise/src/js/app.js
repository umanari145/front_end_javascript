
//const $ = require('jquery');
import $ from 'jquery';
const AddressClass = require('./address.js');

const apiKey = 'ucC12wVgsngvVL8gxokroFuHSgMgvgem5ZTL3LnA';
const apiUrl = "https://opendata.resas-portal.go.jp/api/v1/";

const address = new AddressClass(apiKey,apiUrl)
