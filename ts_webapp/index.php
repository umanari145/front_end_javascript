<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./dist/css/app.css?hoge=<?php echo time(); ?>">
</head>
<body>
    <h1>看板ボード</h2>
    <div class="w-75">
        <div class="d-flex justify-content-between w-75">
            <h2>タスクを新規作成</h2>
            <button id="add_task_button">作成</button>
        </div>
        <div>
            タイトル
            <div>
                <input type="text" class="d-block w-75" id="add_task_area">
            </div>
        </div>
    </div>
    <div class="mt-3 d-flex justify-content-between w-75">
        <div class="w-100">
            <div class="text-center">TODO</div>
            <div id="to_do_inner_area" style="height: 100px;">
            </div>
        </div>
        <div class="w-100">
            <div class="text-center">DOING</div>
            <div id="doing_inner_area" style="height: 100px;">
                
            </div>
        </div>
        <div class="w-100">
            <div class="text-center">DONE</div>
            <div>
                
            </div>
        </div>
    </div>
    <script type="text/javascript" src="./dist/js/index.js?hoge=<?php echo time(); ?>"></script>
</body>
</html>