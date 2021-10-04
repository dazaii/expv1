let tracker ='m';

let mic, fft, amp, canv;

function change(){
    var bars = document.getElementById('bars');
    var sound = document.getElementById ('mic');
    var bglayer = document.getElementById ('bglayer');
    var container = document.getElementById ('container');
    var statusLabel = document.getElementById ('status');
    if(tracker == 'm'){
        statusLabel.innerHTML = "...Listening...";
        tracker = 'a';
        mic.start();
    }else{
        statusLabel.innerHTML = "Press to start";
        tracker = 'm';
        mic.stop();
    }
    
    bglayer.classList.toggle('scaleup');
    container.classList.toggle('scaledown');
    sound.classList.toggle('micdisappear');
    bars.classList.toggle('contflex');
}


// p5js 

function setup() {
    canv = createCanvas(80, 80);
    canv.parent("bars");
    noFill();
    mic = new p5.AudioIn();
    amp = new p5.Amplitude();
    amp.start();
    fft = new p5.FFT(0.8,128);
}

function draw() {
    background(110,177,209);

    let spectrum = fft.analyze();
    var freqAt = [22,15,2,15,22];
    for (i = 0; i < freqAt.length; i++) {
        stroke(255);
        strokeWeight(8);
        var mappa = map(spectrum[freqAt[i]], 0, 300, height/2, 0);
        var horimap = map(i,0,freqAt.length-1, width/2- (freqAt.length*6), (width/2)+(freqAt.length*6));
        line(horimap, height-mappa, horimap, mappa);
    }
    var scalemap = map(spectrum[5],0,255,1,1.1);
    document.getElementById('bglayer').style.transform = "scale("+scalemap+")";
}