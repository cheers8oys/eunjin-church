describe("Jest 셋업 확인", () => {
  it("테스트 환경이 정상 동작한다", () => {
    expect(true).toBe(true);
  });

  it("cn 유틸리티가 정상 동작한다", () => {
    const { cn } = require("@/lib/utils");
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
  });
});
