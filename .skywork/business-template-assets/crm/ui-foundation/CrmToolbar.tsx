import { ChevronDown, Filter, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CrmSiteOption } from "./types";

export function CrmToolbar({
  searchLabel,
  searchPlaceholder,
  searchValue,
  sites,
  siteId,
  onSearchChange,
  onSiteChange,
  onFilter,
  onRefresh,
}: {
  searchLabel: string;
  searchPlaceholder?: string;
  searchValue: string;
  sites: CrmSiteOption[];
  siteId: string;
  onSearchChange: (value: string) => void;
  onSiteChange: (id: string) => void;
  onFilter?: () => void;
  onRefresh: () => void;
}) {
  const activeSite = sites.find((site) => site.id === siteId);

  return (
    <div className="mt-3 rounded-[15px] border border-[#e7e9f0] bg-white p-3 shadow-[0_8px_30px_rgba(34,55,93,0.035)] sm:p-3.5">
      <div className="flex flex-col gap-2.5 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="relative block min-w-0 flex-1 xl:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8b93a0]" />
            <Input
              aria-label={searchLabel}
              className="h-9 border-[#e2e6ee] bg-[#fbfcff] pl-8 text-xs shadow-none placeholder:text-[#9aa1ac] focus-visible:border-[#b9adff] focus-visible:ring-2 focus-visible:ring-[#e8e4ff]"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder ?? searchLabel}
              value={searchValue}
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative flex h-9 min-w-42 items-center gap-2 rounded-lg border border-[#e2e6ee] bg-[#fbfcff] px-2.5 text-xs text-[#626f86]">
              <span className="sr-only">Website</span>
              <span className="max-w-36 truncate">{activeSite?.label}</span>
              <select
                aria-label="Website"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={(event) => onSiteChange(event.target.value)}
                value={siteId}
              >
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="ml-auto size-3.5 text-[#9299a5]" />
            </label>
            {onFilter ? (
              <Button
                className="h-9 rounded-lg border-[#e2e6ee] bg-white px-2.5 text-xs font-medium text-[#52617a] shadow-none hover:bg-[#f5f7fb]"
                onClick={onFilter}
                size="sm"
                type="button"
                variant="outline"
              >
                <Filter className="size-3.5" /> Filter
              </Button>
            ) : null}
          </div>
        </div>
        <Button
          aria-label="Refresh view"
          className="h-9 self-start rounded-lg border-[#e2e6ee] bg-white px-3 text-xs font-medium text-[#52617a] shadow-none hover:bg-[#f5f7fb] xl:ml-auto xl:self-auto"
          onClick={onRefresh}
          size="sm"
          type="button"
          variant="outline"
        >
          <RefreshCw className="size-3.5" /> Refresh
        </Button>
      </div>
    </div>
  );
}
