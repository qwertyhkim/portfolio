import type { ProjectChart } from "@/lib/content";

// One visual per project, drawn in the site's own colors.
// matrix: 2x2 framework (no data points)
// bars:   horizontal bars around a baseline (real results only)
// curve:  conceptual trend with no numbers on the axes

export default function ProjectChartView({ chart }: { chart: ProjectChart }) {
  return (
    <section className="detail-block">
      <figure className="chart-card">
        <h3 className="chart-title">{chart.heading}</h3>
        {chart.kind === "matrix" && <Matrix chart={chart} />}
        {chart.kind === "bars" && <Bars chart={chart} />}
        {chart.kind === "curve" && <Curve chart={chart} />}
        {chart.kind === "flow" && <Flow chart={chart} />}
        {chart.kind === "slope" && <Slope chart={chart} />}
        {chart.kind === "forecast" && <Forecast chart={chart} />}
        {chart.kind === "process" && <Process chart={chart} />}
        {chart.kind === "corridor" && <Corridor chart={chart} />}
        <figcaption className="chart-caption">{chart.caption}</figcaption>
      </figure>
    </section>
  );
}

function Matrix({ chart }: { chart: Extract<ProjectChart, { kind: "matrix" }> }) {
  return (
    <div className="matrix">
      <div className="matrix-y">
        <span>{chart.y.low}</span>
        <strong>{chart.y.label}</strong>
        <span>{chart.y.high}</span>
      </div>
      <div className="matrix-grid">
        {chart.quadrants.map((q) => (
          <div key={q.title} className={`quad${q.highlight ? " quad-hl" : ""}`}>
            <span className="quad-title">{q.title}</span>
            <span className="quad-text">{q.text}</span>
          </div>
        ))}
      </div>
      <div className="matrix-x">
        <span>{chart.x.low}</span>
        <strong>{chart.x.label}</strong>
        <span>{chart.x.high}</span>
      </div>
    </div>
  );
}

function Bars({ chart }: { chart: Extract<ProjectChart, { kind: "bars" }> }) {
  const pos = (v: number) => ((v - chart.min) / (chart.max - chart.min)) * 100;
  const base = pos(chart.baseline);
  const step = chart.step ?? 0.2;
  const dec = chart.decimals ?? 2;
  const anyHl = chart.rows.some((r) => r.highlight);
  const round = (v: number) => Math.round(v * 1000) / 1000;
  const ticks: number[] = [];
  for (let t = chart.baseline; t >= chart.min - 1e-9; t -= step) ticks.unshift(round(t));
  for (let t = chart.baseline + step; t <= chart.max + 1e-9; t += step) ticks.push(round(t));
  const tickDec = step < 0.1 ? 2 : 1;

  return (
    <div className="bars" role="table" aria-label={chart.heading}>
      {chart.rows.map((r) => {
        const up = r.value >= chart.baseline;
        const tone = anyHl ? (r.highlight ? "bar-up" : "bar-down") : up ? "bar-up" : "bar-down";
        const shape = up ? "bar-r" : "bar-l";
        const left = up ? base : pos(r.value);
        const width = Math.abs(pos(r.value) - base);
        return (
          <div key={r.label} className="bar-row" role="row" title={`${r.label}: ${r.value.toFixed(dec)}`}>
            <span className="bar-label" role="cell">{r.label}</span>
            <span className="bar-track" role="cell">
              <span className="bar-base" style={{ left: `${base}%` }} />
              <span
                className={`bar ${tone} ${shape}`}
                style={{ left: `${left}%`, width: `${width}%` }}
              />
              <span
                className={`bar-value ${up ? "bar-value-up" : "bar-value-down"}`}
                style={up ? { left: `calc(${left + width}% + 6px)` } : { right: `calc(${100 - left}% + 6px)` }}
              >
                {r.value.toFixed(dec)}
              </span>
            </span>
          </div>
        );
      })}
      <div className="bar-row bar-axis" aria-hidden="true">
        <span className="bar-label" />
        <span className="bar-track">
          {ticks.map((t) => (
            <span key={t} className="bar-tick" style={{ left: `${pos(t)}%` }}>
              {t.toFixed(tickDec)}
            </span>
          ))}
        </span>
      </div>
      <div className="bar-row bar-axis-label" aria-hidden="true">
        <span className="bar-label" />
        <span className="bar-track-label">{chart.axisLabel}</span>
      </div>
    </div>
  );
}

