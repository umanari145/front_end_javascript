# front_end_javascript

## es6sample ECMAScript6の基本構文
- es6sample
  - sample.js es6の基本の記法
    - let, const
    - ブロックスコープ
    - functionの初期値
    - アロー関数
    - thisのスコープに関して
  - class.js
    - 基本的なクラスの書き方
    - 継承

  - sample.html jsをブラウザで読み込み実行させた時

```
#下記のようにnodeコマンドをそのまま実行しても可
node sample.js
node class.js

```
## モジュール化のメリット
- コードが読みやすくなる
- 機能ごとにファイルを分割できる(保守性、再利用性の向上)
- 名前空間の汚染を防ぐ


### 外部ファイル化とモジュールの読み込み方法
- import(es6から使えるようになった用法)
  - modules.js exportを使って外部に関数を外だし
  - lib/ exportを使ってクラスを外部に外だし(様々な呼び出し方)
  - lib2/ exportを使ってクラスを外部に外だし(一括で呼ぶ呼び出し方)
  - import.js(import2.js) 外部の関数やクラスをこの方法で読み込むことができる
  - variables 変数の外だし
  - sample.html ブラウザから実行することもできる

- require(nodeなどで使われていた方法)
  - modules.js modules.exportを使って外部に関数を外だし
  - lib/personClass.js module.exportsを使ってクラスを外部に外だし
  - require.js 外部の関数やクラスをこの方法で読み込むことができる  

```
#es6はnodeコマンドでは実行できない
× node import.js
*後述するbabelを使えば可能なことも・・・・

package.jsonにtype=moduleを記載すればnodeでもimport exportが使える

```

```
nodeコマンドで実行
node require.js
```

参考リンク https://qiita.com/rooooomania/items/4c999d93ae745e9d8657

## cheerio-httpを使ってnode.jsでのスクレイピング

- node_sample
  - package.json
  - download-node.js requestを使ったダウンロード
  - srcraping 生成元のディレクトリ
    - getfile.js 求人情報の獲得クラス
    - registRecruit.js 求人の登録クラス
  - util ユーティルクラス
    - dbUtil.js DBユーティリティ
  - main.js 起動プラグラム
  - .env(.sample) 設定ファイル
  - package.json(-lock) npmライブラリ情報

