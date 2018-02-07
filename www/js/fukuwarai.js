function canvas_fukuwarai(fuk) {
    // z-indexの問題を回避するためのCanvas
    var tmpCanvas = $('#tmpCanvas')[0]
    var context0 = tmpCanvas.getContext('2d');
    
    // 細分化された画像パーツを扱うCanvas
    var mainCanvas = $('#fukuCanvas')[0];
    var context = mainCanvas.getContext('2d');
    
    var templateImage = new Image();
    templateImage.src = "image/fuku/tmp.png";
    templateImage.onload = function() {
        context0.drawImage(templateImage, 0, 0);
        //context.drawImage(templateImage, 0, 0);
    }

    var isTouch = false;
    var dragTarget = null; 

    var srcs = [];
    srcs.push(fuk['eyel']);
    srcs.push(fuk['eyer']);
    srcs.push(fuk['nose']);
    srcs.push(fuk['mouth']);

    var images = [];
    for (var i in srcs) {
        images[i] = new Image();
        images[i].src = "data:image/jpeg;base64," + srcs[i]['img'];
        images[i].drawWidth  = srcs[i]['w'];
        images[i].drawHeight = srcs[i]['h'];
    }
    
    /* 細分化された画像パーツをランダムに配置するときに使う変数
     *
     * var min = 50 ;
     * var max = $('mainCanvas').width()-100 ;
     *
     */
     
    var loadedCount = 0;
    for(var i in images){
        images[i].addEventListener('load', function() {
            if (++loadedCount == images.length) {
                var x = 30;//Math.floor( Math.random() * (max + 1 - min) ) + min;
                var y = 50;
                var w = images[i].drawWidth;
                var h = images[i].drawHeight;
                for (var j in images) {
                    // 画像を描画した時の情報を記憶
                    images[j].drawOffsetX = x;
                    images[j].drawOffsetY = y;

                    // 画像を描画
                    context.drawImage(images[j], x, y, w, h);
                    x += 50;//Math.floor( Math.random() * (max + 1 - min) ) + min;
                }
            }
        }, false);
    }

    // ドラッグ開始
    var touchStart = function(e) {
        // ドラッグ開始位置
        var posX = parseInt(e.touches[0].clientX - mainCanvas.offsetLeft);
        var posY = parseInt(e.touches[0].clientY - mainCanvas.offsetTop);

        for (var i = images.length - 1; i >= 0; i--) {
            // 当たり判定（ドラッグした位置が画像の範囲内に収まっているか）
            if (posX >= images[i].drawOffsetX &&
                posX <= (images[i].drawOffsetX + images[i].drawWidth) &&
                posY >= images[i].drawOffsetY &&
                posY <= (images[i].drawOffsetY + images[i].drawHeight)
            ) {
              dragTarget = i;
              isTouch = true;
              
            }
            console.log(dragTarget);
        }
        //確認用
        // console.log("タッチイベント確認");
    }

    // ドラッグ終了
    var touchEnd = function(e) {
        isTouch = false;
    };

    // canvasの枠から外れた
    var mouseOut = function(e) {
        // canvas外にマウスカーソルが移動した場合に、ドラッグ終了としたい場合はコメントインする
        // mouseUp(e);
    }

    // ドラッグ中
    var touchMove = function(e) {
        // ドラッグ終了位置
        var posX = parseInt(e.touches[0].clientX - mainCanvas.offsetLeft);
        var posY = parseInt(e.touches[0].clientY - mainCanvas.offsetTop);

        if(isTouch){
            // tmpCanvasの画像をクリア（z-index問題の応急処置）
            context0.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            // canvas内を一旦クリア
            context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
            //先に背景を登録する
            context.drawImage(templateImage, 0, 0);
            var x = 0;
            var y = 0;
            var w = 150;
            var h = 100;
            for (var i in images) {
                if (i == dragTarget) {
                    x = posX - images[i].drawWidth / 2;
                    y = posY - images[i].drawHeight / 2;
                    // ドラッグが終了した時の情報を記憶
                    images[i].drawOffsetX = x;
                    images[i].drawOffsetY = y;   
                } else if(i != dragTarget){
                    x = images[i].drawOffsetX;
                    y = images[i].drawOffsetY;
                }
                    w = images[i].drawWidth;
                    h = images[i].drawHeight;
                    // 画像を描画
                    context.drawImage(images[i], x, y, w, h);
            }
        }
        // console.log("ムーブイベント確認");
        // console.log(dragTarget)
    };

    // canvasにイベント登録
    mainCanvas.addEventListener('touchstart', function(e){touchStart(e);}, false);
    mainCanvas.addEventListener('touchmove',  function(e){touchMove(e);},  false);
    mainCanvas.addEventListener('touchend',   function(e){touchEnd(e);},   false);
    mainCanvas.addEventListener('mouseout',   function(e){mouseOut(e);},   false);
};