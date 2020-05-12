var tween = gsap.timeline();
var startTween = gsap.timeline();
var startCamTween = gsap.timeline();
var infoReveal = gsap.timeline();
var uiTween = gsap.timeline()
var buttonTween = gsap.timeline();
let origin = new BABYLON.Vector3(0, 0.26, 0);

let pulseAnimRate = 1;
let pulseAnimVector = new BABYLON.Vector3(1,1,1);


//rotate camera animations
function TravelRotateCamTo(CurrentSelection) {

    let selec = parseInt(CurrentSelection) - 1
    let meshTo = InfoColliders[selec];
    let v0 = new BABYLON.Vector3(0, 0.1, 0);
    let v1 = meshTo.getAbsolutePosition().subtract(v0);

    v1.normalize();
    let angleAlpha = Math.atan2(v1.z, v1.x)
    let angleBeta = 100;
 
    let angleInDegree = BABYLON.Tools.ToDegrees(angleAlpha) +180
    console.log("angle is " + angleInDegree)
    
    //change values per selection
    switch(CurrentSelection){
        case "1":
            camera.setTarget(origin)
            tween.to(camera, { alpha: 90 * (Math.PI / 180), beta: 95 * (Math.PI / 180),  radius: 1.5, duration: 1} )
            break;
        case "2":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 10) * (Math.PI / 180),  radius: 0.005, duration: 1} )
            break;
        case "3":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 5) * (Math.PI / 180),  radius: 0.1, duration: 1} )
            break;
        case "4":
            //varycon
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 3.5) * (Math.PI / 180),  radius: 0.1, duration: 1} )
            break;
        case "5":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 5)* (Math.PI / 180),  radius: 0.07, duration: 1} )
            break;
        case "6":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: (angleBeta - 10) * (Math.PI / 180),  radius: 0.005, duration: 1} )
            break;
        case "7":
            camera.setTarget(origin)
            tween.to(camera, { alpha: angleAlpha + Math.PI, beta: angleBeta * (Math.PI / 180),  radius: 0.7, duration: 1} )
            break;
            
    }
}

function TravelRotateCamBack(){
    camera.setTarget(origin)
    tween.to(camera, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180),  radius: 2.8, duration: 1} )
}

//custom animations
function TriggerLoopAnimations() {

    if (SceneStarted) {
        hsHolder.forEach(elem => {
            elem.rotation.y += 0.005;
            
        });
        arrowGlowTex.uOffset += 0.01;
        if(arrowGlowTex.uOffset > 0.5){
            arrowGlowTex.uOffset = -0.5
        }
        pulseAnimRate +=0.01
        //scene.getMaterialByName("iconMatGlass").alpha = -pulseAnimRate + 1.4
        pulseAnimVector = new BABYLON.Vector3(pulseAnimRate, pulseAnimRate, pulseAnimRate);
        if(pulseAnimRate>1){
            pulseAnimRate=0.65;
        }
    }

}
var rate =0;
function animateBoden(){
    let startColor = new BABYLON.Color3.FromHexString("#00000")
    let endColor = new BABYLON.Color3.FromHexString("#0c83e2")

    if (SceneStarted && rate < 1) {
        scene.getMaterialByName("light_logo").emissiveColor = new BABYLON.Color3.Lerp(startColor, endColor, rate)
        rate += 0.05

    }
}

