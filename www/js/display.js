function loadImage() {
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {   
            fs.root.getFile("myimage.png" , null, 
              function(entry) {
                entry.file( 
                  function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function(evt) {
 
                      var array = new Uint8Array(evt.target.result);
                      var base64data = b64utils.encode(array);
 
                      var img = new Image();
                      img.src = "data:image/png;base64," + base64data;
                      img.onload = function() {
                        var canvas = $('#fukuCanvas');
                        var myCanvas = canvas.get(0);
                        var myContext = myCanvas.getContext('2d');
                        myContext.clearRect(0,0,400,450);
                        myContext.drawImage( img , 0, 0 );
                      }
 
                    };
                    reader.readAsArrayBuffer(file);
                  } ,
                  function() {
                    console.log("create write error");
                  }
                );
              } ,
              function(){ }
            );
          } , function() {  } );            
        }