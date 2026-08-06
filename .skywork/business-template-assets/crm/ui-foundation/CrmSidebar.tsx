import { ChevronLeft, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { CrmNavigationItem } from "./types";

export function CrmSidebar({ activeId, items, footer, onChange }: { activeId: string; items: CrmNavigationItem[]; footer?: string; onChange: (id: string) => void }) {
  const [compact, setCompact] = useState(false);
  return <aside className={["hidden shrink-0 rounded-[18px] border border-[#e7e9f0] bg-white p-2 shadow-[0_8px_30px_rgba(34,55,93,0.035)] lg:flex lg:flex-col", compact ? "w-16" : "w-40"].join(" ")}>
    <nav className="flex-1 py-0.5" aria-label="CRM sections">{items.map((item) => <CrmNavButton active={item.id === activeId} compact={compact} icon={item.icon ?? LayoutDashboard} key={item.id} label={item.id === "overview" ? "Dashboard" : item.label} onClick={() => onChange(item.id)} />)}</nav>
    {!compact && footer ? <div className="mt-auto px-2 pb-2 pt-4 text-xs leading-5 text-[#8994a8]"><div className="font-medium text-[#52617a]">{footer}</div></div> : null}
    <div className="border-t border-[#eef0f5] pt-2"><CrmNavButton compact={compact} icon={ChevronLeft} label="Collapse" onClick={() => setCompact((current) => !current)} /></div>
  </aside>;
}

function CrmNavButton({ active = false, compact, icon: Icon, label, onClick }: { active?: boolean; compact: boolean; icon: LucideIcon; label: string; onClick: () => void }) {
  return <button aria-label={label} className={["mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-2.5 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9adff]", active ? "border border-[#ddd5ff] bg-[#f0edff] text-[#6847ff] shadow-sm" : "text-[#66738a] hover:bg-[#f6f7fb] hover:text-[#3c4e6b]", compact ? "justify-center px-0" : ""].join(" ")} onClick={onClick} title={compact ? label : undefined} type="button"><Icon className="size-3.5 shrink-0" strokeWidth={active ? 2.2 : 1.8} />{!compact ? <span className="truncate">{label}</span> : null}</button>;
}
