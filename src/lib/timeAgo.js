export function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  const h = Math.floor(s / 3600);
  if (h < 1) return "Just now";
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}
