var arrowGlowTex, arrowMatOff, arrowMatOn
var iconGlassOn, iconGlassOff

function ChangeMaterialProperties() {

    var redBay =new BABYLON.Color3.FromHexString("#ea1e1e");
    var blueBay =new BABYLON.Color3.FromHexString("#063c9d");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    scene.getMaterialByName("logo_schwarz").metallic = 0.75
    scene.getMaterialByName("logo_schwarz").roughness = 0.1

    scene.getMaterialByName("grau").metallic = 0.3
    scene.getMaterialByName("grau").roughness = 0.3

    scene.getMaterialByName("weiss").metallic = 0.1
    scene.getMaterialByName("weiss").roughness = 0.1

    scene.getMaterialByName("DarkWood").metallic = 0
    scene.getMaterialByName("DarkWood").roughness = 0.1

    scene.getMaterialByName("leder_schwarz").metallic = 0
    scene.getMaterialByName("leder_schwarz").roughness = 0.75
    scene.getMaterialByName("leder_schwarz").bumpTexture.level = 0.1

    scene.getMaterialByName("leder_weiss").metallic = 0
    scene.getMaterialByName("leder_weiss").roughness = 0.75
    scene.getMaterialByName("leder_weiss").bumpTexture.level = 0.1
    

    scene.getMaterialByName("Metal").albedoColor = darkGrayBay
    scene.getMaterialByName("Metal").metallic = 1
    scene.getMaterialByName("Metal").roughness = 0.5

    scene.getMaterialByName("screenVert").metallic = 0.75
    scene.getMaterialByName("screenVert").roughness = 0
    scene.getMaterialByName("screenHor").metallic = 0.75
    scene.getMaterialByName("screenHor").roughness = 0
    scene.getMaterialByName("screenMain").metallic = 0.75
    scene.getMaterialByName("screenMain").roughness = 0

    scene.getMaterialByName("varyconMat").metallic = 0.4
    scene.getMaterialByName("varyconMat").roughness = 0

    //icons
    scene.getMaterialByName("iconMatGlass").alpha = 0.75
    scene.getMaterialByName("iconMatWhite").metallic = 1
    scene.getMaterialByName("iconMatWhite").roughness = 1
    scene.getMaterialByName("iconMatRed").metallic = 1
    scene.getMaterialByName("iconMatRed").roughness = 1

    arrowGlowTex = new BABYLON.Texture("./assets/arrow_glow.jpg", scene, true, false)
    arrowGlowTex.wrapU = 1
    arrowGlowTex.uOffset = 0.0
    arrowGlowTex.level = 2

    scene.getMaterialByName("recordbayMAt").albedoColor = blueBay
    arrowMatOff = new BABYLON.PBRMaterial("arrowMatOff", scene)
    arrowMatOff.albedoColor = blueBay
    arrowMatOff.metallic = 0.2
    arrowMatOff.roughness = 0.5

    arrowMatOn = new BABYLON.PBRMaterial("arrowMatOn", scene)
    arrowMatOn.albedoColor = blueBay
    arrowMatOn.emissiveColor = blueBay
    arrowMatOn.emissiveTexture = arrowGlowTex
    arrowMatOn.metallic = 0.2
    arrowMatOn.roughness = 0.5

    iconGlassOn = new BABYLON.PBRMaterial("iconGlassOn", scene)
    iconGlassOn.albedoColor = redBay;
    iconGlassOn.metallic = 0
    iconGlassOn. roughness = 0.5
    iconGlassOn.transparencyMode = 2
    iconGlassOn.alpha = 0.85

    iconGlassOff = new BABYLON.PBRMaterial("iconGlassOff", scene)
    iconGlassOff.albedoColor = redBay;
    iconGlassOff.metallic = 0
    iconGlassOff. roughness = 0.5
    iconGlassOff.transparencyMode = 2
    iconGlassOff.alpha = 0.85


    /*
    var screenTex = new BABYLON.Texture("./assets/ascree.jpg", scene, true, false)
    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 254, scene);

    */

    //handle All at once
    scene.materials.forEach(mat => {
        //add reflections
        mat.reflectionTexture = hdrTexture;
    });
    
}

