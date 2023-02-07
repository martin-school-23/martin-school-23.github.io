const paragraphLabels = [
    "Introduction <br> (1 of 1)",
    "Paragraph 1, Subthesis and Context <br> (1 of 3)",
    "Paragraph 1, Analysis 1 <br> (2 of 3)",
    "Paragraph 1, Analysis 2 and Conclusion <br> (3 of 3)",
    "Paragraph 2, Subthesis and Context <br> (1 of 4)",
    "Paragraph 2, Analysis 1 <br> (2 of 4)",
    "Paragraph 2, Analysis 2 <br> (3 of 4)",
    "Paragraph 2, Conclusion <br> (4 of 4)",
    "Paragraph 3, Introduction <br> (1 of 5)",
    "Paragraph 3, Evidence <br> (2 of 5)",
    "Paragraph 3, Analysis <br> (3 of 5)",
    "Paragraph 3, Evidence and Analysis 2 <br> (4 of 5)",
    "Paragraph 3, Analysis and Conclusion <br> (5 of 5)",
    "Conclusion <br> (1 of 2)",
    "Conclusion, Concluded <br> (2 of 2)",
];

let paragraphCount = paragraphLabels.length;
let paragraphId = 0;
document.getElementById("label").innerHTML = paragraphLabels[paragraphId];

document.addEventListener('keydown', function(event) {
    console.log(event);
    if (this.getAnimations().length == 0) {
        if(event.key == "ArrowUp"|| event.key == "ArrowLeft") {
            if (paragraphId > 0) {
                moveParagraph(-1);
            }
            
        }
        else if(event.key == "ArrowDown" || event.key == " " || event.key == "ArrowRight") {
            if (paragraphId < paragraphCount - 1) {
                moveParagraph(1);
            }
        }
    }
});

document.addEventListener("wheel", function(event){
    if (this.getAnimations().length == 0) {
        if (event.wheelDeltaY < 0) {
            if (paragraphId < paragraphCount - 1) {
                moveParagraph(1);
            }
        }

        if (event.wheelDeltaY > 0) {
            if (paragraphId > 0) {
                moveParagraph(-1);
            }
        }
    }
});

function moveParagraph(direction) {
    paragraphId += direction;

    document.getElementById("label").innerHTML = paragraphLabels[paragraphId];
    // document.getElementById("slide-image").src = "./images/" + paragraphId + ".jpg";
    updateParagraphId(paragraphId, direction);
}

function updateParagraphId(id, direction) {
    for (let i = 0; i < paragraphLabels.length; i++) {
        document.getElementById("para" + i).animation = "";
    }

    
    setTimeout(() => {
        if (direction == 1) {
            console.log("animating?");
            if (id > 1)
                document.getElementById("para" + (id - 2)).style.animation = "small-to-out 0.8s linear 0s 1 forwards"; // small1 -> out

            document.getElementById("para" + (id - 1)).style.animation = "large-to-small1 0.8s linear 0s 1 forwards"; // large -> small1
            document.getElementById("para" + id).style.animation = "large-to-small2 0.8s linear 0s 1 reverse"; // small1 -> large

            if (id < paragraphCount - 1) {
                document.getElementById("para" + (id + 1)).className = "small2";
                document.getElementById("para" + (id + 1)).style.animation = "small-to-out 0.8s linear 0s 1 reverse"; // out -> small2
            }

            console.log("animating img");

            document.getElementById("img-" + (id - 1)).style.animation = "image-up-out 0.8s linear 0s 1 forwards";
            document.getElementById("img-" + id).style.animation = "image-down-out 0.8s linear 0s 1 reverse";
        } else if (direction == -1) {
            if (id > 0) {
                document.getElementById("para" + (id - 1)).className = "small1";
                document.getElementById("para" + (id - 1)).style.animation = "small-to-out 0.8s linear 0s 1 reverse";
            }

            document.getElementById("para" + id).style.animation = "large-to-small1 0.8s linear 0s 1 reverse"; // large -> small1

            document.getElementById("para" + (id + 1)).style.animation = "large-to-small2 0.8s linear 0s 1 forwards"; // small1 -> large

            if (id < paragraphCount - 2) {
                document.getElementById("para" + (id + 2)).style.animation = "small-to-out 0.8s linear 0s 1 forwards"; // out -> small2
            }

            console.log("animating img");
            document.getElementById("img-" + id).style.animation = "image-up-out 0.8s linear 0s 1 reverse";
            document.getElementById("img-" + (id + 1)).style.animation = "image-down-out 0.8s linear 0s 1 forwards";
        } else if (direction == 0) {
            // none for now
        }
    }, 50);

    setTimeout(() => {
        for (let i = 0; i < paragraphLabels.length; i++) {
            document.getElementById("para" + i).className = "hidden";
            document.getElementById("para" + i).style.animation = "";
            document.getElementById("img-" + i).className = "hidden-image";
            document.getElementById("img-" + i).style.animation = "";
        }

        if (id > 0) {
            document.getElementById("para" + (id - 1)).className = "small1";
        }
    
        document.getElementById("para" + id).className = "large";
    
        if (id < paragraphCount - 1) {
            document.getElementById("para" + (id + 1)).className = "small2";
        }

        document.getElementById("img-" + id).className = "slide-image";
    }, 850);
}