function canvas_fukuwarai(fuk) {
    var canvas  = document.getElementById('fukuCanvas');
    var context = canvas.getContext('2d');
    
    var img3 = new Image();
    img3.src = "image/fuku/tmp.png";
    img3.onload = function() {
        context.drawImage(img3, 0, 0);
    }

    var isTouch = false;
    var dragTarget = null; // ドラッグ対象の画像の添え字

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

    var min = 50 ;
    var max = $('canvas').width()-100 ;

   var loadedCount = 0;
    for (var i in images) {
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
                    //y += 70;
                }
            }
        }, false);
    }

    // ドラッグ開始
    var touchStart = function(e) {
        // ドラッグ開始位置
        var posX = parseInt(e.touches[0].clientX - canvas.offsetLeft);
        var posY = parseInt(e.touches[0].clientY - canvas.offsetTop);

        for (var i = images.length - 1; i >= 0; i--) {
            // 当たり判定（ドラッグした位置が画像の範囲内に収まっているか）
            if (posX >= images[i].drawOffsetX &&
                posX <= (images[i].drawOffsetX + images[i].drawWidth) &&
                posY >= images[i].drawOffsetY &&
                posY <= (images[i].drawOffsetY + images[i].drawHeight)
            ) {
              dragTarget = i;
              isTouch = true;
              break;
            }
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
        var posX = parseInt(e.touches[0].clientX - canvas.offsetLeft);
        var posY = parseInt(e.touches[0].clientY - canvas.offsetTop);

        if (isTouch) {
            // canvas内を一旦クリア
            context.clearRect(0, 0, canvas.width, canvas.height);
            //先に背景を登録する
            context.drawImage(img3, 0, 0);

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
                } else {
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
    };

    // canvasにイベント登録
    canvas.addEventListener('touchstart', function(e){touchStart(e);}, false);
    canvas.addEventListener('touchmove',  function(e){touchMove(e);},  false);
    canvas.addEventListener('touchend',   function(e){touchEnd(e);},   false);
    canvas.addEventListener('mouseout',   function(e){mouseOut(e);},   false);
};