const natoPhoneticAlphabet: { [key: string]: string } = {
  A: "Alfa",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
  a: "alfa",
  b: "bravo",
  c: "charlie",
  d: "delta",
  e: "echo",
  f: "foxtrot",
  g: "golf",
  h: "hotel",
  i: "india",
  j: "juliett",
  k: "kilo",
  l: "lima",
  m: "mike",
  n: "november",
  o: "oscar",
  p: "papa",
  q: "quebec",
  r: "romeo",
  s: "sierra",
  t: "tango",
  u: "uniform",
  v: "victor",
  w: "whiskey",
  x: "x-ray",
  y: "yankee",
  z: "zulu",
};

/**
 * Converts a given string to its NATO phonetic alphabet equivalent.
 *
 * This function takes an input string and transforms each character into its
 * corresponding NATO phonetic alphabet word. Characters that do not have a
 * corresponding NATO phonetic alphabet word (such as punctuation or spaces)
 * remain unchanged in the output.
 *
 * Example usage:
 * ```
 * const result = toNatoPhonetic("Hello, World!");
 * console.log(result); // Outputs: "Hotel Echo Lima Lima Oscar , Whiskey Oscar Romeo Lima Delta !"
 * ```
 *
 * @param {string} input - The input string to be converted.
 * @returns {string} - A string where each character of the input is replaced by its
 *                     corresponding NATO phonetic alphabet word, separated by spaces.
 */
export function toNatoPhonetic(input: string): string {
  return input
    .split("")
    .map((char) => natoPhoneticAlphabet[char] || char)
    .join(" ");
}
