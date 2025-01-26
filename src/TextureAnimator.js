var THREE = require('three');

// based on http://stemkoski.github.io/Three.js/Texture-Animation.html
class TextureAnimator {
  constructor(
    texture,
    tilesVert,
    tilesHoriz,
    numTiles,
    tileDispDuration,
    repeatAtTile
  ) {
    this.repeatAtTile = repeatAtTile;
    this.shutDownFlag = this.repeatAtTile === undefined;
    this.done = false;

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    this.texture = texture;

    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles;
    this.texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.texture.offset.y = 1;
    this.shutDownCb = function () {};
  }
  update(milliSec) {
    this.currentDisplayTime += milliSec;
    while (!this.done && this.currentDisplayTime > this.tileDisplayDuration) {
      if (this.shutDownFlag && this.currentTile >= this.numberOfTiles) {
        this.done = true;
        this.shutDownCb();
      } else {
        this.currentDisplayTime -= this.tileDisplayDuration;
        this.currentTile++;
        if (this.currentTile == this.numberOfTiles && !this.shutDownFlag)
          this.currentTile = this.repeatAtTile;
        var currentColumn = this.currentTile % this.tilesHorizontal;
        this.texture.offset.x = currentColumn / this.tilesHorizontal;
        var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
        this.texture.offset.y =
          1 - currentRow / this.tilesVertical - 1 / this.tilesVertical;
      }
    }
  }
  shutDown(cb) {
    this.shutDownFlag = true;
    this.shutDownCb = cb;
  }
}

module.exports = TextureAnimator;
