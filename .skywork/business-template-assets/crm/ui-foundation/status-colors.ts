export const crmStatusColors = ["#58b98f", "#6c8ef3", "#db951f", "#df5d4a", "#8b6ed8"];

export function crmStatusDot(value: string) {
  const normalized = value.toLowerCase();
  if (/cancel|archive|error|no-show/.test(normalized)) return "bg-[#df5d4a]";
  if (/attention|reorder|pending|draft|awaiting|nurture/.test(normalized)) return "bg-[#db951f]";
  if (/vip|recommended|active|live|healthy|delivered|paid|complete/.test(normalized)) return "bg-[#2f9c78]";
  return "bg-[#7a838e]";
}
