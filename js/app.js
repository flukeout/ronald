import * as Utils from './utils.js';

let root = document.documentElement;

let rotateParentEl = document.querySelector(".computer");
let rotateParent = {};
let pos = rotateParentEl.getBoundingClientRect();

let windowHeight;
let windowWidth;

const setParentDetails = () => {
    pos = rotateParentEl.getBoundingClientRect();
    rotateParent = {
        centerX : pos.x + (pos.width / 2),
        centerY : pos.y + (pos.height /2 )
    }

    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

let maxRotateAngle = 25;

let CSSvars = [
    {
        variableName : "--rotate-x",
        set : function (mouse)  {
            let dY = rotateParent.centerY - mouse.clientY;
            let yDeg = Utils.mapScale(dY, -windowHeight / 2, windowHeight / 2, -maxRotateAngle, maxRotateAngle);
            root.style.setProperty(this.variableName, yDeg + "deg");
        }
    },
    {
        variableName : "--rotate-y",
        set : function (mouse)  {
            let dX = rotateParent.centerX - mouse.clientX;
            let xDeg = Utils.mapScale(dX, -windowWidth / 2,  windowWidth / 2 , -maxRotateAngle, maxRotateAngle);
            root.style.setProperty(this.variableName, -xDeg + "deg");
        }
    }
]



setParentDetails();

window.addEventListener("mousemove", e => {
    CSSvars.forEach(thisVar => {
        thisVar.set(e);
    })
})

window.addEventListener("resize", () => {
    setParentDetails();
})



let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {
  console.log("Acceleration along the X-axis " + acl.x);
  console.log("Acceleration along the Y-axis " + acl.y);
  console.log("Acceleration along the Z-axis " + acl.z);
});

acl.start();



function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  console.log(x,y);
  root.style.setProperty("--rotate-x", -x + "deg");
  root.style.setProperty("--rotate-y", y + "deg");
 
}

window.addEventListener('deviceorientation', handleOrientation);