const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (val: any, key: string): boolean => hasOwnProperty.call(val, key);

export const  fromPairs = (pairs: any) => {
    var index = -1,
        length = pairs == null ? 0 : pairs.length,
        result = {};
  
    while (++index < length) {
      var pair = pairs[index];
      result[pair[0]] = pair[1];
    }
    return result;
}