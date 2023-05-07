#  仮装DOMとは

## リアルDOM操作
```

const app = document.getElementById("app");
const p = document.createElement("p");
p.innerText = "Hello World!"

app.appendChild(p);
```
デメリット
- ロジックがUIに依存
- 状態管理が難しい(パラメータが多くなるとHTML内でデータをすべて管理しておかないといけない)


### 仮装DOMの場合
DOMの差分を検知し、差分のみを反映<br>

メリット
 - 差分のみのレンダリングになるので高速
 - 見た目とロジックの分離
 - スコープを狭くすることができる
 - 状態管理が楽
