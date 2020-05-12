var lightAnimController
var SceneStarted = false;

function SetScene() {

    console.log("finish loading")
    ChangeMaterialProperties();
    CreateCustomMaterials();
    ChangeMeshesMaterials();
    AddGlow();
    SpawnHotspots();
    CreateRaycast(scene);//after colliders are added to hotspots
    //CreateInfoBox();
    SceneStarted = true;
    BufferStartAnimation()
    BufferButtonAnimation()

}
var lastSelected = ""
function openInfoUI(selec){
    walkerSelection = ""
    if(selec != null){
        openInfoContent()
    }
    
    //handle infobox
    switch(selec){
        case "1":
            document.getElementById("project-chatbot").style.display = "block";
            lastSelected = document.getElementById("project-chatbot")
            break;
        case "2":
            document.getElementById("project-ssi-schaefer").style.display = "block";
            lastSelected = document.getElementById("project-ssi-schaefer")
            break;
        case "3":
            document.getElementById("project-ssi-schaefer").style.display = "block";
            lastSelected = document.getElementById("project-ssi-schaefer");
            break;
        case "4":
            document.getElementById("project-varycon").style.display = "block";
            lastSelected = document.getElementById("project-varycon")
            break;
        case "5":
            document.getElementById("project-bayer-ag").style.display = "block";
            lastSelected = document.getElementById("project-bayer-ag")
            break;
        case "6":
            document.getElementById("project-deutsche-telekom").style.display = "block";
            lastSelected = document.getElementById("project-deutsche-telekom")
            break;
        case "7":
            document.getElementById("project-bombardier").style.display = "block";
            lastSelected = document.getElementById("project-bombardier")
            break;
            
    }

}

//animate closing, stop & close video
$('div, .x-icon').click(function(e) {
    var theClass = this.className;  // "this" is the element clicked
    //alert( theClass );
    e.preventDefault();
    e.stopPropagation();
    if(theClass == "project-overlay" || theClass == "x-icon open"){
        console.log("hello overlay, close!")
        closeInfoContent();
        $('.x-icon').removeClass('open');
        //handle vidweo playing
        console.log(lastSelected.querySelector("iframe"))
        if(lastSelected.querySelector("iframe")){
            lastSelected.querySelector("iframe").src = lastSelected.querySelector("iframe").src
        }

        //animate opacity and disable cointent
        window.setTimeout(()=>{
            lastSelected.style.display = "none"
            $('.bg-overlay').removeClass('open')
        },250)
        if(scene.activeCamera == walkerCam){
            //lockdownpointer
            canvas.requestPointerLock()
            document.getElementById("renderCanvas").focus();
        }
    }
});


/*
$('.project-overlay').on('click', function(e){
    e.preventDefault();
    click++;
    console.log("hello overlay, close!")
    console.log(click)
    lastSelected.getElementsByClassName("film-values")[0].pause()
    lastSelected.getElementsByClassName("film-values")[0].load()
    lastSelected.style.display = "none"


  });*/
//old stuff
function SpawnInfobox(mesh, cam) {
    //console.log("hast collider tag?")
    //console.log(BABYLON.Tags.MatchesQuery(mesh, "hs_coll"))
    //console.log(p);
    var pos = mesh.getAbsolutePosition();

    if (BABYLON.Tags.MatchesQuery(mesh, "hs_coll")) {
        if (mesh.name == "HS Collider 6" || mesh.name == "HS Collider 7") {
            //play_video();
            handleIBox(true);
        }
        else {
            handleIBox(false);
        }

        LookAt_Y(pos, cam);
        TravelRotateCamTo(mesh);
        show_backbutton();
 
        //IBox_P.position = new BABYLON.Vector3(pos.x , pos.y + 0.2, pos.z)
        //IS object on the left or right?
              

        var p  = WorldPosToScreenPos(pos, cam);
        if (p.x > 0.5) {
            //console.log("right");
            IBox_P.position = new BABYLON.Vector3(pos.x + 0.25, pos.y + 0.1, pos.z)
        }
        else {
            //console.log("left")
            IBox_P.position = new BABYLON.Vector3(pos.x - 0.25, pos.y + 0.1, pos.z)
        }
            
    }

    if(BABYLON.Tags.MatchesQuery(mesh, "vid_coll")){
        play_video();
    }

}

function LookAt_Y(pos, cam) {
    lookValue = pos.subtract(cam.position);
    IBox_P.rotation.y = -Math.atan2(lookValue.z, lookValue.x) - Math.PI / 2;
}

function WorldPosToScreenPos(pos, cam) {

    //calculate world to screen position of selected mesh
    var p = BABYLON.Vector3.Project(pos, BABYLON.Matrix.Identity(), scene.getTransformMatrix(), cam.viewport.toGlobal(engine.getRenderWidth(true), engine.getRenderHeight(true))).normalize();
    return p;
}

var IBox, IBox_P, videoCollider;

function handleIBox(hasVideo) {
    // other params to text, pos, scl
    if (hasVideo) {
        console.log("video change")
        IBox.scaling = new BABYLON.Vector3(0.383, 0.793, 1)
        iMat.emissiveTexture = iMatTextVideo;
        iMat.opacityTexture = iMatTextVideo;
        videoCollider.isPickable = true;
    }
    else {
        console.log("to normaltext change")
        IBox.scaling = new BABYLON.Vector3(0.383, 0.608, 1)
        iMat.emissiveTexture = iMatText;
        iMat.opacityTexture = iMatText;
        videoCollider.isPickable = false;
    }
}

function CreateInfoBox() {
    //create infobox
    //var IBox_P = new BABYLON.TransformNode("")
    //IBox = new BABYLON.MeshBuilder.CreatePlane("info plane ", { height: .608, width: .383, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene)
    IBox_P = new BABYLON.TransformNode("infoBox_P")
    IBox = new BABYLON.MeshBuilder.CreatePlane("infoBox", { height: 1, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene)
    IBox_P.position.y = -10;
    IBox.material = iMat;
    IBox.isPickable = false;
    IBox.parent = IBox_P;

    //create video collider
    videoCollider = new BABYLON.MeshBuilder.CreateBox("videoCollider", { height: .15, width: .15, depth: .05 }, scene)
    videoCollider.position.y = 0.3
    videoCollider.material = colMat
    videoCollider.parent = IBox_P;
    videoCollider.isPickable = true;
    BABYLON.Tags.AddTagsTo(videoCollider, "vid_coll");
}

