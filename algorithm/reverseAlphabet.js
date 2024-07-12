function reverseAlphabet(str) {
    const alphabets = str.replace(/[^a-zA-Z]/g, '');
    const numbers = str.replace(/[a-zA-Z]/g, '');
    return alphabets.split('').reverse().join('') + numbers;
  }
  
  const inputStr = "NEGIE1";
  console.log(reverseAlphabet(inputStr)); // Output: "EIGEN1"
  