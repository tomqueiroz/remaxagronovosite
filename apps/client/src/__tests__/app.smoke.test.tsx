import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";

afterEach(() => {
  cleanup();
});

describe("app smoke", () => {
  it("renders the application without throwing", () => {
    const { container } = render(<App />);

    expect(container.firstChild).not.toBeNull();
  });
});
