import {DrawItem} from "./drawitem.mjs";

class RotateLItem extends DrawItem {
  constructor(ltree) {
    super(ltree);
  }

  draw(ctx) {
    ctx.rotate(-this.ltree.rotateLeftRad);
  }
}

export {RotateLItem};