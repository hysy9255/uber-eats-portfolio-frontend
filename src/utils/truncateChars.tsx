/**
 * 문자열을 "문자(그래프림) 단위"로 잘라서 반환.
 * - max: 최대 문자 수
 * - ellipsis: 넘칠 때 뒤에 붙일 기호(기본 '…')
 * - preserveWords: 단어 중간 자르기 방지 (영문/공백 기반)
 */
export function truncateChars(
  input: string,
  max: number,
  options?: { ellipsis?: string; preserveWords?: boolean }
): string {
  const ellipsis = options?.ellipsis ?? "…";
  const preserveWords = options?.preserveWords ?? false;
  if (typeof input !== "string" || max <= 0) return "";

  // 1) 그래프림 단위로 분해 (권장: 최신 브라우저/런타임)
  const segments: string[] = (() => {
    if (typeof (Intl as any).Segmenter === "function") {
      const seg = new (Intl as any).Segmenter(undefined, {
        granularity: "grapheme",
      });
      return Array.from(seg.segment(input), (s: any) => s.segment);
    }
    // 2) 폴백: code point 단위 (대부분 이모지 안전, 일부 조합 이모지는 분리될 수 있음)
    return Array.from(input);
  })();

  if (segments.length <= max) return input;

  let cut = segments.slice(0, max).join("");

  if (preserveWords) {
    // 공백 기준으로 마지막 단어 경계로 뒤로 물림
    const lastSpace = cut.search(/\s(?!.*\s)/); // 마지막 공백 인덱스
    if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  }

  // 뒤에 이미 구두점 등이 있다면 필요에 따라 트림
  cut = cut.trimEnd();
  return cut + ellipsis;
}
