import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";

afterEach(() => {
  cleanup();
});

describe("app smoke", () => {
  it("renders the application and initializes Leadster before loading its script", () => {
    const { container } = render(<App />);
    const leadsterWindow = window as typeof window & { neuroleadId?: string };
    const leadsterScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://cdn.leadster.com.br/neurolead/neurolead.min.js"]',
    );

    expect(container.firstChild).not.toBeNull();
    expect(leadsterWindow.neuroleadId).toBe("lLZdETgxQb8iPXIbJi1rWtlrb");
    expect(leadsterScript).not.toBeNull();
    expect(leadsterScript?.parentElement).toBe(document.head);
    expect(leadsterScript?.charset).toBe("UTF-8");
  });
});
