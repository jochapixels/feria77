var iFrameElem = '<iframe width="1120" height="630" src="https://www.youtube.com/embed/9yCWG3lpcvo?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

$(document).keyup(function (e) {
  //if keypress "p"
  if (e.keyCode === 80) {
    e.preventDefault();
    $('#video-overlay').addClass('open');
    $("#video-overlay").append(iFrameElem);
  }
  //this is a commetn and can be erased)
});

$('.video-overlay, .video-overlay-close').on('click', function (e) {
  e.preventDefault();
  close_video();
});

function play_video() {
  $('#video-overlay').addClass('open');
  $("#video-overlay").append(iFrameElem);
}


function close_video() {
  $('.video-overlay.open').removeClass('open').find('iframe').remove();
};


$(document).keyup(function (e) {
  if (e.keyCode === 27) { close_video(); }

  //R PRESSED
  else if (e.keyCode === 82) {
    console.log("r Keyboard")
    //startTween.restart()
    startTween.restart();
  }
  else if (e.keyCode == 51){
    buttonTween.play();
  }
  else if (e.keyCode == 52){
    buttonTween.reverse();
  }
  //1 PPRESSED -> walkercam
  else if (e.keyCode == 49 || e.keyCode == 97) {
    document.getElementById("debugLabel").innerHTML = "Current Camera: First Person";
    scene.activeCamera = walkerCam
    HandleViewProperties()
    //button stuff
    b_All.setEnabled(true)
    b_stand.visibility = true;
    b_press.visibility = true;
    b_stehle.visibility = true;
    b_winkel.setEnabled(true);

  }

  //2 PPRESSED -> rotate camera
  else if (e.keyCode == 50 || e.keyCode == 98) {
    if(document.getElementsByClassName('bg-overlay')[0].className == 'bg-overlay open'){
      console.log("bg is open")
    }
    else{
      console.log('bg is close')
      document.getElementById("debugLabel").innerHTML = "Current Camera: Rotate Camera";
      scene.activeCamera = camera;
      HandleViewProperties()
      //button stuff
  
      b_All.setEnabled(false)
      b_stand.visibility = false;
      b_press.visibility = false;
      b_stehle.visibility = false;
      b_winkel.setEnabled(false);
    }

  }

  // SPACE PRESSED -> 
  else if (e.keyCode == 32) {
    console.log("jump")
    jump(0.035)
  }

});

//UI controllers
//Back button
function show_backbutton() {
  $('.back-zoom').addClass('open');
}

$('.back-zoom').on('click', function (e) {
  e.preventDefault();
  hide_backbutton();
  TravelRotateCamBack();
  RevealInfopoints(false);
});

function hide_backbutton() {
  $('.back-zoom').removeClass('open');
};


//Infobox button
//callinfobox button
let showInfo = false;
$(document).keyup(function (e) {
  //if keypress "i"

  if (e.keyCode === 73) {
    AddStreamingToTexture();
    //console.log("i Keyboard")
    /*

    showInfo = !showInfo;
    if (showInfo) {
      show_Info_Overlay();
    }
    else {
      hide_Info_Overlay();
    }
    */

  }
});

function show_Info_Overlay() {
  $('.info-overlay').addClass('open')
  $('.info-overlay').removeClass('close')
  $('.infobox').addClass('open')
  $('.infobox').removeClass('close')
  $('.videobox').addClass('open')
  $('.videobox').removeClass('close')
}

function hide_Info_Overlay() {
  $('.info-overlay').addClass('close')
  $('.info-overlay').removeClass('open')
  $('.infobox').addClass('close')
  $('.infobox').removeClass('open')
  $('.videobox').addClass('close')
  $('.videobox').removeClass('open')
}