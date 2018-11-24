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


### webpack バンドル
