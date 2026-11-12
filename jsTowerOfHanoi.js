

function diskUpdate(pillars1, pillars2, pillars3) {
    let updateDisk;
    let c = pillars1.length;
    let loop = 10;
    for (c; c > 0; c--) {
        updateDisk = document.getElementById("Row1" + "Column" + (loop));
        updateDisk.className = "disk" + pillars1[(pillars1.length - c)];
        loop--;
    }
    for (let m = 10 - pillars1.length; m > 0; m--) {
        updateDisk = document.getElementById("Row1" + "Column" + (m));
        updateDisk.className = "disk0"
    }
    c = pillars2.length;
    loop = 10;
    for (c; c > 0; c--) {
        updateDisk = document.getElementById("Row2" + "Column" + (loop));
        updateDisk.className = "disk" + pillars2[(pillars2.length - c)];
        loop--;
    }
    for (let m = 10 - pillars2.length; m > 0; m--) {
        updateDisk = document.getElementById("Row2" + "Column" + (m));
        updateDisk.className = "disk0"
    }
    c = pillars3.length;
    loop = 10;
    for (c; c > 0; c--) {
        updateDisk = document.getElementById("Row3" + "Column" + (loop));
        updateDisk.className = "disk" + pillars3[(pillars3.length - c)];
        loop--;
    }
    for (let m = 10 - pillars3.length; m > 0; m--) {
        updateDisk = document.getElementById("Row3" + "Column" + (m));
        updateDisk.className = "disk0"
    }
}

function detecting(id, sending, swaping, diskSwapped, receiving, newPillars, allowed, addingAnyMoves, pillars1, pillars2, pillars3) {
    let display1 = document.getElementById("diskDisplaysPillars1");
    let display2 = document.getElementById("diskDisplaysPillars2");
    let display3 = document.getElementById("diskDisplaysPillars3");

    let topDisk;
    let pop = false;

    let preSwaping = swaping;

    swaping = "";
    receiving = "";

    //+++++++++++++++++++++++++SENDING+++++++++++++++++++++++++
    if (sending) {
        
        if (id === "pillars1detection" && pillars1.length > 0) {
            console.log(pillars1);
            diskSwapped = "disk" + (pillars1[(pillars1.length - 1)]);
            console.log(diskSwapped);
            display1.className = "disk" + pillars1[(pillars1.length - 1)];
            topDisk = document.getElementById("Row1Column" + (11 - pillars1.length));
            console.log(topDisk);
            topDisk.className = "disk0";
            sending = false;
            swaping = "pillars1"
        }
        else if (id === "pillars2detection" && pillars2.length > 0) {
            console.log(pillars2);
            diskSwapped = "disk" + pillars2[pillars2.length - 1];
            display2.className = "disk" + pillars2[(pillars2.length - 1)];
            topDisk = document.getElementById("Row2Column" + (11 - pillars2.length));
            console.log(topDisk);
            topDisk.className = "disk0";
            sending = false;
            swaping = "pillars2"
        }
        else if (id === "pillars3detection" && pillars3.length > 0) {
            console.log(pillars3);
            diskSwapped = "disk" + pillars3[pillars3.length - 1];
            display3.className = "disk" + pillars3[(pillars3.length - 1)];
            topDisk = document.getElementById("Row3Column" + (11 - pillars3.length));
            console.log(topDisk);
            topDisk.className = "disk0";
            sending = false;
            swaping = "pillars3"
        }
        pop = true;
    }
    //+++++++++++++++++++++++++RECEIVING+++++++++++++++++++++++++
    else if (!sending) {

        if (allowed) {
            if (id === "pillars1detection") {
                topDisk = document.getElementById("Row1Column" + (10 - pillars1.length));
                topDisk.className = diskSwapped;
                pillars1.push(Number(diskSwapped.replace("disk", "")));
                // console.log(pillars1);
                newPillars = [...pillars1];
                receiving = "pillars1";
            }
            else if (id === "pillars2detection") {
                topDisk = document.getElementById("Row2Column" + (10 - pillars2.length));
                topDisk.className = diskSwapped;
                pillars2.push(Number(diskSwapped.replace("disk", "")));
                // console.log(pillars2);
                    newPillars = [...pillars2];
                receiving = "pillars2";
            }
            else if (id === "pillars3detection") {
                topDisk = document.getElementById("Row3Column" + (10 - pillars3.length));
                topDisk.className = diskSwapped;
                pillars3.push(Number(diskSwapped.replace("disk", "")));
                // console.log(pillars3);
                newPillars = [...pillars3];
                receiving = "pillars3";
            }
            sending = true;
            addingAnyMoves = true;

            display1.className = "disk0";
            display2.className = "disk0";
            display3.className = "disk0";
        }
        else {
            alert("Invalid!");
            swaping = preSwaping;
            addingAnyMoves = false;
        }
    }
    return {
        first: sending,
        second: swaping,
        third: diskSwapped,
        fourth: receiving,
        fifth: newPillars,
        sixth: pop,
        seventh: addingAnyMoves
    };
}


