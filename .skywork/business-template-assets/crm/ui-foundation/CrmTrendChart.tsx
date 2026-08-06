import type { CrmTrendPoint } from "./types";

export function CrmTrendChart({ label = "Revenue trend", points, summary, supportingText }: { label?: string; points: CrmTrendPoint[]; summary?: string; supportingText?: string }) {
  const hasPoints = points.length > 0;
  const max = hasPoints ? Math.max(1, ...points.map((point) => point.value)) : 1;
  const chartPoints = hasPoints
    ? points.map((point, index) => ({
      x: points.length === 1 ? 360 : (index * 720) / (points.length - 1),
      y: 166 - (point.value / max) * 110,
    }))
    : [];
  const coordinates = chartPoints.map((point) => `${point.x} ${point.y}`).join(" L");
  const singlePoint = chartPoints[0];
  const linePath = points.length === 1 && singlePoint ? `M0 ${singlePoint.y} L720 ${singlePoint.y}` : `M${coordinates}`;
  const fillPath = points.length === 1 && singlePoint ? `M0 180 L0 ${singlePoint.y} L720 ${singlePoint.y} L720 180 Z` : `M0 180 L${coordinates} L720 180 Z`;

  return <section aria-label={label} className="rounded-[15px] border border-[#e7e9f0] bg-white p-4 shadow-[0_8px_30px_rgba(34,55,93,0.035)] sm:p-5"><div className="flex items-start justify-between gap-3"><div><div className="text-sm font-semibold text-[#263955]">{label}</div>{supportingText ? <div className="mt-1 text-xs text-[#8994a8]">{supportingText}</div> : null}</div>{summary ? <div className="text-right text-lg font-semibold text-[#172a4a]">{summary}</div> : null}</div><div className="mt-4 h-36"><svg aria-hidden="true" className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 720 180"><defs><linearGradient id="crm-trend-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7459ff" stopOpacity="0.2" /><stop offset="100%" stopColor="#7459ff" stopOpacity="0" /></linearGradient></defs>{[34, 78, 122, 166].map((y) => <line key={y} stroke="#e9eaf1" strokeDasharray="3 4" strokeWidth="1" x1="0" x2="720" y1={y} y2={y} />)}{hasPoints ? <><path d={fillPath} fill="url(#crm-trend-fill)" /><path d={linePath} fill="none" stroke="#6847ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></> : null}</svg>{hasPoints ? null : <div className="-mt-20 text-center text-xs font-medium text-[#8b93a0]">No trend data</div>}</div><div className={`mt-1 flex text-[10px] text-[#9aa4b5] ${points.length === 1 ? "justify-center" : "justify-between"}`}>{points.map((point) => <span key={point.label}>{point.label}</span>)}</div></section>;
}
