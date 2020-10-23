let itemPos: [number, number] = [0, 0];
let observers: PositionObserver[] = [];
export type PositionObserver = ((position: [number, number]) => void) | null

function emitChange() {
  observers.forEach((o) => o && o(itemPos));
}

export function observe(o: PositionObserver): () => void {
  observers.push(o);
  emitChange();

  return () => {
    observers = observers.filter(t => t !== o);
  };
}

export function moveItem(toCol: number, toRow: number): void {
  itemPos = [toCol, toRow];
  emitChange();
}