function optimalMoves(amount) {
    let moves = Math.pow(2, amount);
    moves = moves - 1;
    return moves;
}


let amount = 3;
let sending = true;
let receiving = "";
let diskAmount;
let detect = "";
let swaping = "";
let newPillars = [];
let diskSwapped = "";
let allowed;
let pop;
let myMoves = 0;
let myOptimal = 7;
let preSwaping;
let addMoves = true;
let addingAnyMoves = true;
let win = false;

let seconds = 0;
let timerInterval;
let minutes;
let remainingSeconds;

let pillars1 = [3, 2, 1];
let pillars2 = [];
let pillars3 = [];


let detection1 = document.getElementById("pillars1detection");
let detection2 = document.getElementById("pillars2detection");
let detection3 = document.getElementById("pillars3detection");
let moves = document.getElementById("myMoves");
let optimal = document.getElementById("optimalMoves");


document.querySelectorAll("#pillars1detection, #pillars2detection, #pillars3detection").forEach(detect => {
    detect.addEventListener("click", function(event) {
        console.log("-==-=-=--=-=-==--=-=-=-=")
        let detectId = detect.id;
        allowed = false;
        console.log("allowed = " + allowed);
        console.log(pillars1);
        console.log(pillars2);
        console.log(pillars3);
        console.log("swaping = " + swaping);
        console.log("detectId = " + detectId);
        // console.log("swaping = " + swaping);
        // console.log("diskSwapped = " + diskSwapped);
        menDisk = Number(diskSwapped.replace("disk", ""));

        if (swaping === "pillars1" && detectId === "pillars1detection") {
            allowed = true;
        } else if (swaping === "pillars2" && detectId === "pillars2detection") {
            allowed = true;
        } else if (swaping === "pillars3" && detectId === "pillars3detection") {
            allowed = true;

        } 
        else {
            if (swaping === "pillars1" && detectId === "pillars2detection") {
                if (menDisk < pillars2[pillars2.length - 1] || pillars2.length === 0) {
                    allowed = true;
                } else {
                    allowed = false;
                    }
            } else if (swaping === "pillars1" && detectId === "pillars3detection") {
                if (menDisk < pillars3[pillars3.length - 1] || pillars3.length === 0) {
                    allowed = true;
                } else {
                    allowed = false;
                }
        
            } else if (swaping === "pillars2" && detectId === "pillars1detection") {
                if (menDisk < pillars1[pillars1.length - 1] || pillars1.length === 0) {
                    allowed = true;
                } else {
                    allowed = false;
                }
            } else if (swaping === "pillars2" && detectId === "pillars3detection") {
                if (menDisk < pillars3[pillars3.length - 1] || pillars3.length === 0) {
                 allowed = true;
             } else {
                    allowed = false;
                }
        
            } else if (swaping === "pillars3" && detectId === "pillars1detection") {
                if (menDisk < pillars1[pillars1.length - 1] || pillars1.length === 0) {
                    allowed = true;
                } else {
                    allowed = false;
                }
            } else if (swaping === "pillars3" && detectId === "pillars2detection") {
                if (menDisk < pillars2[pillars2.length - 1] || pillars2.length === 0) {
                    allowed = true;
                } else {
                    allowed = false;
                }
            }
        }

        
        preSwaping = swaping;

        console.log("-==-=-=--=-=-==--=-=-=-=")
        let result = detecting(detectId, sending, swaping, diskSwapped, receiving, newPillars, allowed, addingAnyMoves, pillars1, pillars2, pillars3);

        sending = result.first;
        swaping = result.second;
        diskSwapped = result.third;
        receiving = result.fourth;
        newPillars = result.fifth;
        pop = result.sixth;
        addingAnyMoves = result.seventh;

        console.log("=-=-=-=-=--=-=-=-=-=-=-==--=-==--=-=-=-=-==--=-=-=-=-=-=-==-");
        console.log("POP = " + pop);
        console.log("sending = " + sending);
        console.log("swaping = " + swaping);
        console.log("diskSwapped = " + diskSwapped);
        console.log("receiving = " + receiving);
        console.log("newPillars = " + newPillars);
        console.log("preswaping = " + preSwaping);
        console.log(" ");
        console.log(pillars1);
        console.log(pillars2);
        console.log(pillars3);
        console.log("=-=-=-=-=--=-=-=-=-=-=-==--=-==--=-=-=-=-==--=-=-=-=-=-=-==-");



        if (preSwaping === receiving || !addingAnyMoves) {
            addMoves = false;
        } else if (preSwaping !== receiving && addingAnyMoves) {
            addMoves = true;
        }
        

        if (swaping === "pillars1" && pop) {
            console.log("POP = " + pop);
            pillars1.pop();
        }
        else if (swaping === "pillars2" && pop) {
            pillars2.pop();
        }
        else if (swaping === "pillars3" && pop) {
            pillars3.pop();
        }
        else {
            if (addMoves) {
                myMoves++;
                moves.textContent = myMoves;
                if (myMoves === 1) {
                    startTimer();
                }
            }

            if (receiving === "pillars1") {
                pillars1 = newPillars;
            }
            else if (receiving === "pillars2") {
                pillars2 = newPillars;
            }
            else if (receiving === "pillars3") {
                pillars3 = newPillars;
            }
        }

        if (pillars3.length === amount) {
            win = true;
            console.log(win);
            stopTimer();

            console.log(seconds);
            console.log(myMoves);
            console.log(amount);

            if (amount <= 3) {
                document.getElementById("level").style.color = "rgb(176, 202, 209)";
                document.getElementById("score").style.color = "rgb(176, 202, 209)";
                document.getElementById("startAgain").style.backgroundColor = "rgb(176, 202, 209)";
            } else if (amount <= 5) {
                document.getElementById("level").style.color = "rgb(227, 200, 128)";
                document.getElementById("score").style.color = "rgb(227, 200, 128)";
                document.getElementById("startAgain").style.backgroundColor = "rgb(227, 200, 128)";
            } else if (amount <= 8) {
                document.getElementById("level").style.color = "rgb(239, 164, 119)";
                document.getElementById("score").style.color = "rgb(239, 164, 119)";
                document.getElementById("startAgain").style.backgroundColor = "rgb(239, 164, 119)";
            } else if (amount <= 10) {
                document.getElementById("level").style.color = "rgb(167, 108, 106)";
                document.getElementById("score").style.color = "rgb(167, 108, 106)";
                document.getElementById("startAgain").style.backgroundColor = "rgb(167, 108, 106)";
            }

            document.getElementById("level").textContent = "Level " + amount;
            document.getElementById("diskAmount").textContent = amount;
            document.getElementById("timeAmount").textContent = 
                String(minutes).padStart(2, "0") + " : " + 
                String(remainingSeconds).padStart(2, "0");
            document.getElementById("moveAmount").textContent = 
                String(myMoves) + " / " + String(myOptimal);
            let TargetTime = Math.round((Math.pow(2, amount) - 1) * (2 / 3));
            let efficiencyMoves = (myOptimal / myMoves) * 100;
            let efficiencyTimes = (TargetTime / seconds) * 100;
            let score = Number(Math.trunc(efficiencyMoves * 0.5) + (efficiencyTimes * 0.4));
            console.log(score);
            let grade = "";
            let gradeColor;
            if (score > 125) { grade = "S+"; gradeColor = "rgb(232, 207, 84)";
            } else if (score > 115) {grade = "S"; gradeColor = "rgb(232, 207, 84)";
            } else if (score > 100) {grade = "S-"; gradeColor = "rgb(232, 207, 84)";
            } else if (score > 95) {grade = "A+"; gradeColor = "rgb(183, 240, 162)";
            } else if (score > 90) {grade = "A"; gradeColor = "rgb(183, 240, 162)";
            } else if (score > 85) {grade = "A-"; gradeColor = "rgb(183, 240, 162)";
            } else if (score > 80) {grade = "B+"; gradeColor = "rgb(149, 215, 241)";
            } else if (score > 75) {grade = "B"; gradeColor = "rgb(149, 215, 241)";
            } else if (score > 70) {grade = "B-"; gradeColor = "rgb(149, 215, 241)";
            } else if (score > 65) {grade = "C+"; gradeColor = "rgb(235, 162, 74)";
            } else if (score > 60) {grade = "C"; gradeColor = "rgb(235, 162, 74)";
            } else if (score > 55) {grade = "C-"; gradeColor = "rgb(235, 162, 74)";
            } else if (score > 50) {grade = "D+"; gradeColor = "rgb(228, 103, 103)";
            } else if (score > 45) {grade = "D"; gradeColor = "rgb(228, 103, 103)";
            } else if (score > 40) {grade = "D-"; gradeColor = "rgb(228, 103, 103)";
            } else if (score > 35) {grade = "F+"; gradeColor = "rgb(74, 20, 20)";
            } else if (score > 30) {grade = "F"; gradeColor = "rgb(74, 20, 20)";
            } else {grade = "F-"; gradeColor = "rgb(74, 20, 20)";}
            document.getElementById("gradeAmount").textContent = grade;
            document.getElementById("gradeAmount").style.color = gradeColor;

            setTimeout(function() {
                scoreCongrats.classList.remove("show");
                winPopUp.classList.remove("show");
                winSection.classList.remove("show");

                void scoreCongrats.offsetWidth;
                void winPopUp.offsetWidth;
                void winSection.offsetWidth;

                scoreCongrats.classList.add("show");
                winPopUp.classList.add("show");
                winSection.classList.add("show");
            }, 2000);
        }
    })
});



