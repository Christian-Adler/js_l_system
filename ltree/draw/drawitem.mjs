class DrawItem {
  constructor(ltree) {
    this.ltree = ltree;
  }

  draw(ctx) {
    console.log('overwrite');
  }
}

export {DrawItem};