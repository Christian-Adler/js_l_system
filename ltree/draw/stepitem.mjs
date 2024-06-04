import {DrawItem} from "./drawitem.mjs";

class StepItem extends DrawItem {
  constructor(ltree) {
    super(ltree);
  }

  draw(ctx) {
    // ctx.strokeStyle = 'rgba(255,255,255,0.8)'; // TODO change  color
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.ltree.step);
    ctx.lineWidth = this.ltree.thickness;
    ctx.stroke();

    ctx.translate(0, this.ltree.step);
  }
}

export {StepItem};