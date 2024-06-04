import {LTree} from "./ltree/ltree.mjs";
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

updateWorldSettings();

const rules = new Map();
let angleL = 20;
let angleAdd = 0.001;
let angleR = 20;

rules.set(">", `>>L[L>R>R>]R[R>L>L>]`);
const sentence = calc('>', rules, 5);

const lTree = new LTree({sentence, thickness: 5, step: 15});

const update = () => {
  angleL += angleAdd; // TODO use noise to get a smooth natural wave
  if (angleL >= 20.1 || angleL <= 19.9) angleAdd *= -1;
  lTree.rotateLeftDeg = angleL;
  ctx.clearRect(0, 0, worldWidth, worldHeight);

  const t1 = new Date().getTime();
  ctx.save();
  ctx.translate(worldWidth / 2, worldHeight);
  ctx.rotate(Math.PI);
  lTree.draw(ctx);
  ctx.restore();
  const t2 = new Date().getTime();
  // console.log(t2 - t1);

  updateWorldSettings();


  requestAnimationFrame(update);
}

update();
