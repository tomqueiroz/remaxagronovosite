import { useMemo, useState } from "react";
import { Boxes, CalendarClock, LayoutDashboard, ListFilter, Package, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  CrmAppShell,
  CrmDataTable,
  CrmMetricGrid,
  CrmMobileNavigation,
  CrmPagination,
  CrmSidebar,
  CrmStatusChart,
  CrmToolbar,
  CrmTrendChart,
  type CrmNavigationItem,
} from "../ui-foundation";

type CrmReferenceRow = { cells: string[]; status: string };
type CrmReferenceTab = { id: string; label: string; heading: string; description: string; action: string; actions?: string[]; columns: string[]; rows: CrmReferenceRow[] };
type CrmReferenceMetric = { label: string; value: string; source: string };
type CrmReferenceSite = { id: string; label: string; caption: string; badge?: string; metrics: CrmReferenceMetric[]; tabs: CrmReferenceTab[] };
export type CrmReferenceFixture = { eyebrow: string; title: string; description: string; tabs: CrmReferenceTab[]; sites?: CrmReferenceSite[] };

const navIcons: LucideIcon[] = [LayoutDashboard, Package, CalendarClock, Users, Boxes, ListFilter];
const demoTrend = [
  { label: "7/20", value: 8 }, { label: "7/21", value: 8 }, { label: "7/22", value: 8 },
  { label: "7/23", value: 8 }, { label: "7/25", value: 22 }, { label: "7/26", value: 22 },
];

// This reference is deliberately the Foundation's fixture consumer. Runtime CRM modules bind their own data and callbacks.
export function CrmScenarioReference({ fixture }: { fixture: CrmReferenceFixture }) {
  const sites = fixture.sites?.length ? fixture.sites : [fallbackSite(fixture)];
  const [siteId, setSiteId] = useState(sites[0].id);
  const [tabId, setTabId] = useState(fixture.tabs[0]?.id ?? "overview");
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const activeSite = useMemo(() => sites.find((site) => site.id === siteId) ?? sites[0], [siteId, sites]);
  const activeTab = useMemo(() => resolveSiteTab(activeSite, fixture.tabs.find((tab) => tab.id === tabId) ?? fixture.tabs[0]), [activeSite, fixture.tabs, tabId]);
  const navigation: CrmNavigationItem[] = fixture.tabs.map((tab, index) => ({ id: tab.id, label: tab.label, icon: navIcons[index % navIcons.length] }));
  if (!activeTab) return null;
  const selectTab = (nextTabId: string) => { setTabId(nextTabId); setSelectedRows(new Set()); setQuery(""); setPage(1); };
  const selectSite = (nextSiteId: string) => { setSiteId(nextSiteId); setSelectedRows(new Set()); setPage(1); };
  const resetView = () => { setQuery(""); setSelectedRows(new Set()); setPage(1); };

  return <CrmAppShell navigation={<CrmSidebar activeId={activeTab.id} footer={activeSite.label} items={navigation} onChange={selectTab} />} mobileNavigation={<CrmMobileNavigation activeId={activeTab.id} items={navigation} onChange={selectTab} />}>
    <CrmToolbar onRefresh={resetView} onSearchChange={(value) => { setQuery(value); setPage(1); }} onSiteChange={selectSite} searchLabel={`Search ${activeTab.label}`} searchPlaceholder={`Search ${activeTab.label.toLowerCase()}`} searchValue={query} siteId={activeSite.id} sites={sites.map(({ id, label }) => ({ id, label }))} />
    <div className="pt-3">{activeTab.id === "overview" ? <DashboardContent site={activeSite} tab={activeTab} /> : <ListContent onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} onToggleRow={(id) => setSelectedRows((current) => toggleSetValue(current, id))} page={page} pageSize={pageSize} query={query} selectedRows={selectedRows} site={activeSite} tab={activeTab} />}</div>
  </CrmAppShell>;
}

