export default async function readFile(path: string) {
  const decoder = new TextDecoder('utf-8');
  const rawInput = await Deno.readFile(path).catch((err) => console.error(err));
  if (!rawInput) throw new Error('Cant read input.txt');

  return decoder.decode(rawInput);
}
