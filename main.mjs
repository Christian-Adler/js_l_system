import {calc} from "./lsystem.mjs";
import {drawSentence} from "./draw.js";
import {degToRad} from "./utils.js";

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
let angle = 25;
let angleAdd = 0.01;
const angleR = 25;
const update = () => {
  angle += angleAdd;
  if (angle > 25.5 || angle < 24.5) angleAdd *= -1;
  rules.set(">", `>>L(${angle})[L(${angle})>R(${angleR})>R(${angleR})>]R(${angleR})[R(${angleR})>L(${angle})>L(${angle})>]`);
  const sentence = calc('>', rules, 5);

  ctx.clearRect(0, 0, worldWidth, worldHeight);

  const t1 = new Date().getTime();
  ctx.save();
  ctx.translate(worldWidth / 2, worldHeight);
  ctx.rotate(degToRad(180));
  drawSentence({sentence, ctx, startStepWidth: 10});
  ctx.restore();
  const t2 = new Date().getTime();
  console.log(t2 - t1);

  updateWorldSettings();


  requestAnimationFrame(update);
}

update();

