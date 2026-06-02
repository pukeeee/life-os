/**
 * Легкий SVG-спарклайн без зовнішніх залежностей (server component). Достатньо
 * для мініатюрних трендів; повноцінні графіки (recharts) можна додати пізніше.
 */
export function Sparkline({
  points,
  width = 120,
  height = 32,
  color,
}: {
  points: number[];
  width?: number;
  height?: number;
  color?: string | null;
}) {
  const stroke = color ?? "currentColor";
  const pad = 2;

  if (points.length === 0) {
    return <svg width={width} height={height} aria-hidden />;
  }

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const innerH = height - pad * 2;
  const stepX = points.length > 1 ? width / (points.length - 1) : 0;

  const coords = points.map((v, i) => {
    const x = i * stepX;
    const y = pad + (1 - (v - min) / range) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      {points.length === 1 ? (
        <circle cx={0} cy={height / 2} r={2.5} fill={stroke} />
      ) : (
        <polyline
          points={coords.join(" ")}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
