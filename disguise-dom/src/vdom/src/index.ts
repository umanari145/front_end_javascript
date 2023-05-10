import h from "./createElement";
import { render } from './render'

const view = h("p", {
  attrs: {},
  children: ["仮想DOMの学習スタート！"]
});
// オブジェクトの出力
console.log(view)

// #appはオブジェクトをnodeに履かせている
const $app = render(view)
console.log($app)

const el = document.getElementById('app')
el.appendChild($app)
