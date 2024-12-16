export function newLineToP(string) {
  return string
    .split("\n")
    .map((line, index) => <span key={index}>{line}</span>);
}