## webpack (モジュールバンドラ)
[webpack4入門](https://qiita.com/soarflat/items/28bf799f7e0335b68186)<br>
[npmとwebpack4でビルド - jQueryからの次のステップ](https://qiita.com/civic/items/82c0184bcadc50965f91)

複数のプログラムを1つにまとめてファイルを出力するツールのこと。
バンドルとは束ねる、と言う意味。
webpack以外にはBrowserifyなどが有名。

### package.jsonとは?
npmでのライブラリ情報の管理や実行スクリプトの管理など。


### ファイル構成

- webpack_sample
  - package.json ライブラリ&スクリプト管理
  - dest 成果物
  - src 生成元のディレクトリ
    - main.js ライブラリのインポートのjs
  - app.js 生成後のjs
  - index.html

### ライブラリ管理
package.jsonの作成
```
npm init -y
```

package.json
```
{
  "name": "library",
  "version": "1.0.0",
  "description": "",
  "main": "makeFormFromJS.js",
  "scripts": {
    "gulp": "gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://umanari145@github.com/umanari145/library.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/umanari145/library/issues"
  },
  "homepage": "https://github.com/umanari145/library#readme",
  "devDependencies": {
    "webpack": "^4.16.2",
    "webpack-cli": "^2.1.5"
  },
  "dependencies": {
    "moment": "^2.22.2",
    "select2": "^4.0.6-rc.1"
  }
}

```

下記の部分でライブラリの管理をしている<br>
```npm install(i)```でpackage.jsonに書かれているライブラリがインストールされる<br>
```npm install (ライブラリ名)```で個別ライブラリが```./node_modules```以下にインストールされる<br>
--save-dev(--D) オプションをつけるとdevDependenciesに記録される(開発時に実行される)<br>

```
"devDependencies": {
  "webpack": "^4.16.2",
  "webpack-cli": "^2.1.5"
},
"dependencies": {
  "jquery-ui-sass": "0.0.1",
}
```
#### コマンド実行
```npx (ライブラリ名)```でnode_modules以下のライブラリを実行できる。ex ```npx webpack --version ```

##### スクリプト実行
以下の部分に記述することで
```npm run``` 〜が実行可能 ex ```npm run test```

```
  "scripts": {
    "dev":"webpack --mode development ",
    "prod":"webpack --mode production",
    "gulp": "gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### JSコンパイル
```
npx webpack  --mode development (省略可能 --config ./webpack.config.js)
#package.jsonに記述していれば下記のようにかける
npm run dev

```

### トランスパイル

主にES2015以降の仕様で記述したJavaScriptが古いブラウザなどで動かなく危険性があるため、互換性のあるコードに変換をする処理。

#### babel

トランスパイラのためのプラグイン。
新しい書き方で書いたものを古いブラウザでも対応できるようにしたもの

module.exportsの一部に以下のように記述
```
 module:{
   rules:[
     {
       //jsに対してbabel-loaderを適用
       test:/\.js$/,
       use:{
         loader:'babel-loader',
         options:{
           presets:['@babel/preset-env']
         }
       }
     }
   ]

```


## laravel-mix
webpackのラッパー。
laravelの中に元々入っているが、独立して使うこともできる<br>
<br>
ラッパーの説明に関して<br>
あるライブラリの機能を内包したライブラリで元ライブラリよりも便利、高性能になっていることが多い。今回の例でいうとbabelが内蔵されている。<br>
https://wa3.i-3-i.info/word191.html
<br><br>
後述するgulpのタスクランナーとしての機能も持っている

### ファイル構成(webpackと同じ)

- laravel_mix
  - package.json ライブラリ&スクリプト管理
  - dist 成果物
  - src 生成元のディレクトリ
    - main.js ライブラリのインポートのjs
  - app.js 生成後のjs
  - index.html

```
//実行
npm run dev

```


## 総合演習
gulpを使い、各タスクを実行

### gulpとは?

タスクランナー
ウェブアプリ制作に置ける様々な処理を自動化させることのできるツール。

sassのコンパイル<br>
ローカルサーバーの起動と自動更新<br>
weppackでのコンパイル<br>
自動監視<br>
etc・・・

```
//sassのタスクを実行
npx gulp sass

//webpackのタスクを実行
npx gulp webpack

//defaultのタスクを実行
npx gulp (default:省略可能)

//laravel-mixの実行タスク
npm run dev

```

### ファイル構成

- exercise
  - package.json(-lock) ライブラリ&スクリプト管理
  - dest 成果物
  - src 生成元のディレクトリ
    - js  生成元js
    - css 生成元css
    - html 生成元pug
  - config.js コンパイルの設定ファイル(gulp実行時の設定)
  - gulpfile.js gulpの設定ファイル(タスクの記述)
  - mix-maniflest.json laravel-mix実行時の結果の記述
  - webpack.mix.js laravel-mixの設定ファイル(タスクの記述)  
  - index.html 表示されるHTML


------------ 2023/04 移行少しずつリニューアル(dockerやtypescriptなど)　------------ 

laravel-mix　App
```
npm run mix
```

http://localhost/to_do_app/sample.html
にアクセスが可能

- to_do_app(生JavaScript)
  - dist 成果物
  - src 生成元のディレクトリ
    - main.js  生成元js
  - sample.html 画面に表示されるhtml
  - webpack.mix.js laravel-mixの設定ファイル(タスクの記述)  


```
//build
npm run todo-mix
// 開発時
npm run todo-watch
```


http://localhost/to_do_app_vue/sample.html
にアクセスが可能

- to_do_app_vue(CDN vue)
  - dist 成果物
  - src 生成元のディレクトリ
    - main.js  生成元js
  - sample.html 画面に表示されるhtml
  - webpack.mix.js laravel-mixの設定ファイル(タスクの記述)  

http-vue-loaderライブラリ<br>
componentをcdnで使える
https://macoblog.com/vuejs-cdn-spa/


```
//build
npm run vue-mix
// 開発時
npm run vue-watch
```

es6sample<br>
typescriptのコンパイル<br>
(エラーはでるが一応変換できる)
```
docker exec  js_php npx tsc --allowjs  --target ES6 --module ES6 ./es6sample/src/class.ts --outFile ./es6sample/class.js
```

ts_webapp <br>
typescriptでのwebアプリ

- ts_webapp
  - dist 成果物
  - src 生成元のディレクトリ
    - js
      - index.ts  生成元ts(Controller的な部分)
      - EventListener.ts イベントリスナー
      - Task.ts  タスクモデル
      - TaskCollection タスクのコレクション
      - TaskRender HTMLの描画の責務
    
    - css/app.css  生成css
  - index.php 画面に表示されるhtml
  - webpack.mix.js laravel-mixの設定ファイル(タスクの記述)  

build
```
docker exec js_php npm run ts-mix
```

watch
```
docker exec js_php npm run ts-watch
```

dragula<br>
https://codepen.io/zehad/pen/dyPGqbW

- disguise-dom (仮装DOM)
参考教材:https://www.techpit.jp/courses/93 <br>

build
```
docker exec js_php npm run dis
```

watch
```
docker exec js_php npm run dis-watch
```