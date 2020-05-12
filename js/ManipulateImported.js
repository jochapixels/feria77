let hsHolder = []
let pulseHolder = [];
let LogosHolder = []
let ArrowsHolder = []
let overStation
let b_All, b_stand, b_press, b_winkel, b_stehle, b_button;

var ground

function AddGlow(){
        // Add lights to the scene
        var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
        gl.intensity = 0.7;
        scene.meshes.forEach(elem => {
            if(elem.name.startsWith("Screen_") || elem.name =="Video_Screens"){
                gl.addExcludedMesh(elem)
            }
        });

}

function SpawnHotspots(){
    let hsCounter = 0;
    let arrowCounter = 0;
    let Hs_Clones = []

    //TO DO: ALL LOOPS IN ONE
    scene.meshes.forEach(elem => {
        //make all unpickable
        elem.isPickable = false; 

        if(elem.name.startsWith("ref_Hotspot_")){
            //elem.setEnabled(false)
            elem.visibility = 0;
            hsCounter ++;
            //create icon
            var clone = HSIconTask.loadedMeshes[0].instantiateHierarchy(elem, undefined, (source, clone) => {
                //clone.position = elem.position;
                clone.scaling = new BABYLON.Vector3(1, 1, 1);
            })
            //clone.position = elem.position;
            clone.rotation = BABYLON.Quaternion.FromEulerAngles(0, Math.random() * 2 * Math.PI, 0);
            clone.name = "HS Clone " + hsCounter

            hsColl = new BABYLON.MeshBuilder.CreateBox("hs Collider " + hsCounter, { height: 40, width: 40, depth: 10 }, scene)
            hsColl.material = colMat
            hsColl.parent = clone;
            hsColl.isPickable = true;
            //AllowMouseOverMesh(hsColl)
            BABYLON.Tags.EnableFor(hsColl)
            BABYLON.Tags.AddTagsTo(hsColl, "hs_coll");
            hsHolder.push(clone);
            //console.log(elem.getChildMeshes(false)[3])
            pulseHolder.push(elem.getChildMeshes(false)[3])
        }
        else if(elem.name.startsWith("Arrow_")){
            arrowCounter++;
            //create Colliders
            elem.visibility = false;
            ArrowsHolder.push(elem.parent)
            FeedWithLogo(elem.name.split("_")[1], elem)
            
            arrowColl = new BABYLON.MeshBuilder.CreateBox("Arrow Collider " + arrowCounter, { height: 80, width: 80, depth: 10 }, scene)
            arrowColl.material = colMat
            arrowColl.parent = elem;
            arrowColl.position.y =20
            arrowColl.isPickable = true;
            AllowMouseOverMesh(arrowColl)
            BABYLON.Tags.EnableFor(arrowColl)
            BABYLON.Tags.AddTagsTo(arrowColl, "arrow_coll");
            
        }
        else if(elem.name.startsWith("ref_Anchor_")){
            elem.visibility = false;
        }
        else if(elem.name == "stehle"){
            //console.log(elem.parent)
            b_All = elem.parent;

            b_stand = elem.parent.getChildMeshes()[0];
            b_press = elem.parent.getChildMeshes()[1];
            b_winkel = elem.parent.getChildTransformNodes(true)[2]
            b_button = b_winkel.getChildMeshes()[0]
            b_button.isPickable = true
            console.log(b_winkel)
            b_stehle = elem;
            b_All.setEnabled(false)
            b_stand.visibility = false;
            b_press.visibility = false;
            b_stehle.visibility = false;
            b_winkel.setEnabled(false);
        }
    });

}

function AllowMouseOverMesh(mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
	
	//ON MOUSE ENTER
	mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){	
        //mesh.material.emissiveColor = BABYLON.Color3.Blue();
        overStation = mesh.name.split('Arrow Collider ')[1];
        overStation = "arrow border " + overStation
        //console.log("mouse over " +  overStation)
        scene.getMeshByName(overStation).material = arrowMatOn
	}));
	
	//ON MOUSE EXIT
	mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
        //mesh.material.emissiveColor = BABYLON.Color3.Black();
        scene.getMeshByName(overStation).material = arrowMatOff
        overStation = undefined;
	}));
}

function FeedWithLogo(name, parent){
    //console.log(LogosLoaderTask.loadedMeshes[0])
    switch(name){
        case "1":
            //console.log("contact station");
            PositionLogo()
            break;
        case "2":
            //console.log("linde station");
            PositionLogo()
            break;
        case "3":
            //console.log("ar station")
            PositionLogo()
            break;
        case "4":
            //console.log("varycon station");
            PositionLogo()
            break;
        case "5":
            //console.log("vr station");
            PositionLogo()
            break;
        case "6":
            //console.log("telekom staion");
            PositionLogo()
            break;
        case "7":
            //console.log("bombardier station");
            PositionLogo()
            break;
    }

    function PositionLogo(num) {
        var logoMesh = LogosLoaderTask.loadedMeshes[0].getChildMeshes()[0]
        logoMesh.parent = parent.parent.parent
        logoMesh.position = new BABYLON.Vector3(parent.parent.position.x, parent.parent.position.y + 55, parent.parent.position.z)
        //holder for start animation
        LogosHolder.push(logoMesh);
    }
}