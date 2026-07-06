import { buildUrl } from "./api";

describe("API helpers", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  describe("buildUrl", () => {
    it("should build URL with default base", () => {
      const url = buildUrl("/projects");
      expect(url).toBe("http://localhost:3000/projects");
    });

    it("should build URL with custom base from env", () => {
      process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000";
      const url = buildUrl("/projects");
      expect(url).toBe("http://localhost:3000/projects");
    });

    it("should handle query parameters", () => {
      const url = buildUrl("/projects", { tag: "react" });
      expect(url).toContain("/projects");
      expect(url).toContain("tag=react");
    });

    it("should handle multiple query parameters", () => {
      const url = buildUrl("/projects", {
        tag: "react",
        category: "framework",
      });
      expect(url).toContain("tag=react");
      expect(url).toContain("category=framework");
    });
  });
});
