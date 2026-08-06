import type { ReactNode } from "react";

export function CrmAppShell({ children, navigation, mobileNavigation }: { children: ReactNode; navigation: ReactNode; mobileNavigation: ReactNode }) {
  return <main className="min-h-screen bg-[#f8f9fc] p-1.5 text-[#172a4a] sm:p-2"><div className="mx-auto max-w-[1880px]"><div className="flex min-h-[calc(100vh-1rem)] gap-3">{navigation}<section className="min-w-0 flex-1 pb-6">{mobileNavigation}{children}</section></div></div></main>;
}
