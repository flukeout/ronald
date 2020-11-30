import * as Utils from './utils.js';

let root = document.documentElement;

let rotateParentEl = document.querySelector(".cowboy");
let rotateParent = {};

let windowHeight;
let windowWidth;
let rotators;
let rotateEls;
let maxRotateAngle = 25;

const setParentDetails = () => {

    rotateEls = document.querySelectorAll(".ralph, .cowboy");
    rotators = [];

    rotateEls.forEach(el => {
        let pos = el.getBoundingClientRect();
        rotators.push(
            {
                element : el,
                centerX : pos.x + (pos.width / 2),
                centerY : pos.y + (pos.height /2 )
            }
        )
    });

    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}


let CSSvars = [
    {
        variableName : "--rotate-x",
        set : function (object, mouse)  {
            let dY = object.centerY - mouse.clientY;
            let yDeg = Utils.mapScale(dY, -windowHeight / 2, windowHeight / 2, -maxRotateAngle, maxRotateAngle);
            object.element.style.setProperty(this.variableName, yDeg + "deg");

        }
    },
    {
        variableName : "--rotate-y",
        set : function (object, mouse)  {
            let dX = object.centerX - mouse.clientX;
            let xDeg = Utils.mapScale(dX, -windowWidth / 2,  windowWidth / 2 , -maxRotateAngle, maxRotateAngle);
            object.element.style.setProperty(this.variableName, -xDeg + "deg");
            if(xDeg > 0) {
                object.element.querySelector("nose").setAttribute("direction","l");
            } else {
                object.element.querySelector("nose").setAttribute("direction","r");
            }
        }
    }
]

setParentDetails();

window.addEventListener("resize", () => {
    setParentDetails();
})


window.addEventListener("mousemove", e => {
    rotators.forEach(face => {
        CSSvars.forEach(thisVar => {
            thisVar.set(face, e);
        });
    });
})


// function handleOrientation(event) {
//   var x = event.beta;  // In degree in the range [-180,180]
//   var y = event.gamma; // In degree in the range [-90,90]
//   document.querySelector(".ralph").setProperty("--rotate-x", 45 - x + "deg");
//   document.querySelector(".ralph").style.setProperty("--rotate-y", y + "deg");
// }

// if (window.DeviceOrientationEvent) {
//     window.addEventListener('deviceorientation', handleOrientation);
// }
