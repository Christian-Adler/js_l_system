import {LTree} from "./ltree/ltree.mjs";
import {calc} from "./ltree/lsystem.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;

const rules = new Map();
rules.set(">", `>>L[L>R>R>]R[R>L>L>]`);
const sentence = calc('>', rules, 4);

const lTree = new LTree({sentence, thickness: 4, step: 25});

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    canvas.width = worldWidth;
    canvas.height = worldHeight;

    lTree.stepStart = worldHeight / 44;
  }
};

updateWorldSettings();

const openSimplex = openSimplexNoise(Date.now());
let noiseInputVal = 1;
const noiseStep = 0.005;


const update = () => {

  noiseInputVal += noiseStep;
  const noiseVal = openSimplex.noise2D(noiseInputVal, 0) / 10;

  lTree.rotateLeftDeg = 20 + noiseVal;
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
