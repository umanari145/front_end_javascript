import h from "./createElement";
import { render } from './render'

const INITIAL_STATE = {
  accounts: [
    {
      id: 1,
      name: "リオネル・メッシ",
      team: "FCバルセロナ",
      description:
        "アルゼンチンサンタフェ州ロサリオ出身のイタリア系アルゼンチン人サッカー選手。リーガ・エスパニョーラ・FCバルセロナ所属。アルゼンチン代表。ポジションはフォワード (wikipedia)",
      isFollow: false,
    },
    {
      id: 2,
      name: "クリスティアーノ・ロナウド",
      team: "Juventus",
      description:
        "ポルトガル・フンシャル出身のサッカー選手。セリエA・ユヴェントスFC所属。ポルトガル代表。ポジションはフォワード (wikipedia)",
      isFollow: true,
    },
    {
      id: 3,
      name: "ネイマール",
      team: "パリサンジェルマン",
      description:
        "ブラジル・サンパウロ州モジ・ダス・クルーゼス出身のサッカー選手。ブラジル代表。リーグ・アン・パリ・サンジェルマンFC所属。ポジションはフォワード (wikipedia)",
      isFollow: false,
    },
  ],
};

const convert = () => {
  
}

// 関数ではなく変数であることに注意
const view = (props) => {
  return h("p", {
    attrs: {},
    children: ["仮想DOMの学習スタート！"],
  });
}
// オブジェクトの出力
console.log(view(INITIAL_STATE))
const $app = render(view(INITIAL_STATE));
console.log($app)
// #appはオブジェクトをnodeに履かせている
/*const $app = render(view)*/
/*console.log($app)

const el = document.getElementById('app')
el.appendChild($app)*/
