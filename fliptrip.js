var N = 4;
var board = new Array(N);
var pattern = new Array(2**N);
var finish_flag;
var error_flag;
var canvas;
var reset_button;

function setup() {
    init();
    canvas = createCanvas(N * 50, 200);
    canvas.parent("FlipTripCanvas");
    reset_button = createButton("Reset!");
    reset_button.position(windowWidth / 2 - (reset_button.width / 2),
                          height);// - reset_button.height / 2);
    reset_button.style("width",  "50px");
    reset_button.style("height", "30px");
    reset_button.style("border-radius", "5px");
    reset_button.mousePressed(function() {
        init();
    });
}

function draw() {
    //background('pink');
    background(255, 255, 255);
    strokeWeight(2);
    stroke(128, 128, 128);      // 輪郭線
    for (var i = 0; i < N; i++) {
        // 数字の描画
        fill(0);
        textSize(20);
        text(N - (i + 1), i * 50 + 20, 65);
        // オセロ盤の描画
        fill(0, 200, 0);
        rect(i * 50, 75, 50, 50);
        // オセロの描画
        if (board[i]) {
            fill(0, 0, 0);                  
        }
        else {
            fill(255, 255, 255);
        }
        ellipse(i * 50 + 25, 100, 42, 42);
    }
    if (error_flag) {
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("ERROR!", width / 2, 25);
    }
    if (finish_flag) {
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text("FULLTRIP!", width / 2, 25);
    }              

}

function mousePressed() {
    var x = Math.floor(mouseX / 50);
    var y = mouseY;
    var n = 0;
    if (finish_flag || error_flag) return;
    if (x >= 0 && x < N && y >= 75 && y <= 125) {
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
