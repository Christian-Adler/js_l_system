import {DrawItem} from "./drawitem.mjs";

class ContextSaveItem extends DrawItem {
  constructor(ltree) {
    super(ltree);
  }

  draw(ctx) {
    ctx.save();
    this.ltree.goDown();
  }
}

export {ContextSaveItem};