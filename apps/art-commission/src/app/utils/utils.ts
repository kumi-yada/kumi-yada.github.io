export function clampArrayIndex(idx: number, size: number) {
  const actualIdx = idx % size;
  return actualIdx < 0 ? size + actualIdx : actualIdx;
}
