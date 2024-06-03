import {calc} from "./lsystem.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
  }
};

const update = () => {
  const t1 = new Date().getTime();


  const t2 = new Date().getTime();
  ctx.clearRect(0, 0, worldWidth, worldHeight);


  updateWorldSettings();

  // console.log(t2 - t1);

  requestAnimationFrame(update);
}

update();

const rules = new Map();
rules.set("L", "L+L");

console.log(calc('L', rules, 2));