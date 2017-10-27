function removeDuplicatesBy(arr, selectKey) {
  let dict = {};

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (!(selectKey(element) in dict)) {
      dict[selectKey(element)] = element;
    }
  }

  return Object.values(dict);
}

export default removeDuplicatesBy;
