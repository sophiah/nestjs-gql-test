export function mapFromArray<T>(
  array: T[],
  keyStrategy: (v: T) => string | number,
) {
  const map: Record<string | number, T | undefined> = {};

  for (const item of array) {
    map[keyStrategy(item)] = item;
  }

  return map;
}

export function newId(length) {
  return Math.random()
      .toString(36)
      .substring(length);
}

export function getRandomArray(prefix, arrayLen, valLen) : string[] {
  var rtn : string[] = []
  for (let i = 0; i < arrayLen; i++) {
    rtn.push(prefix + '-' + newId(valLen));
  }
  return rtn
}