var walkerCam, InfoColliders, arrowColliders, pointerMesh, pointerFake, isLocked
let  collideButonNum =0
let overButton = false;
var walkerSelection;
function SetupCameras(scene) {
    //collect infocolliders

    CreateRotateCam(scene)
    CreateWalkerCam(scene)


    //Controls...Mouse
    //We start without being locked.
    isLocked = false;

    // On click event, request pointer lock
    scene.onPointerDown = function (evt) {
        //console.log("isLocked ? " + isLocked)
        if (scene.activeCamera == walkerCam) {
            console.log("click while walker cam")
            checkInfoHit();
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }
        }

        else if (scene.activeCamera == camera) {
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return (BABYLON.Tags.MatchesQuery(mesh, "arrow_coll") || BABYLON.Tags.MatchesQuery(mesh, "hs_coll")) && mesh.isPickable; });
            if (pickInfo && pickInfo.pickedMesh && BABYLON.Tags.MatchesQuery(pickInfo.pickedMesh, "arrow_coll")) {
                console.log(pickInfo.pickedMesh.name);
                CurrentSelection = pickInfo.pickedMesh.name.split('Arrow Collider ')[1];
                console.log(CurrentSelection)
                TravelRotateCamTo(CurrentSelection);//send corresponding infobox to travel to
                show_backbutton();
                RevealInfopoints(true, parseInt(CurrentSelection) - 1)
                //after time show all info buttons
            }
            else if (pickInfo && pickInfo.pickedMesh && BABYLON.Tags.MatchesQuery(pickInfo.pickedMesh, "hs_coll")) {
                console.log(pickInfo.pickedMesh.name);
                CurrentSelection = pickInfo.pickedMesh.name.split('hs Collider ')[1];
                openInfoUI(CurrentSelection)
                $('.x-icon').addClass('open');
            }
        }


    };



    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;

        // If the user is already locked
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            isLocked = false;
        } else {
            //camera.attachControl(canvas);
            isLocked = true;
        }
    };

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    CreateWalkerColliders();
}

function CreateWalkerColliders() {
    //Bounding box Geometry
    var ground = BABYLON.Mesh.CreateBox("ground", 1, scene);
    ground.scaling = new BABYLON.Vector3(10, 0.1, 10);
    ground.position.y = -0.04;
    ground.checkCollisions = true;
    ground.isVisible = false;

    var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
    border0.scaling = new BABYLON.Vector3(0.1, 1, 5);
    border0.position.x = 1.2;
    border0.position.z = 1.2;
    border0.position.y = 0.5
    border0.checkCollisions = true;
    border0.isVisible = false;

    var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
    border1.scaling = new BABYLON.Vector3(0.1, 1, 5);
    border1.position.x = -1.2;
    border1.position.y = 0.5;
    border1.position.z = 1.2;
    border1.checkCollisions = true;
    border1.isVisible = false;

    var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
    border2.scaling = new BABYLON.Vector3(2.5, 1, 0.1);
    border2.position.z = -1.2;
    border2.position.y = 0.5;
    border2.checkCollisions = true;
    border2.isVisible = false;


    var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
    border3.scaling = new BABYLON.Vector3(2.5, 1, 0.1);
    border3.position.z = 3;
    border3.position.y = 0.5;
    border3.checkCollisions = true;
    border3.isVisible = false;

    var standColl = BABYLON.Mesh.CreateBox("standColl", 1, scene);
    standColl.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    standColl.position = new BABYLON.Vector3(0.9, 0.2, 1.52)
    standColl.checkCollisions = true;
    standColl.isVisible = false;

}

function CreateWalkerCam(scene) {
    // Parameters : name, position, scene
    walkerCam = new BABYLON.UniversalCamera("walkerCam", new BABYLON.Vector3(0, 0.2, 2.5), scene);

    // Targets the camera to a particular position. In this case the scene origin
    walkerCam.setTarget(BABYLON.Vector3.Zero());
    walkerCam.angularSensibility = 4000

    // Attach the camera to the canvas
    walkerCam.applyGravity = true;
    walkerCam.ellipsoid = new BABYLON.Vector3(0.02, 0.1, 0.05);
    walkerCam.checkCollisions = true;
    walkerCam.minZ = 0.05

    //Controls  WASD
    walkerCam.keysUp.push(87);
    walkerCam.keysDown.push(83);
    walkerCam.keysRight.push(68);
    walkerCam.keysLeft.push(65);
    walkerCam.speed = 0.025

    //scene.activeCamera = walkerCam
    walkerCam.attachControl(canvas, true);
    //scene.activeCamera = walkerCam

    walkerCam.onCollide = function (mesh) {
        if (mesh.name == "standColl") { //we can check if mesh is in pushable collection later
            console.log("hitttt")
            buttonTween.play()
            collideButonNum++
        }
    };

}