document.querySelectorAll(".navButton button").forEach(diskAmount => {
    diskAmount.addEventListener("click", function(event) {
        document.getElementById("diskDisplaysPillars1").className = "disk0";
        document.getElementById("diskDisplaysPillars2").className = "disk0";
        document.getElementById("diskDisplaysPillars3").className = "disk0";
        sending = true;
        swaping = "";
        receiving = "";
        diskSwapped = "";
        newPillars = [];
        allowed = false;
        myMoves = 0;
        preSwaping = "";
        moves.textContent = 0;
        addingAnyMoves = true;
        win = false;
        resetTimer()

        console.log(diskAmount);
        amount = Number(diskAmount.id);
        myOptimal = optimalMoves(amount);
        optimal.textContent = myOptimal;

        pillars1.length = 0;
        pillars2.length = 0;
        pillars3.length = 0;

        for (let i = amount; i > 0; i--) {
            pillars1[pillars1.length] = i;
        }
        console.log(pillars1);
        diskUpdate(pillars1, pillars2, pillars3);
    })
});


let on = true;
let sound = document.getElementById("startSound");
let soundicon = document.getElementById("backSoundStartIcon");
let pauseButton = document.getElementById("pauseButton");

// sound.play();

pauseButton.addEventListener("click", function() {

    if (sound.paused) {
        sound.play();
        soundicon.className = "fa-solid fa-pause";
    } else {
        sound.pause();
        soundicon.className = "fa-solid fa-play";
    }
});



