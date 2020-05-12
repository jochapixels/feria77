showDebug = true;

$(document).keyup(function (e) {
    //"m" pressed
    if (e.keyCode === 77) { handleDebugLayer(); }
});

function handleDebugLayer() {
    console.log("d pressed")
    showDebug =!showDebug;
    if (showDebug) {

        scene.debugLayer.show();
    }
    else {

        scene.debugLayer.hide();
    }
}