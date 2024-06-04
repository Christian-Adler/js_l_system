import {DrawItem} from "./drawitem.mjs";

class ContextRestoreItem extends DrawItem {
  constructor(ltree) {
    super(ltree);
  }

  draw(ctx) {
    ctx.restore();
    this.ltree.goUp();
  }
}

export {ContextRestoreItem};