function countOccurrences(inputArray, queryArray) {
    return queryArray.map(query => inputArray.filter(word => word === query).length);
  }
  
  const INPUT = ['xc', 'dz', 'bbb', 'dz'];
  const QUERY = ['bbb', 'ac', 'dz'];
  console.log(countOccurrences(INPUT, QUERY)); // Output: [1, 0, 2]
  