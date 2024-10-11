import { capitalizeFirst } from "@/utils/text";

test("Capitalize first letter", () => {
  expect(capitalizeFirst("hello world!")).toBe("Hello world!");
});
