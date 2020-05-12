
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var myGUI
var fillLight, lightLinks, lightRechts, shadowGenerator
var camera;
var CurrentSelection


/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    scene.enablePhysics();
    scene.gravity = new BABYLON.Vector3(0, -0.01, 0);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)
    SetupCameras(scene)    

    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-60, -41, -90), scene);
    lightLinks.position = new BABYLON.Vector3(1, 1, 0);
    lightLinks.intensity = 2

    lightRechts = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(120, -41, -90), scene);
    lightRechts.position = new BABYLON.Vector3(-1, 1, 0);
    lightRechts.intensity = 2

    // Sky material
    var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.cameraOffset.y = 50;
    skyboxMaterial.luminance = 0.05;
    //skyboxMaterial._cachedDefines.FOG = true;

    // Sky mesh (box)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;

    //var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75, camera);
    PostEffects(scene);

    var count = 0;
    scene.onPointerUp = function () {

        if (count == 0) {
            mainScreenVid.video.play();
        }
        count++;
        //debugLabel.innerHTML = "number of pointer ups " + count;
}
    return scene;
};
/******* End of the create scene function ******/

var scene;
var videoLoaded = false;
var renderLoopEnabled = false;

function run() {
    scene = createScene(); //Call the createScene function
    //scene.debugLayer.show();
    
    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        if (renderLoopEnabled) {
            scene.render();
            TriggerLoopAnimations()
            var fpsLabel = document.getElementById("fpsLabel");
            fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
        }
    });    
}

var vids = document.getElementsByClassName("scene-vid");
var currentVid =0;

function loadLoop(){
    console.log(currentVid)
    if(currentVid==5){
        run();
        return;
    }
    vids[currentVid].load();
    videoLoaded = false;
    vids[currentVid].addEventListener("canplaythrough", function() {
        if (!videoLoaded) {
            videoLoaded = true;
            console.log("video: " + currentVid + " can play through.");
            document.getElementsByClassName("scene-vid")[currentVid].play();
            renderLoopEnabled = true;
            currentVid += 1;
            loadLoop()
        }
    });
}

//thomas function working
function loadVideo() {
    console.log("Loading video.");
    var vid = document.getElementsByClassName("scene-vid");
    vid[0].load();
    vid[0].addEventListener("canplaythrough", function() {
        if (!videoLoaded) {
            videoLoaded = true;
            console.log("Can play through.");
            document.getElementsByClassName("scene-vid")[0].play();
            renderLoopEnabled = true;
            run();
        }
    });
}

/*window.addEventListener("click", function() {
    if (!videoLoaded) {
        videoLoaded = true;
        loadVideo();
    }
});*/

loadVideo();


// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

/*
TO DO:
make classes of interactables
make a funciton that saves all meshes that need to be manipulated some way

*/