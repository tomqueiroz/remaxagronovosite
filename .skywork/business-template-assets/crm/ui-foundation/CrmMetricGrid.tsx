import type { CrmMetric } from "./types";

export function CrmMetricGrid({ metrics }: { metrics: CrmMetric[] }) {
  return <div className="grid gap-3 sm:grid-cols-3">{metrics.map((metric) => <div className="min-h-28 rounded-[15px] border border-[#e7e9f0] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(34,55,93,0.035)]" key={metric.label}><div className="text-xs font-medium text-[#77849a]">{metric.label}</div><div className="mt-3 text-2xl font-semibold tracking-normal text-[#172a4a]">{metric.value}</div>{metric.detail ? <div className="mt-2 text-xs text-[#40a47b]">{metric.detail}</div> : null}</div>)}</div>;
}
