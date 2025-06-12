export default function delay(miliseconds: number) {
  return new Promise((res) => setTimeout(res, miliseconds));
}
