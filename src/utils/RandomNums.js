export default function getRandomNums(min, max, n) {
  if (n > max - min) {
    throw new Error('Range is too smal to generate unique numbers');
  }

  const random = new Set();
  const difference = max - min;

  while (random.size < n) {
    const number = Math.floor(Math.random() * difference) + min;

    random.add(number);
  }

  return Array.from(random);
}
