import { clampArrayIndex } from './utils';

test('should return index', () => {
  expect(clampArrayIndex(0, 5)).toEqual(0);
  expect(clampArrayIndex(1, 5)).toEqual(1);
  expect(clampArrayIndex(2, 5)).toEqual(2);
});

test('should return index larger length', () => {
  expect(clampArrayIndex(5, 5)).toEqual(0);
  expect(clampArrayIndex(6, 5)).toEqual(1);
  expect(clampArrayIndex(7, 5)).toEqual(2);
});

test('should return index smaller zero', () => {
  expect(clampArrayIndex(-1, 5)).toEqual(4);
  expect(clampArrayIndex(-2, 5)).toEqual(3);
  expect(clampArrayIndex(-3, 5)).toEqual(2);
});
