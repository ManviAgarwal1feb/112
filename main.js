Webcam.set({
    height:"300",
width:"350",
image_format:"png",
png_quality:"100"
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
 Webcam.snap(function(data_uri){
document.getElementById("results").innerHTML='<img id="snap_img"src="'+data_uri+'">';
 });
}

prediction_1="";
prediction_2="";

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="According to the first prediction you are"+prediction_1;
    speak_data_2="And according to the second prediction you are"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}

console.log("ml5 version is"+ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/e8w4GcSwU/model.json",modelloaded);

function modelloaded(){
    console.log("Hi I am here")
}

function check(){
    img=document.getElementById("snap_img");
    classifier.classify(img,gotresult);
}

function gotresult(error,results){
if(error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("emotion_name1").innerHTML=results[0].label;
    document.getElementById("emotion_name2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();


if(prediction_1=="Happy"){
document.getElementById("emoji_1").innerHTML="&#128512;";
}
if(prediction_1=="Sad"){
document.getElementById("emoji_1").innerHTML="&#128546;";
}
if(prediction_1=="Angry"){
document.getElementById("emoji_1").innerHTML="&#128545;";
}
if(results[1].label=="Happy"){
document.getElementById("emoji_2").innerHTML="&#128512;";
    }
    if(results[1].label=="Sad"){
    document.getElementById("emoji_2").innerHTML="&#128546;";
    }
    if(results[1].label=="Angry"){
    document.getElementById("emoji_2").innerHTML="&#128545;";
    }
}
}