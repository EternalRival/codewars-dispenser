export function parseKataSlugs(input: string) {
  return Array.from(input.matchAll(/codewars\.com\/kata\/([^/?#\s]+)\/?/g)).reduce<string[]>((acc, [, slug]) => {
    if (typeof slug === 'string') {
      acc.push(slug);
    }

    return acc;
  }, []);
}
