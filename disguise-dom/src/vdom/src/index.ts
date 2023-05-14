import h from "./createElement";
import { render } from './render'

const INITIAL_STATE = {
  languages: [
    {
      id: 1,
      name: "PHP",
      discription:
        "PHPはWEB系の言語です。",
    },
    {
      id: 2,
      name: "Python",
      discription:
        "Pythonは機械学習でつかわれる言語です。",   
    },
    {
      id: 3,
      name: "TypeScript",
      discription:
        "TypeScriptは型が存在しています。",
    },
  ],
};

const convertItem = (props) => {
  return props.languages.map((e) => {
    console.log(e.discription)
    return h("div", {
      attrs: {
        class:''
      },
      children: [        
        h("div", {
          attrs: {
            class:'language_wrapper'
          },
          children:[
            h("span", {
              attrs: {
                class:'name'
              },
              children:[e.name]
            }),
            h("button", {
              attrs: {
                class:'follow-btn'
              },
              children:['フォローする']
            })
          ]
        }),
        h("div", {
          attrs: {
            class:'discription'
          },
          children:[e.discription]
        })
      ],
    });
  })
}

// 関数ではなく変数であることに注意
const view = (props) => {
  return h("div", {
    attrs: {},
    children: convertItem(INITIAL_STATE)
  });
}

// オブジェクトの出力
const $app = render(view(INITIAL_STATE));
console.log($app)

const el = document.getElementById('app')
el.appendChild($app)