function DashboardContent({ site, tab }: { site: CrmReferenceSite; tab: CrmReferenceTab }) {
  const statusTab = site.tabs.find((candidate) => candidate.id === "orders") ?? site.tabs.find((candidate) => candidate.id === "reservations") ?? tab;
  const slices = Array.from(statusTab.rows.reduce((counts, row) => counts.set(row.status, (counts.get(row.status) ?? 0) + 1), new Map<string, number>()), ([label, value]) => ({ label, value }));
  return <div><CrmMetricGrid metrics={site.metrics.map((metric) => ({ label: metric.label, value: metric.value, detail: metric.source }))} /><div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]"><CrmTrendChart points={demoTrend} supportingText="Settled revenue over the current period" summary="Current period" /><CrmStatusChart label={statusTab.id === "orders" ? "Order status" : `${statusTab.label} status`} slices={slices} /></div><section className="mt-3 overflow-hidden rounded-[15px] border border-[#e7e9f0] bg-white shadow-[0_8px_30px_rgba(34,55,93,0.035)]"><div className="border-b border-[#e8ebf1] px-4 py-3"><div className="text-sm font-semibold text-[#263955]">{site.label}</div><div className="mt-0.5 text-xs text-[#8994a8]">Current operating signals</div></div><ReferenceRows tab={tab} /></section></div>;
}

function ListContent({ onPageChange, onPageSizeChange, onToggleRow, page, pageSize, query, selectedRows, site, tab }: { onPageChange: (page: number) => void; onPageSizeChange: (size: number) => void; onToggleRow: (id: string) => void; page: number; pageSize: number; query: string; selectedRows: Set<string>; site: CrmReferenceSite; tab: CrmReferenceTab }) {
  const visibleRows = tab.rows.filter((row) => !query.trim() || [...row.cells, row.status].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(visibleRows.length / pageSize)); const currentPage = Math.min(page, totalPages);
  const rows = visibleRows.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row) => ({ ...row, id: `${site.id}-${tab.id}-${row.cells[0]}` }));
  return <div><div className="mb-3 flex flex-wrap items-end justify-between gap-3 px-1 sm:px-2"><div><div className="text-[11px] font-medium text-[#6847ff]">List view · {site.label}</div><h1 className="mt-1 text-xl font-semibold text-[#172a4a]">{tab.heading}</h1><p className="mt-1 text-sm text-[#77849a]">{tab.description}</p></div><div className="rounded-full bg-[#f1efff] px-2.5 py-1 text-xs font-medium text-[#735cf0]">{selectedRows.size ? `${selectedRows.size} selected` : `${visibleRows.length} records`}</div></div><CrmDataTable columns={tab.columns.map((label, index) => ({ id: `${index}`, label, render: (row: { cells: string[] }) => index === 0 ? <span className="font-medium text-[#263955]">{row.cells[index]}</span> : row.cells[index] }))} onToggleRow={onToggleRow} rows={rows} selectedIds={selectedRows} /><CrmPagination onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} state={{ page: currentPage, pageSize, total: visibleRows.length }} /></div>;
}

function ReferenceRows({ tab }: { tab: CrmReferenceTab }) {
  return <CrmDataTable columns={tab.columns.map((label, index) => ({ id: `${index}`, label, render: (row: { cells: string[] }) => row.cells[index] }))} rows={tab.rows.map((row) => ({ ...row, id: row.cells[0] }))} />;
}

function toggleSetValue(values: Set<string>, value: string) { const next = new Set(values); if (next.has(value)) next.delete(value); else next.add(value); return next; }
function resolveSiteTab(site: CrmReferenceSite, baseTab?: CrmReferenceTab) { return baseTab ? site.tabs.find((tab) => tab.id === baseTab.id) ?? baseTab : undefined; }
function fallbackSite(fixture: CrmReferenceFixture): CrmReferenceSite { return { id: "all", label: "All websites", caption: "Aggregated CRM view for every connected website.", badge: "Total", metrics: fixture.tabs[0]?.rows.map((row) => ({ label: row.cells[0], value: row.cells[1] ?? "-", source: row.cells[2] ?? "CRM" })) ?? [], tabs: fixture.tabs }; }
