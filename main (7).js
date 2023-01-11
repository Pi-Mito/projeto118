function draw(){
    checkSketch();
    if(drawSketch == sketch){
        answerHolder= "set";
        score= score+1
    }
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function clearCanvas(){
    background("white");
}

function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    var num= Math.floor(Math.random());
    console.log(num);

    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier("Doodlenet");
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error;
    }
    console.log(results);
    var result = results[0].label;
    document.getElementById("label").innerHTML = "Nome:"+result.replace('_','');
    document.getElementById('confidence').innerHTML = 'Precisão:' + Math.round(results[0].confidence*100)+'%';
    utterThis = new SpeechSynthesisUtterance(result.replace('_',''));
    synth.speak(utterThis);
}
function checkSketch(){
    timerCounter= timerCounter + 1;
    document.getElementById("time").innerHTML = "timer" + timerCounter;
    if(timerCounter > 400){
        timerCounter = 0;
        timerCheck = "completed"; 
    }
    
}