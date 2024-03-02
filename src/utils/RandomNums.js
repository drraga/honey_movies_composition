export default function getRandomNums(min, max, n) {
  const random = [];
  const difference = max - min;
  for (let i = 0; i < n; i += 1) {
    random.push(Math.floor(Math.random() * difference) + min);
  }
  return random;
}
