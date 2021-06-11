function test(entry) {
  var fak = 1;
  
  for (let i = 1; i <= entry; i++) {
    fak = fak * i;
  }
  return fak;

}


console.log(test(8));