function CreateRotateCam(scene) {
    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", 90 * (Math.PI / 180), 82 * (Math.PI / 180), 2.8, new BABYLON.Vector3(0, 0.1, 0), scene);
    camera.minZ = 0.1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 0
    camera.upperRadiusLimit = 4
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 100
    camera.attachControl(canvas, true, true, false);

}
//Jump
function jump(rate) {
    walkerCam.cameraDirection.y = rate;
}

function checkInfoHit() {
    //info points check
    if (walkerSelection != "") {

        var walkerSelectionNum = walkerSelection.split('hs Collider ')[1];
        openInfoUI(walkerSelectionNum)
        $('.x-icon').addClass('open');
        document.exitPointerLock()
    }
    else {
        console.log("no infopoint was hit")
    }

    //buttoncheck
    if(overButton){
        console.log("button pressed");
        buttonTween.from(b_button.scaling, {x:1, y:0.5, z:1, ease: "power2.out", duration: 1});
        defaultPipeline.chromaticAberrationEnabled =! defaultPipeline.chromaticAberrationEnabled;
        defaultPipeline.chromaticAberration.aberrationAmount = 50
        defaultPipeline.grainEnabled =! defaultPipeline.grainEnabled;
        defaultPipeline.grain.animated =! defaultPipeline.grain.animated
    }
}

function CreateRaycast(scene) {
    InfoColliders = scene.getMeshesByTags("hs_coll")
    //console.log(InfoColliders)

    pointerFake = BABYLON.MeshBuilder.CreateSphere('pointerFake', { diameter: .00075 }, scene);
    pointerFake.parent = walkerCam
    pointerFake.position.z = 0.06;

    var ray = new BABYLON.Ray();
    var rayHelper = new BABYLON.RayHelper(ray);

    var localMeshDirection = new BABYLON.Vector3(0, 0, 1);
    var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
    var length = 2;

    rayHelper.attachToMesh(walkerCam, localMeshDirection, localMeshOrigin, length);

    //rayHelper.show(scene, new BABYLON.Color3(1,0,0));

    pointerMesh = BABYLON.MeshBuilder.CreateSphere('', { diameter: .03 }, scene);
    pointerMat = new BABYLON.PBRMaterial("pointerMat", scene);
    pointerMat.unlit = true
    pointerMat.albedoColor = new BABYLON.Color3.FromHexString("#ea1e1e")
    pointerMat.emissiveColor = new BABYLON.Color3.FromHexString("#ea1e1e")
    pointerMesh.material = pointerMat
    pointerFake.material = pointerMat
    pointerMesh.setEnabled(false);


    scene.registerBeforeRender(function () {

        var hitInfo = ray.intersectsMeshes(InfoColliders, true);
        if (scene.activeCamera == walkerCam) {
            if (hitInfo.length) {
                console.log(hitInfo[0].pickedMesh.name);
                walkerSelection = hitInfo[0].pickedMesh.name;
                hitInfo[0].pickedMesh.parent.getChildMeshes()[2].scaling = pulseAnimVector
                //pointerMesh.setEnabled(true);
                //pointerFake.setEnabled(false)
                pointerMesh.position.copyFrom(hitInfo[0].pickedPoint);
                pointerMat.emissiveColor = new BABYLON.Color3(1, 1, 1)

            } else {
                walkerSelection = "";
                //console.log("hitting nothing");
                //pointerMesh.setEnabled(false);
                pointerFake.setEnabled(true)
                pointerMat.emissiveColor = new BABYLON.Color3.FromHexString("#ea1e1e")
            }

        }
        var buttonHit = ray.intersectsMesh(b_button, true);
        if(scene.activeCamera == walkerCam){
            if (buttonHit.hit) {
                overButton = true
                console.log(buttonHit.pickedMesh.name);
            }
            else{
                overButton = false;
            } 
        }

    });
}

function HandleViewProperties() {
    if (scene.activeCamera == camera) {
        //reset view
        TravelRotateCamBack()
        RevealInfopoints(false)
        //enable back button
        //hide raycsting spheres
        //pointerMesh.setEnabled(false);
        pointerFake.setEnabled(false)
        //unlock mouse: document.exitPointerLock()
        document.exitPointerLock()
        //pulse animations reset
        pulseHolder.forEach(elem => {
            console.log(elem)
            elem.scaling = new BABYLON.Vector3(1, 1, 1)
        })

    }
    else if (scene.activeCamera == walkerCam) {
        //reset view
        RevealInfopoints(true, null)
        //unable backbutton
        if ($('.back-zoom').attr('class') == "back-zoom open") {
            $('.back-zoom').removeClass('open')
        }
        //alert($('.back-zoom').attr('class'))
        //lockmouse
        canvas.requestPointerLock();
    }
}