function BufferStartAnimation(){
    RevealInfopoints(false);
    scene.getTransformNodeByName("logo holder").setEnabled(false)
    scene.getTransformNodeByName("Welcome").rotationQuaternion = null
    scene.getTransformNodeByName("Welcome").scaling = new BABYLON.Vector3(0,0,0)
    startTween.set(camera, {alpha: 0*(Math.PI/180), beta: 180*(Math.PI/180)});
    startTween.from(camera, {radius:2.5, duration: 3})
    startTween.fromTo(camera, { alpha: 0 * (Math.PI / 180), beta: 180 * (Math.PI / 180) }, { alpha: 90 * (Math.PI / 180), beta: 82 * (Math.PI / 180), duration: 2, ease: "power3.inOut" }, ">-2"); //1 second before end of last timeline

    let offsetLogos = 2.5;
    let rot = new BABYLON.Quaternion(0, 1.5, 0, 1)
    for(var i = 0; i <= 6; i++){
        let offString = offsetLogos.toString();
        ArrowsHolder[i].rotationQuaternion = null // should allow to animate "rotation"
        startTween.from(ArrowsHolder[i].scaling, {y:0, duration:2, ease: "elastic"}, offsetLogos);
        startTween.from(ArrowsHolder[i].rotation, {y:  -180 * (Math.PI / 180), duration: 2, ease: "elastic"},"<" );
        startTween.from(LogosHolder[i].scaling, {y:0, duration:2, ease: "elastic"}, "<0.1")
        startTween.from(LogosHolder[i].position, {y:  LogosHolder[i].position.y-50, duration: 0.5, ease: "back"},"<" );
;
    offsetLogos += 0.1
    }
    
    startTween.fromTo(scene.getTransformNodeByName("Welcome").rotation, {x: 180 * (Math.PI / 180)}, {x:  90 * (Math.PI / 180), duration: 2, ease: "elastic"},">" );
    startTween.set(scene.getTransformNodeByName("Welcome").scaling, {x: 0.528, y: 0.804, z: 0.804},"<" );
    startTween.from(scene.getTransformNodeByName("Logo Welcome").scaling, {y: 0, duration: 0.5, ease: "back"},">0.5" );


}


function openInfoContent(){
    $('.bg-overlay').addClass('open');
    uiTween.fromTo(".project-overlay", {left: -1200, opacity: 0},{left: 0, opacity: 1, duration: 0.5, delay: 0.25})
}

function closeInfoContent(){
    uiTween.fromTo(".project-overlay", {left: 0, opacity: 1}, {left: -1200, opacity: 0, duration: 0.5})

}

function RevealInfopoints(state, selec){
    //if true show, else hide
    //To do: start animating by index of selected, only animate in when first time
    if(state){
        //alert(hsHolder[selec])
        if(selec == null){
            selec=0;
        }

        infoReveal.fromTo(hsHolder[selec].scaling, {x:0, y:0, z: 0}, {x: 1, y:1, z:1, delay: 1, duration:0.3, ease:"back"})
        for(var i = 0; i < hsHolder.length; i++){
            if( i == selec)
                continue;
            else{
                //console.log(i)
                infoReveal.fromTo(hsHolder[i].scaling, {x:0, y:0, z: 0}, {x: 1, y:1, z:1, duration:0.3, ease:"back"},">-0.25")
            }

        }
    }

    else{
        infoReveal.clear();
        hsHolder.forEach(hs => {
            infoReveal.fromTo(hs.scaling, {x: 1, y:1, z: 1}, {x: 0, y:0, z:0, duration:0.3, ease:"back.inOut(4)"},">-0.25");
        })
    
    }
}

function BufferButtonAnimation(){
    b_winkel.rotationQuaternion = null;
    buttonTween.from(b_stehle.scaling, {x:1, y:0, z:1, ease: "back.out(2)", duration: 1});
    buttonTween.from(b_winkel.scaling, {x:0, y:0, z:0, ease: "back.out(4)", duration: 0.75}, "<0.15");
    buttonTween.fromTo(b_winkel.rotation, {x:0}, {x: 15* (Math.PI / 180), ease: "back", duration:0.5}, ">-0.2" );
    buttonTween.from(b_press.position, {x:0, duration: 0.5}, ">-0.5")
    buttonTween.from(b_press.scaling, {x:0, y: 0, z: 0, duration: 0.1}, "<0.2")
    buttonTween.pause();
}

