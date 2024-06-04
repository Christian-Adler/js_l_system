import {StepItem} from "./draw/stepitem.mjs";
import {RotateRItem} from "./draw/rotateritem.mjs";
import {ContextSaveItem} from "./draw/contextsaveitem.mjs";
import {ContextRestoreItem} from "./draw/contextrestoreitem.mjs";
import {RotateLItem} from "./draw/rotatelitem.mjs";

const degToRad = (deg) => {
  return deg * Math.PI / 180
};

class LTree {
  constructor({sentence, step = 100, stepFactor = 0.7, thickness = 1, rotateLeftDeg = 20, rotateRightDeg = 20} = {}) {
    this._drawItems = [];
    this._stepFactor = stepFactor;
    this._stepStart = step;
    this._step = step;
    this._depth = 1;
    this._thicknessMax = thickness;
    this._thickness = thickness;
    this._rotateLeftRad = degToRad(rotateLeftDeg);
    this._rotateRightRad = degToRad(rotateRightDeg);
    this.parseSentence(sentence);
  }

  parseSentence(sentence) {
    for (let i = 0; i < sentence.length; i++) {
      const c = sentence.charAt(i);

      if (c === '>') {
        this._drawItems.push(new StepItem(this));
      } else if (c === 'R') {
        this._drawItems.push(new RotateRItem(this));
      } else if (c === 'L') {
        this._drawItems.push(new RotateLItem(this));
      } else if (c === '[') {
        this._drawItems.push(new ContextSaveItem(this));
      } else if (c === ']') {
        this._drawItems.push(new ContextRestoreItem(this));
      }
    }
  }

  goDown() {
    this._depth++;
    this._step *= this._stepFactor;
    this._thickness = Math.max(1, this._thickness - 1);
  }

  goUp() {
    this._depth--;
    this._step *= 1 / this._stepFactor;
    this._thickness = Math.min(this._thicknessMax, this._thickness + 1);
  }

  set stepStart(value) {
    this._stepStart = Math.max(1, value);
  }

  get step() {
    return this._step;
  }

  get thickness() {
    return this._thickness;
  }

  get rotateLeftRad() {
    return this._rotateLeftRad;
  }

  get rotateRightRad() {
    return this._rotateRightRad;
  }


  set rotateLeftDeg(value) {
    this._rotateLeftRad = degToRad(value);
  }

  set rotateRightDeg(value) {
    this._rotateRightRad = degToRad(value);
  }

  draw(ctx) {
    this._step = this._stepStart;

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    for (const drawItem of this._drawItems) {
      drawItem.draw(ctx);
    }
    ctx.restore();
  }
}

export {LTree};