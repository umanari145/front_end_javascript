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


### import es6のモジュールの読み込み方法
- import
  - modules.js exportを使って外部に関数を外だし
  - lib/personClass.js exportを使ってクラスを外部に外だし
  - import.js 外部の関数やクラスをこの方法で読み込むことができる
  - sample.html ブラウザから実行することもできる

```
#nodeコマンドでimportは実行できない
× node import.js
```
### node nodeでの読み込み方法
- require
  - modules.js modules.exportを使って外部に関数を外だし
  - lib/personClass.js module.exportsを使ってクラスを外部に外だし
  - require.js 外部の関数やクラスをこの方法で読み込むことができる

```
nodeコマンドで実行
node require.js
```

## node.jsでのスクレイピング



## webpack バンドル(モジュールバンドル)
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

下記の部分でライブラリの管理をしている
```npm install(i)```でpackage.jsonに書かれているライブラリがインストールされる
```npm install (ライブラリ名)```で個別ライブラリが```./node_modules```以下にインストールされる
--save-dev(--D) オプションをつけるとdevDependenciesに記録される(開発時に実行される)

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
npx webpack   --mode development (省略可能 --config ./webpack.config.js)
#package.jsonに記述していれば下記のようにかける
npm run dev

```

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
