import {DrawItem} from "./drawitem.mjs";

class RotateRItem extends DrawItem {
  constructor(ltree) {
    super(ltree);
  }

  draw(ctx) {
    ctx.rotate(this.ltree.rotateRightRad);
  }
}

export {RotateRItem};