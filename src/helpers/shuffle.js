export default function shuffle(array) {
  const arrayCopy = array.slice();
  let counter = arrayCopy.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arrayCopy[counter];
    arrayCopy[counter] = arrayCopy[index];
    arrayCopy[index] = temp;
  }

  return arrayCopy;
}
