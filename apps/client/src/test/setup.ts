import { vi } from "vitest";

// Test-only public configuration. These values are intentionally fictitious and
// exist solely so importing the application exercises the production module tree
// without depending on developer or CI environment variables.
vi.stubEnv("VITE_SUPABASE_URL", "https://test.supabase.co");
vi.stubEnv("VITE_SUPABASE_ANON_KEY", "test-anon-key");

// Supabase captures a WebSocket constructor while its client is created. The
// smoke test never opens a realtime connection, but Node does not expose the
// browser constructor available in production.
vi.stubGlobal("WebSocket", class TestWebSocket {});

// Keep the smoke deterministic and offline. Third-party scripts (Leadster) are
// still inserted by the app, but happy-dom treats their disabled loading as a
// successful browser operation instead of downloading and evaluating them.
const happyDOM = (
  window as typeof window & {
    happyDOM?: {
      settings: {
        disableJavaScriptFileLoading: boolean;
        handleDisabledFileLoadingAsSuccess: boolean;
      };
    };
  }
).happyDOM;

if (happyDOM) {
  happyDOM.settings.disableJavaScriptFileLoading = true;
  happyDOM.settings.handleDisabledFileLoadingAsSuccess = true;
}
