    // https://doc.babylonjs.com/api/classes/babylon.defaultrenderingpipeline
var defaultPipeline;
    function PostEffects(scene){
        defaultPipeline = new BABYLON.DefaultRenderingPipeline(
            "DefaultRenderingPipeline",
            true, // is HDR?
            scene,
            scene.cameras
        );
        if (defaultPipeline.isSupported) {
            /* imageProcessing */
            defaultPipeline.imageProcessingEnabled = true; //true by default
            if (defaultPipeline.imageProcessingEnabled) {
                /* tone mapping*/
                defaultPipeline.imageProcessing.toneMappingEnabled = true
                defaultPipeline.imageProcessing.toneMappingType = 1
                defaultPipeline.imageProcessing.contrast = 1.8; // 1 by default
                defaultPipeline.imageProcessing.exposure = 1; // 1 by default
                /* vignette */
                defaultPipeline.imageProcessing.vignetteEnabled = true
                defaultPipeline.imageProcessing.vignetteWeight = 3.1
                defaultPipeline.imageProcessing.vignetteFOV = 0.5
                /* color grading */
                defaultPipeline.imageProcessing.colorGradingEnabled = false; // false by default
                if (defaultPipeline.imageProcessing.colorGradingEnabled) {
                    // using .3dl (best) :
                    defaultPipeline.imageProcessing.colorGradingTexture = new BABYLON.ColorGradingTexture("textures/LateSunset.3dl", scene);
                    // using .png :
                    /*
                    var colorGradingTexture = new BABYLON.Texture("textures/colorGrade-highContrast.png", scene, true, false);
                    colorGradingTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                    colorGradingTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;                
                    defaultPipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
                    defaultPipeline.imageProcessing.colorGradingWithGreenDepth = false;
                    */
                }
                /* color curves */
                defaultPipeline.imageProcessing.colorCurvesEnabled = false; // false by default
                if (defaultPipeline.imageProcessing.colorCurvesEnabled) {
                    var curve = new BABYLON.ColorCurves();
                    curve.globalDensity = 0; // 0 by default
                    curve.globalExposure = 0; // 0 by default
                    curve.globalHue = 30; // 30 by default
                    curve.globalSaturation = 0; // 0 by default
                    curve.highlightsDensity = 0; // 0 by default
                    curve.highlightsExposure = 0; // 0 by default
                    curve.highlightsHue = 30; // 30 by default
                    curve.highlightsSaturation = 0; // 0 by default
                    curve.midtonesDensity = 0; // 0 by default
                    curve.midtonesExposure = 0; // 0 by default
                    curve.midtonesHue = 30; // 30 by default
                    curve.midtonesSaturation = 0; // 0 by default
                    curve.shadowsDensity = 0; // 0 by default
                    curve.shadowsExposure = 0; // 0 by default
                    curve.shadowsHue = 30; // 30 by default
                    curve.shadowsDensity = 80;
                    curve.shadowsSaturation = 0; // 0 by default;
                    defaultPipeline.imageProcessing.colorCurves = curve;
                }
            }
            /* bloom */
            defaultPipeline.bloomEnabled = false; // false by default
            if (defaultPipeline.bloomEnabled) {
                defaultPipeline.bloomKernel = 64; // 64 by default
                defaultPipeline.bloomScale = 0.5; // 0.5 by default
                defaultPipeline.bloomThreshold = 0.9; // 0.9 by default
                defaultPipeline.bloomWeight = 0.15; // 0.15 by default
            }
            /* chromatic abberation */
            defaultPipeline.chromaticAberrationEnabled = false; // false by default
            if (defaultPipeline.chromaticAberrationEnabled) {
                defaultPipeline.chromaticAberration.aberrationAmount = 50; // 30 by default
                defaultPipeline.chromaticAberration.adaptScaleToCurrentViewport = false; // false by default
                defaultPipeline.chromaticAberration.alphaMode = 0; // 0 by default
                defaultPipeline.chromaticAberration.alwaysForcePOT = false; // false by default
                defaultPipeline.chromaticAberration.enablePixelPerfectMode = false; // false by default
                defaultPipeline.chromaticAberration.forceFullscreenViewport = true; // true by default
            }
            /* DOF */
            defaultPipeline.depthOfFieldEnabled = false; // false by default
            if (defaultPipeline.depthOfFieldEnabled && defaultPipeline.depthOfField.isSupported) {
                defaultPipeline.depthOfFieldBlurLevel = 0; // 0 by default
                defaultPipeline.depthOfField.fStop = 1.4; // 1.4 by default
                defaultPipeline.depthOfField.focalLength = 50; // 50 by default, mm
                defaultPipeline.depthOfField.focusDistance = 2000; // 2000 by default, mm
                defaultPipeline.depthOfField.lensSize = 50; // 50 by default
            }
            /* FXAA */
            defaultPipeline.fxaaEnabled = true; // false by default
            if (defaultPipeline.fxaaEnabled) {
                defaultPipeline.fxaa.samples = 1; // 1 by default
                defaultPipeline.fxaa.adaptScaleToCurrentViewport = false; // false by default
            }
            /* glowLayer */
            defaultPipeline.glowLayerEnabled = false;
            if (defaultPipeline.glowLayerEnabled) {
                defaultPipeline.glowLayer.blurKernelSize = 16; // 16 by default
                defaultPipeline.glowLayer.intensity = 1; // 1 by default
            }
            /* grain */
            defaultPipeline.grainEnabled = false;
            if (defaultPipeline.grainEnabled) {
                defaultPipeline.grain.adaptScaleToCurrentViewport = false; // false by default
                defaultPipeline.grain.animated = true; // false by default
                defaultPipeline.grain.intensity = 50; // 30 by default
            }
            /* MSAA */
            defaultPipeline.samples = 2; // 1 by default
            /* sharpen */
            defaultPipeline.sharpenEnabled = false;
            if (defaultPipeline.sharpenEnabled) {
                defaultPipeline.sharpen.adaptScaleToCurrentViewport = false; // false by default
                defaultPipeline.sharpen.edgeAmount = 0.3; // 0.3 by default
                defaultPipeline.sharpen.colorAmount = 1; // 1 by default
            }
        }
    }
   