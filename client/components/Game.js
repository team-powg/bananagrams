let observer = null;
let tilePosition = [1, 7];

/* ... */

export function canMoveTile(toX, toY) {
  const [x, y] = tilePosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

function emitChange() {
  observer(tilePosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveTile(toX, toY) {
  tilePosition = [toX, toY];
  emitChange();
}