import type { CrmNavigationItem } from "./types";

export function CrmMobileNavigation({ activeId, items, onChange }: { activeId: string; items: CrmNavigationItem[]; onChange: (id: string) => void }) {
  return <nav aria-label="CRM mobile sections" className="flex gap-1 overflow-x-auto rounded-[15px] border border-[#e7e9f0] bg-white p-1.5 shadow-[0_8px_30px_rgba(34,55,93,0.035)] lg:hidden">{items.map((item) => <button className={["h-8 shrink-0 rounded-md px-3 text-xs", item.id === activeId ? "bg-[#f0edff] font-medium text-[#6847ff] shadow-sm ring-1 ring-[#ddd5ff]" : "text-[#66738a]"].join(" ")} key={item.id} onClick={() => onChange(item.id)} type="button">{item.id === "overview" ? "Dashboard" : item.label}</button>)}</nav>;
}
