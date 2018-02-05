function saveImage() {
        var myCanvas = $('#fukuCanvas').get(0);
        var url = myCanvas.toDataURL("image/png");
        var base64data = url.split(',')[1];
        var array = b64utils.decode( base64data );
            
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {  
            fs.root.getFile("myimage.png" , {create:true, exclusive:false}, 
              function(entry) {
                entry.createWriter( 
                  function(writer) {
 
                    var cb = function() {
                      console.log("保存終了"); 
                      alert("保存完了");
                    }
 
                    writer.onwrite = cb;
                    writer.onerror = function() { console.log("write error"); }
                    writer.write( array );
 
                  } ,
                  function() {
                    console.log("create write error");
                  }
                );
              } ,
              function(){ }
            );
          }, function() { });
        }

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        //window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, onFileSystemFail);
    }
    function onFileSystemSuccess(fileSystem) {
        var directoryEntry = fileSystem.root;
        var directoryReader = directoryEntry.createReader();
        directoryReader.readEntries(getFileName, fail);
    }
    function onFileSystemFail(error) {
        console.log("error: " + error.code);
    }

    function getFileName(fileEntries) {
        for (var index = 0; index < fileEntries.length; index++) {
            console.log(fileEntries[index].toURL())
        }
    }
    function fail(error) {
        console.log("error: " + error.code);
    }
