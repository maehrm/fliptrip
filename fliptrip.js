var N = 4;
var board = new Array(N);
var pattern = new Array(2**N);
var finish_flag;
var error_flag;
var canvas;
var w, h;

function setup() {
    init();
    w = windowWidth / 2;
    h = windowHeight / 3;
    canvas = createCanvas(w, h);
    canvas.parent("FlipTripCanvas");
}

function draw() {
    background('pink');
    //background(255, 255, 255);
    strokeWeight(2);
    stroke(128, 128, 128);      // 輪郭線
    for (var i = 0; i < N; i++) {
        // 数字の描画
        fill(0);
        textSize(20);
        text(N - (i + 1), w / 6 + i * w / 6 + w / 12, 65);
        // オセロ盤の描画
        fill(0, 200, 0);
        rect(w / 6 + i * w / 6, 75, w / 6, w / 6);
        // オセロの描画
        if (board[i]) {
            fill(0, 0, 0);                  
        }
        else {
            fill(255, 255, 255);
        }
        ellipse(w / 6 + i * w / 6 + w / 12, w / 6 + 75 - w / 12, w / 7);
    }
    if (error_flag) {
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("ERROR!", w / 2, 4 * h / 5);
    }
    if (finish_flag) {
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("FULLTRIP!", w / 2, 3 * h / 4);
    }              
}

function mousePressed() {
    var x = Math.floor(mouseX / (w / 6)) - 1;
    var y = mouseY;
    var n = 0;
    if (finish_flag || error_flag) return;
    if (x >= 0 && x < N && y >= 75 && y <= 150) {
        board[x] = 1 - board[x];
        for (var i = 0; i < N ; i++) {
            n += 2**(N - (i + 1)) * board[i];
        }
        if (pattern[n]) {
            error_flag = true;
        }
        else {
            finish_flag = true;
            pattern[n] = true;
            for (var i = 0; i < 2**N; i++) {
                if (!pattern[i]) {
                    finish_flag = false;
                    break;
                }
            }
        }
    }
}

function init() {
    finish_flag = 0;
    error_flag = 0;
    for (var i = 0; i < N; i++) {
        board[i] = 0;
    }
    for (var i = 0; i < 2**N; i++) {
        pattern[i] = false;
    }
    pattern[0] = true;
}

document.querySelector("button").addEventListener("click",
                                                  function() {
                                                      init();
                                                  });
