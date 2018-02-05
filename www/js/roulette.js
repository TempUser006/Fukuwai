function canvas_roulette(rou){
    var topImage = [];//目の部分の画像を格納しておく配列
    var middleImage = [];//鼻の部分の画像を格納しておく配列
    var bottomImage = [];//口の部分の画像を格納しておく配列
    //ルーレットをスタート・ストップアニメーションを発火させるための変数を宣言
    var topStop,middleStop,bottomStop;
    
    //canvasのコンテキストを取得する
    var topCanvas = $('#top').get(0).getContext("2d");
    var middleCanvas = $('#middle').get(0).getContext("2d");
    var bottomCanvas = $('#bottom').get(0).getContext("2d");
    
    //画像名（目）を格納しておく配列
    var topSrc = [];
    //画像名（鼻）を格納しておく配列
    var middleSrc = [];
    //画像名（口）を格納しておく配列
    var bottomSrc = [];
    
    for(var i = 0; i < rou.length; i++) {
        topSrc.push(rou[i]['eye']);
        middleSrc.push(rou[i]['nose']);
        bottomSrc.push(rou[i]['mouth']);
    }
    console.log(topSrc);
    
    /* Imageのオブジェクトを取得する　*/
    for (var i in topSrc) {
        topImage[i] = new Image();
        topImage[i].src = topSrc[i];
    }
    //鼻の部分の画像を格納しておく配列
    var middleImage = [];
    for (var i in middleSrc) {
        middleImage[i] = new Image();
        middleImage[i].src = middleSrc[i];
    }
    //口の部分の画像を格納しておく配列
    var bottomImage = [];
    for (var i in bottomSrc) {
        bottomImage[i] = new Image();
        bottomImage[i].src = bottomSrc[i];
    }
    
    
    //Canvasに描画させる画像（目）をランダムで描画させる関数
    function topDraw(){
        topCanvas.drawImage(topImage[Math.floor(Math.random() * topImage.length)], 0, 0);
    }
    
    //Canvasに描画させる画像（鼻）をランダムで描画させる関数
    function middleDraw(){
        middleCanvas.drawImage(middleImage[Math.floor(Math.random() * middleImage.length)], 0, 0);
    }
    
    //Canvasに描画させる画像（口）をランダムで描画させる関数
    function bottomDraw(){
        bottomCanvas.drawImage(bottomImage[Math.floor(Math.random() * bottomImage.length)], 0, 0);
    }
        
    //以下、ボタンがクリックされた時のイベント　※スタートボタンを連続で押すとストップしないため改善する必要あり
    $(document).on('click','#start',function() {
       topStop = setInterval(topDraw, 80);
       middleStop = setInterval(middleDraw, 80);
       bottomStop = setInterval(bottomDraw, 80);
    });
    $(document).on('click','#top_stop',function() {
        //console.log("クリックされた01");
        clearInterval(topStop);
    });
    $(document).on('click','#middle_stop',function() {
        //console.log("クリックされた02");
        clearInterval(middleStop);
    });
    $(document).on('click','#bottom_stop',function() {
        //console.log("クリックされた03");
        clearInterval(bottomStop);
    });
    
    //画像をランダムで描画させる TODO::できない 
    topDraw();
    middleDraw();
    bottomDraw();
    // topCanvas.drawImage(topImage[Math.floor(Math.random() * topImage.length)], 0, 0);
    // middleCanvas.drawImage(middleImage[Math.floor(Math.random() * middleImage.length)], 0, 0);
    // bottomCanvas.drawImage(bottomImage[Math.floor(Math.random() * bottomImage.length)], 0, 0);
}