var iMat, iMatTextVideo, iMatText, mainScreenMat, mainScreenVid, videoMat
var colMat
var screenVideo, htmlVideo;
function CreateCustomMaterials(){
    //Infoboxes materials
    iMat = new BABYLON.StandardMaterial("iBoxMat", scene);
    iMat.disableLighting = true;

    iMatText = new BABYLON.Texture("./assets/Infobox.png", scene, true, true);
    iMatTextVideo = new BABYLON.Texture("./assets/Infobox_Video.png", scene, true, true);
    iMatText.uScale = -1;
    iMatTextVideo.uScale = -1;
    iMat.emissiveTexture = iMatTextVideo;
    iMat.opacityTexture = iMatTextVideo;

    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = false
    colMat.alpha = 0

    mainScreenMat = new BABYLON.PBRMaterial("textVid", scene);
    mainScreenVid = new BABYLON.VideoTexture("video", vids[0], scene,false,false, {poster:"./assets/sky2.png"});
    mainScreenMat.emissiveTexture = mainScreenVid
    mainScreenMat.albedoTexture = mainScreenVid
    mainScreenMat.reflectionTexture = hdrTexture;
    mainScreenVid.vScale = -1;
    mainScreenVid.uScale = 1;
    mainScreenMat.backFaceCulling = false;
    mainScreenMat.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    //Applying materials
    /*
    screenMitte1 = new BABYLON.PBRMaterial("screenMitte1", scene);
    vidMitte1 = new BABYLON.VideoTexture("vidMitte1", vids[1], scene, {poster: "./assets/ascree.jpg"});
    vidMitte1.vScale = -1;
    vidMitte1.uScale = 1;
    screenMitte1.emissiveTexture = vidMitte1
    screenMitte1.albedoTexture = vidMitte1
    screenMitte1.reflectionTexture = hdrTexture;
    screenMitte1.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte1.metallic = 0.75
    screenMitte1.roughness = 0

    screenMitte2 = new BABYLON.PBRMaterial("screenMitte2", scene);
    vidMitte2 = new BABYLON.VideoTexture("vidMitte2", vids[2], scene, {poster: "./assets/ascree.jpg"});
    vidMitte2.vScale = -1;
    vidMitte2.uScale = 1;
    screenMitte2.emissiveTexture = vidMitte2
    screenMitte2.albedoTexture = vidMitte2
    screenMitte2.reflectionTexture = hdrTexture;
    screenMitte2.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte2.metallic = 0.75
    screenMitte2.roughness = 0

    screenMitte3 = new BABYLON.PBRMaterial("screenMitte3", scene);
    vidMitte3 = new BABYLON.VideoTexture("vidMitte3", vids[3], scene);
    vidMitte3.vScale = -1;
    vidMitte3.uScale = 1;
    screenMitte3.emissiveTexture = vidMitte3
    screenMitte3.albedoTexture = vidMitte3
    screenMitte3.reflectionTexture = hdrTexture;
    screenMitte3.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte3.metallic = 0.75
    screenMitte3.roughness = 0

    screenMitte4 = new BABYLON.PBRMaterial("screenMitte4", scene);
    vidMitte4 = new BABYLON.VideoTexture("vidMitte4", vids[4], scene, {poster: "./assets/ascree.jpg"});
    vidMitte4.vScale = -1;
    vidMitte4.uScale = 1;
    //vidMitte4.video.muted = "true"
    //vidMitte4.video.play()
    screenMitte4.emissiveTexture = vidMitte4
    screenMitte4.albedoTexture = vidMitte4
    screenMitte4.reflectionTexture = hdrTexture;
    screenMitte4.emissiveColor = new BABYLON.Color3.FromHexString("#ffffff")
    screenMitte4.metallic = 0.75
    screenMitte4.roughness = 0

    */
    
}
function ChangeMeshesMaterials(){
    //scene.getMeshByName("Screen_Main_1").material = mainScreenMat;
    //scene.getMeshByName("Screen_Main_2").material = mainScreenMat;
    //scene.getMeshByName("Screen_mitte_1").material = screenMitte1;
    //scene.getMeshByName("Screen_mitte_2").material = screenMitte2;
    //scene.getMeshByName("Screen_mitte_3").material = screenMitte3;
    //scene.getMeshByName("Screen_mitte_4").material = screenMitte4;
    scene.getMeshByName("Screen_Main_1").visibility = 0;
    scene.getMeshByName("Screen_Main_2").visibility = 0;
    scene.getMeshByName("Screen_mitte_1").visibility = 0;
    scene.getMeshByName("Screen_mitte_2").visibility = 0;
    scene.getMeshByName("Screen_mitte_3").visibility = 0;
    scene.getMeshByName("Screen_mitte_4").visibility = 0;
    scene.getMeshByName("Video_Screens").material = mainScreenMat
    scene.getMeshByName("arrow border 1").material = arrowMatOff
    scene.getMeshByName("arrow border 2").material = arrowMatOff
    scene.getMeshByName("arrow border 3").material = arrowMatOff
    scene.getMeshByName("arrow border 4").material = arrowMatOff
    scene.getMeshByName("arrow border 5").material = arrowMatOff
    scene.getMeshByName("arrow border 6").material = arrowMatOff
    scene.getMeshByName("arrow border 7").material = arrowMatOff

    
} 
