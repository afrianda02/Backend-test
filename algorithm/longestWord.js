function longestWord(sentence) {
    const words = sentence.split(' ');
    let longest = '';
  
    for (let word of words) {
      if (word.length > longest.length) {
        longest = word;
      }
    }
  
    return `${longest}: ${longest.length} character`;
  }
  
  const sentence = "Saya sangat senang mengerjakan soal algoritma";
  console.log(longestWord(sentence)); // Output: "mengerjakan: 11 character"
  