<!DOCTYPE html>
<html lang="ja">
  <head>
    <script src="./dist/app.js?hoge=<?php echo time(); ?>" defer></script>
  </head>
  <body>
    <main>
      <div id="app">
        <div>
          <div class="language_wrapper">
            <span class="name">PHP</span>
            <button class="follow-btn nofollow">フォローする</button>
          </div>
          <div class="discription">
            PHPはWEB系の言語です。
          </div>
        </div>
        <div>
          <div class="language_wrapper">
            <span class="name">Python</span>
            <button class="follow-btn nofollow">フォローする</button>
          </div>
          <div class="discription">
            Pythonは機械学習でつかわれる言語です。
          </div>
        </div>
        <div>
          <div class="language_wrapper">
            <span class="name">TypeScript</span>
            <button class="follow-btn nofollow">フォローする</button>
          </div>
          <div class="discription">
            TypeScriptは型が存在しています。
          </div>
        </div>
      </div>
    </main>
  </body>
</html>