type CurveLayout = {
  w: number; h: number; x0: number; x1: number; y0: number; y1: number;
  path: string; a: [number, number]; b: [number, number];
  startNote: [number, number]; endNote: [number, number]; gap: number;
};

const WIDE: CurveLayout = {
  w: 600, h: 320, x0: 70, x1: 570, y0: 30, y1: 260,
  path: "M 90 52 C 210 175, 340 222, 550 238", a: [90, 52], b: [550, 238],
  startNote: [112, 50], endNote: [550, 178], gap: 20,
};
const NARROW: CurveLayout = {
  w: 340, h: 300, x0: 20, x1: 330, y0: 30, y1: 240,
  path: "M 36 54 C 110 170, 190 205, 314 218", a: [36, 54], b: [314, 218],
  startNote: [54, 52], endNote: [314, 148], gap: 19,
};

function Curve({ chart }: { chart: Extract<ProjectChart, { kind: "curve" }> }) {
  return (
    <>
      <CurveSvg chart={chart} L={WIDE} className="curve curve-wide" />
      <CurveSvg chart={chart} L={NARROW} className="curve curve-narrow" />
    </>
  );
}

function CurveSvg({ chart, L, className }: { chart: Extract<ProjectChart, { kind: "curve" }>; L: CurveLayout; className: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${L.w} ${L.h}`} role="img" aria-label={`${chart.y} falls as ${chart.x.label.toLowerCase()} rises`}>
      <line x1={L.x0} y1={L.y0} x2={L.x0} y2={L.y1} className="curve-axis" />
      <line x1={L.x0} y1={L.y1} x2={L.x1} y2={L.y1} className="curve-axis" />
      <text x={L.x0} y={L.y0 - 10} className="curve-axis-label">{chart.y}</text>
      <text x={L.x0} y={L.y1 + 22} className="curve-tick">{chart.x.low}</text>
      <text x={L.x1} y={L.y1 + 22} className="curve-tick" textAnchor="end">{chart.x.high}</text>
      <text x={(L.x0 + L.x1) / 2} y={L.y1 + 46} className="curve-axis-label" textAnchor="middle">{chart.x.label} →</text>

      <path d={L.path} className="curve-line" />

      <circle cx={L.a[0]} cy={L.a[1]} r="6" className="curve-dot" />
      <text x={L.startNote[0]} y={L.startNote[1]} className="curve-note-title">{chart.start.title}</text>
      <text x={L.startNote[0]} y={L.startNote[1] + L.gap} className="curve-note-text">{chart.start.text}</text>

      <circle cx={L.b[0]} cy={L.b[1]} r="6" className="curve-dot" />
      <text x={L.endNote[0]} y={L.endNote[1]} className="curve-note-title" textAnchor="end">{chart.end.title}</text>
      <text x={L.endNote[0]} y={L.endNote[1] + L.gap} className="curve-note-text" textAnchor="end">{chart.end.text}</text>
    </svg>
  );
}

function Flow({ chart }: { chart: Extract<ProjectChart, { kind: "flow" }> }) {
  return (
    <ol className="flow">
      {chart.steps.map((st, i) => (
        <li key={st.title} className="flow-step">
          <FlowIcon kind={st.icon} />
          <span className="flow-tag">{st.tag}</span>
          <span className="flow-title">{st.title}</span>
          <span className="flow-text">{st.text}</span>
          {i < chart.steps.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
        </li>
      ))}
    </ol>
  );
}

// Small schematic drawings. No data: shapes only.
function FlowIcon({ kind }: { kind: "match" | "did" | "sig" }) {
  if (kind === "match") {
    const pairs = [18, 40, 62];
    return (
      <svg className="flow-icon" viewBox="0 0 160 84" aria-hidden="true">
        <text x="30" y="10" className="fi-label" textAnchor="middle">Joined</text>
        <text x="130" y="10" className="fi-label" textAnchor="middle">Did Not Join</text>
        {pairs.map((y) => (
          <g key={y}>
            <line x1="36" y1={y + 10} x2="124" y2={y + 10} className="fi-link" />
            <circle cx="30" cy={y + 10} r="6" className="fi-a" />
            <circle cx="130" cy={y + 10} r="6" className="fi-b" />
          </g>
        ))}
        <circle cx="146" cy="39" r="5" className="fi-faded" />
        <circle cx="146" cy="61" r="5" className="fi-faded" />
      </svg>
    );
  }
  if (kind === "did") {
    return (
      <svg className="flow-icon" viewBox="0 0 160 84" aria-hidden="true">
        <line x1="14" y1="74" x2="150" y2="74" className="fi-axis" />
        <line x1="82" y1="8" x2="82" y2="74" className="fi-dash" />
        <text x="48" y="84" className="fi-label" textAnchor="middle">Before</text>
        <text x="105" y="84" className="fi-label" textAnchor="middle">After</text>
        <polyline points="20,58 82,52 128,47" className="fi-line-b" />
        <polyline points="20,46 82,40 128,20" className="fi-line-a" />
        <line x1="82" y1="40" x2="128" y2="35" className="fi-counter" />
        <line x1="134" y1="21" x2="134" y2="34" className="fi-effect" />
        <text x="138" y="31" className="fi-label">Effect</text>
      </svg>
    );
  }
  return (
    <svg className="flow-icon" viewBox="0 0 160 84" aria-hidden="true">
      <line x1="80" y1="6" x2="80" y2="72" className="fi-dash" />
      <text x="80" y="84" className="fi-label" textAnchor="middle">0</text>
      {[
        { y: 18, lo: 58, hi: 104, hit: false },
        { y: 40, lo: 92, hi: 140, hit: true },
        { y: 62, lo: 50, hi: 92, hit: false },
      ].map((r) => (
        <g key={r.y}>
          <line x1={r.lo} y1={r.y} x2={r.hi} y2={r.y} className={r.hit ? "fi-ci-a" : "fi-ci-b"} />
          <circle cx={(r.lo + r.hi) / 2} cy={r.y} r="5" className={r.hit ? "fi-a" : "fi-b"} />
        </g>
      ))}
    </svg>
  );
}

function Slope({ chart }: { chart: Extract<ProjectChart, { kind: "slope" }> }) {
  return (
    <>
      <SlopeSvg chart={chart} W={520} className="slope chart-wide" />
      <SlopeSvg chart={chart} W={360} className="slope chart-narrow" />
    </>
  );
}

function SlopeSvg({ chart, W, className }: { chart: Extract<ProjectChart, { kind: "slope" }>; W: number; className: string }) {
  // plot y from 40 (max) to 240 (min)
  const vals = chart.groups.flatMap((g) => [g.before, g.after]);
  const lo = Math.floor(Math.min(...vals) * 10) / 10 - 0.1;
  const hi = Math.ceil(Math.max(...vals) * 10) / 10;
  const y = (v: number) => 240 - ((v - lo) / (hi - lo)) * 200;
  const xa = W > 400 ? 150 : 96, xb = W > 400 ? 370 : 236;
  const labelGap = W > 400 ? 56 : 46;
  return (
    <svg className={className} viewBox={`0 0 ${W} 300`} role="img" aria-label={chart.heading}>
      <line x1={xa} y1="30" x2={xa} y2="250" className="fi-dash" />
      <line x1={xb} y1="30" x2={xb} y2="250" className="fi-dash" />
      <text x={xa} y="276" className="curve-tick" textAnchor="middle">{chart.before}</text>
      <text x={xb} y="276" className="curve-tick" textAnchor="middle">{chart.after}</text>
      <text x="20" y="20" className="curve-axis-label">{chart.yLabel}</text>
      {chart.groups.map((g, gi) => {
        // nudge "before" labels apart when the two starting values are close
        const other = chart.groups[1 - gi];
        const close = other && Math.abs(y(g.before) - y(other.before)) < 16;
        const nudge = close ? (g.before <= other.before ? 9 : -9) : 0;
        return (
        <g key={g.label}>
          <title>{`${g.label}: ${g.before.toFixed(2)} to ${g.after.toFixed(2)}`}</title>
          <line x1={xa} y1={y(g.before)} x2={xb} y2={y(g.after)} className={g.highlight ? "fi-line-a" : "fi-line-b"} />
          <circle cx={xa} cy={y(g.before)} r="6" className={g.highlight ? "fi-a" : "fi-b"} />
          <circle cx={xb} cy={y(g.after)} r="6" className={g.highlight ? "fi-a" : "fi-b"} />
          <text x={xa - 14} y={y(g.before) + 4 + nudge} className="slope-val" textAnchor="end">{g.before.toFixed(2)}</text>
          <text x={xb + 14} y={y(g.after) + 4} className="slope-val">{g.after.toFixed(2)}</text>
          <text x={xb + labelGap} y={y(g.after) + 4} className="slope-label">{g.label}</text>
        </g>
        );
      })}
      <text x={(xa + xb) / 2} y="44" className="slope-note" textAnchor="middle">{chart.note}</text>
    </svg>
  );
}

function Forecast({ chart }: { chart: Extract<ProjectChart, { kind: "forecast" }> }) {
  return (
    <>
      <ForecastSvg chart={chart} W={600} className="forecast chart-wide" />
      <ForecastSvg chart={chart} W={360} className="forecast chart-narrow" />
      <ul className="legend">
        <li><span className="lg lg-hist" />Training Data</li>
        <li><span className="lg lg-actual" />Actual (Holdout)</li>
        <li><span className="lg lg-fc" />Forecast</li>
        <li><span className="lg lg-band" />95% Prediction Interval</li>
      </ul>
    </>
  );
}

function ForecastSvg({ chart, W, className }: { chart: Extract<ProjectChart, { kind: "forecast" }>; W: number; className: string }) {
  const n = chart.history.length + chart.holdout.length;
  const H = 300, L = W > 400 ? 54 : 36, R = 10, T = 30, B = 250;
  const all = [...chart.history.map((h) => h.value), ...chart.holdout.flatMap((h) => [h.lo, h.hi, h.actual])];
  const hi = Math.ceil(Math.max(...all) / chart.scale * 2) / 2;
  const lo = Math.floor(Math.min(...all) / chart.scale * 2) / 2;
  const x = (i: number) => L + (i / (n - 1)) * (W - L - R);
  const y = (v: number) => B - ((v / chart.scale - lo) / (hi - lo)) * (B - T);
  const h0 = chart.history.length;
  const hist = chart.history.map((h, i) => `${x(i)},${y(h.value)}`).join(" ");
  const last = chart.history[h0 - 1];
  const act = [`${x(h0 - 1)},${y(last.value)}`, ...chart.holdout.map((h, i) => `${x(h0 + i)},${y(h.actual)}`)].join(" ");
  const fc = chart.holdout.map((h, i) => `${x(h0 + i)},${y(h.fc)}`).join(" ");
  const band =
    chart.holdout.map((h, i) => `${x(h0 + i)},${y(h.hi)}`).join(" ") + " " +
    chart.holdout.map((h, i) => `${x(h0 + i)},${y(h.lo)}`).reverse().join(" ");
  const ticks: number[] = [];
  for (let t = lo; t <= hi + 1e-9; t += 0.5) ticks.push(Math.round(t * 10) / 10);
  const split = (x(h0 - 1) + x(h0)) / 2;
  return (
      <svg className={className} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.heading}>
        <text x={L} y="16" className="curve-axis-label">{chart.yLabel}</text>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} y1={y(t * chart.scale)} x2={W - R} y2={y(t * chart.scale)} className="fc-grid" />
            <text x={L - 8} y={y(t * chart.scale) + 4} className="curve-tick" textAnchor="end">{t.toFixed(1)}</text>
          </g>
        ))}
        <rect x={split} y={T} width={W - R - split} height={B - T} className="fc-holdout" />
        <text x={split + 8} y={T + 16} className="curve-tick">Holdout</text>
        <polygon points={band} className="fc-band" />
        <polyline points={hist} className="fi-line-b" />
        <polyline points={act} className="fc-actual" />
        <polyline points={fc} className="fc-forecast" />
        {chart.holdout.map((h, i) => (
          <g key={h.date}>
            <title>{`${h.date}: actual ${(h.actual / chart.scale).toFixed(2)}M, forecast ${(h.fc / chart.scale).toFixed(2)}M (95%: ${(h.lo / chart.scale).toFixed(2)} to ${(h.hi / chart.scale).toFixed(2)})`}</title>
            <rect x={x(h0 + i) - 12} y={T} width="24" height={B - T} fill="transparent" />
          </g>
        ))}
        <text x={L} y={B + 22} className="curve-tick">{chart.history[0].date}</text>
        <text x={x(h0)} y={B + 22} className="curve-tick" textAnchor="middle">{chart.holdout[0].date}</text>
        <text x={W - R} y={B + 22} className="curve-tick" textAnchor="end">{chart.holdout[chart.holdout.length - 1].date}</text>
      </svg>
  );
}

function Process({ chart }: { chart: Extract<ProjectChart, { kind: "process" }> }) {
  return (
    <div className="process">
      {chart.lanes.map((lane) => (
        <div key={lane.label} className={`lane${lane.highlight ? " lane-hl" : ""}`}>
          <span className="lane-label">{lane.label}</span>
          <ol className="lane-steps">
            {lane.steps.map((st) => (
              <li key={st} className="lane-step">{st}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

// Schematic route map. Coordinates are invented for illustration only.
const ROUTE = "M40 230 C140 230,160 120,260 120 S400 200,470 150 S540 70,570 60";
const PINGS: [number, number][] = [
  [43, 225], [56, 225], [74, 227], [99, 218], [105, 204], [122, 197], [138, 187], [147, 171], [165, 166],
  [171, 148], [189, 141], [209, 133], [221, 125], [242, 123], [256, 123], [284, 126], [394, 157], [398, 161],
  [410, 170], [430, 167], [439, 164], [452, 162], [470, 145], [534, 94], [536, 91], [537, 82], [545, 81],
  [547, 75], [556, 66], [558, 70], [568, 64],
];
const DETOUR: [number, number][] = [[294, 108], [302, 86], [318, 68], [340, 62], [362, 72], [374, 98], [382, 128]];
const STOPS: [number, number][] = [[40, 230], [260, 120], [470, 150], [570, 60]];

function Corridor({ chart }: { chart: Extract<ProjectChart, { kind: "corridor" }> }) {
  return (
    <>
      <svg className="corridor" viewBox="0 0 600 270" role="img" aria-label={chart.heading}>
        <path d={ROUTE} className="cor-band" />
        <path d={ROUTE} className="cor-route" />
        {PINGS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" className="fi-b" />)}
        {DETOUR.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" className="fi-a" />)}
        {/* GPS jump */}
        <line x1="122" y1="197" x2="92" y2="104" className="cor-jump" />
        <circle cx="92" cy="104" r="5" className="fi-a" />
        {/* data gap */}
        <path d="M474 142 C495 128, 512 112, 530 98" className="cor-gap" />
        {STOPS.map(([x, y]) => <circle key={`s${x}`} cx={x} cy={y} r="6.5" className="cor-stop" />)}
        <Marker x={340} y={38} n={1} />
        <Marker x={92} y={80} n={2} />
        <Marker x={528} y={140} n={3} />
        <line x1="232" y1="76" x2="232" y2="114" className="cor-leader" />
        <circle cx="232" cy="114" r="2.5" className="cor-leader-dot" />
        <text x="232" y="68" className="cor-tag" textAnchor="middle">Learned Corridor</text>
      </svg>
      <ol className="cor-notes">
        {chart.notes.map((n, i) => (
          <li key={n.title}>
            <span className="cor-num">{i + 1}</span>
            <span><strong>{n.title}</strong> {n.text}</span>
          </li>
        ))}
      </ol>
      <ul className="legend">
        <li><span className="lg lg-band" style={{ background: "#e4e1da", opacity: 1 }} />Learned Corridor</li>
        <li><span className="lg-dot" style={{ background: "#9a958c" }} />Normal Ping</li>
        <li><span className="lg-dot" style={{ background: "var(--accent)" }} />Anomaly</li>
        <li><span className="lg-dot lg-ring" />Planned Stop</li>
      </ul>
    </>
  );
}

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="cor-marker" />
      <text x={x} y={y + 4} className="cor-marker-text" textAnchor="middle">{n}</text>
    </g>
  );
}