function startTimer() {
    timerInterval = setInterval(function() {
        seconds++;

        minutes = Math.floor(seconds / 60);
        remainingSeconds = seconds % 60;

        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(remainingSeconds).padStart(2, "0");

    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}
function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById("timer").textContent = "00:00";
}

let startButton = document.getElementById("startAgain");
let scoreCongrats = document.querySelector(".scoreCongrats");
let winPopUp = document.querySelector(".winPopUp");
let winSection = document.querySelector(".winSection");

startButton.addEventListener("click", function() {
    document.getElementById("diskDisplaysPillars1").className = "disk0";
    document.getElementById("diskDisplaysPillars2").className = "disk0";
    document.getElementById("diskDisplaysPillars3").className = "disk0";
    sending = true;
    swaping = "";
    receiving = "";
    diskSwapped = "";
    newPillars = [];
    allowed = false;
    myMoves = 0;
    preSwaping = "";
    moves.textContent = 0;
    addingAnyMoves = true;
    win = false;
    resetTimer()

    console.log(diskAmount);
    amount = 3;
    myOptimal = optimalMoves(amount);
    optimal.textContent = myOptimal;

    amount = 3;

    pillars1 = [];
    pillars2 = [];
    pillars3 = [];

    for (let i = amount; i > 0; i--) {
        pillars1.push(i);
    }

    console.log(pillars1);
    diskUpdate(pillars1, pillars2, pillars3);

    let elements = document.querySelectorAll(`
        .winSection,
        .scoreCongrats .f1,
        .scoreCongrats .f2,
        .scoreCongrats .f3,
        .winPopUp .f4,
        .winPopUp .f5,
        .winPopUp .f6,
        .winPopUp .f7,j
        .winPopUp .f8,
        .winPopUp .f9,
        .winPopUp .f10,
        .winPopUp .f11,
        .winPopUp .f12,
        .winPopUp .f13
    `);

    scoreCongrats.classList.remove("show");
    winPopUp.classList.remove("show");
    winSection.classList.remove("show");

    void scoreCongrats.offsetWidth;
    void winPopUp.offsetWidth;
    void winSection.offsetWidth;

    win = false;
});


    


