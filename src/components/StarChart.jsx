import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import starChartData from "./star_chart.json";
import "./StarChart.css";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS & CONSTELLATION CONFIG
   ═══════════════════════════════════════════════════════════════════ */
const CX = 500, CY = 500; // Center coordinate
const MAX_NODES = 40;
const VB0 = { x: -140, y: -50, w: 1180, h: 1200 }; // Alapból középen és kijebb zoomolva!
const ASPECT = VB0.w / VB0.h;
const MIN_W = 260, MAX_W = 1700;
const GOLD = "#d8ab45";

// Colors for constellations
const COL = {
  Combat: '#d45060',
  Gathering: '#4caf7d',
  Pve: '#9b76d0',
};

const CONST_LABEL = {
  Combat: 'Constellation of Combat',
  Gathering: 'Constellation of Gathering',
  Pve: 'Constellation of Cubesly',
};

const RECOMMENDED_BUILDS = [
  {
    label: "Physical Damage / Light",
    code: "SC:WyJjb21iYXQuYSIsImNvbWJhdC5hLjEiLCJjb21iYXQuYS4xLmEiLCJjb21iYXQuYS4xLmEuMCIsImNvbWJhdC5hLjEuYS4wLmIiLCJjb21iYXQuYS4xLmEuMC5iLjEiLCJjb21iYXQuYS4xLmEuMC5iLjEuYiIsImdhdGhlcmluZy5iIiwiZ2F0aGVyaW5nLmIuMCIsImdhdGhlcmluZy5iLjAuYiIsImdhdGhlcmluZy5iLjAuYi4wIiwiZ2F0aGVyaW5nLmIuMC5iLjAuYSIsImdhdGhlcmluZy5iLjAuYi4wLmIiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAuYiIsImdhdGhlcmluZy5iLjAuYi4wLmIuMC5iLjAiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAuYi4wLmEiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAuYi4wLmIiLCJnYXRoZXJpbmcuYi4wLmIuMC5jIiwicHZlLmEiLCJwdmUuYS4wIiwicHZlLmEuMC5iIiwicHZlLmEuMC5iLjAiLCJwdmUuYiIsInB2ZS5iLjAiLCJwdmUuYi4wLmEiLCJwdmUuYi4wLmEuMCIsInB2ZS5iLjAuYS4wLmEiLCJwdmUuYi4wLmEuMC5hLjAiLCJwdmUuYi4wLmEuMSIsInB2ZS5iLjAuYS4xLmEiLCJwdmUuYi4wLmEuMS5hLjAiLCJwdmUuYi4wLmEuMS5hLjEiLCJwdmUuYi4wLmIiLCJwdmUuYi4wLmIuMCIsInB2ZS5iLjAuYi4wLmEiLCJwdmUuYi4wLmIuMC5hLjAiLCJwdmUuYi4wLmIuMSIsInB2ZS5iLjAuYi4xLmEiLCJwdmUuYi4wLmIuMS5hLjEiXQ=="
  },
  {
    label: "Magic Damage / Light",
    code: "SC:WyJjb21iYXQuYiIsImNvbWJhdC5iLjAiLCJjb21iYXQuYi4wLmEiLCJjb21iYXQuYi4wLmEuMSIsImNvbWJhdC5iLjAuYS4xLmIiLCJjb21iYXQuYi4wLmEuMS5iLjEiLCJjb21iYXQuYi4wLmEuMS5iLjEuYiIsImNvbWJhdC5iLjAuYS4xLmIuMS5iLjEiLCJnYXRoZXJpbmcuYiIsImdhdGhlcmluZy5iLjAiLCJnYXRoZXJpbmcuYi4wLmIiLCJnYXRoZXJpbmcuYi4wLmIuMCIsImdhdGhlcmluZy5iLjAuYi4wLmEiLCJnYXRoZXJpbmcuYi4wLmIuMC5iIiwiZ2F0aGVyaW5nLmIuMC5iLjAuYi4wIiwiZ2F0aGVyaW5nLmIuMC5iLjAuYi4wLmIiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAuYi4wIiwiZ2F0aGVyaW5nLmIuMC5iLjAuYi4wLmIuMC5hIiwicHZlLmEiLCJwdmUuYS4wIiwicHZlLmEuMC5hIiwicHZlLmEuMC5iIiwicHZlLmEuMC5iLjAiLCJwdmUuYiIsInB2ZS5iLjAiLCJwdmUuYi4wLmEiLCJwdmUuYi4wLmEuMCIsInB2ZS5iLjAuYS4wLmEiLCJwdmUuYi4wLmEuMC5hLjAiLCJwdmUuYi4wLmEuMSIsInB2ZS5iLjAuYS4xLmEiLCJwdmUuYi4wLmEuMS5hLjAiLCJwdmUuYi4wLmEuMS5hLjEiLCJwdmUuYi4wLmIiLCJwdmUuYi4wLmIuMCIsInB2ZS5iLjAuYi4wLmEiLCJwdmUuYi4wLmIuMC5hLjAiLCJwdmUuYi4wLmIuMSIsInB2ZS5iLjAuYi4xLmEiLCJwdmUuYi4wLmIuMS5hLjEiXQ=="
  },
  {
    label: "Magic Damage / Movement Speed / Light",
    code: "SC:WyJjb21iYXQuYiIsImNvbWJhdC5iLjAiLCJjb21iYXQuYi4wLmEiLCJjb21iYXQuYi4wLmEuMSIsImNvbWJhdC5iLjAuYS4xLmIiLCJjb21iYXQuYi4wLmEuMS5iLjAiLCJjb21iYXQuYi4wLmEuMS5iLjAuYSIsImNvbWJhdC5iLjAuYS4xLmIuMSIsImNvbWJhdC5iLjAuYS4xLmIuMS5iIiwiY29tYmF0LmIuMC5hLjEuYi4xLmIuMSIsImdhdGhlcmluZy5iIiwiZ2F0aGVyaW5nLmIuMCIsImdhdGhlcmluZy5iLjAuYiIsImdhdGhlcmluZy5iLjAuYi4wIiwiZ2F0aGVyaW5nLmIuMC5iLjAuYSIsImdhdGhlcmluZy5iLjAuYi4wLmIiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAuYiIsImdhdGhlcmluZy5iLjAuYi4wLmIuMC5iLjAiLCJnYXRoZXJpbmcuYi4wLmIuMC5iLjAuYi4wLmEiLCJwdmUuYSIsInB2ZS5hLjAiLCJwdmUuYS4wLmEiLCJwdmUuYS4wLmEuMSIsInB2ZS5hLjAuYS4xLmEiLCJwdmUuYS4wLmEuMS5hLjAiLCJwdmUuYS4wLmEuMS5hLjAuYSIsInB2ZS5iIiwicHZlLmIuMCIsInB2ZS5iLjAuYSIsInB2ZS5iLjAuYS4xIiwicHZlLmIuMC5hLjEuYSIsInB2ZS5iLjAuYS4xLmEuMSIsInB2ZS5iLjAuYiIsInB2ZS5iLjAuYi4wIiwicHZlLmIuMC5iLjAuYSIsInB2ZS5iLjAuYi4wLmEuMCIsInB2ZS5iLjAuYi4xIiwicHZlLmIuMC5iLjEuYSIsInB2ZS5iLjAuYi4xLmEuMSJd"
  },
  {
    label: "Physical Damage / Movement Speed / Light",
    code: "SC:WyJjb21iYXQuYSIsImNvbWJhdC5hLjEiLCJjb21iYXQuYS4xLmEiLCJjb21iYXQuYS4xLmEuMCIsImNvbWJhdC5hLjEuYS4wLmIiLCJjb21iYXQuYS4xLmEuMC5iLjEiLCJjb21iYXQuYS4xLmEuMC5iLjEuYiIsImNvbWJhdC5iIiwiY29tYmF0LmIuMCIsImNvbWJhdC5iLjAuYSIsImNvbWJhdC5iLjAuYS4xIiwiY29tYmF0LmIuMC5hLjEuYiIsImNvbWJhdC5iLjAuYS4xLmIuMCIsImNvbWJhdC5iLjAuYS4xLmIuMC5hIiwicHZlLmEiLCJwdmUuYS4wIiwicHZlLmEuMC5hIiwicHZlLmEuMC5hLjEiLCJwdmUuYS4wLmEuMS5hIiwicHZlLmEuMC5hLjEuYS4wIiwicHZlLmEuMC5hLjEuYS4wLmEiLCJwdmUuYS4wLmIiLCJwdmUuYS4wLmIuMCIsInB2ZS5iIiwicHZlLmIuMCIsInB2ZS5iLjAuYSIsInB2ZS5iLjAuYS4wIiwicHZlLmIuMC5hLjAuYSIsInB2ZS5iLjAuYS4wLmEuMCIsInB2ZS5iLjAuYS4xIiwicHZlLmIuMC5hLjEuYSIsInB2ZS5iLjAuYS4xLmEuMCIsInB2ZS5iLjAuYS4xLmEuMSIsInB2ZS5iLjAuYiIsInB2ZS5iLjAuYi4wIiwicHZlLmIuMC5iLjAuYSIsInB2ZS5iLjAuYi4wLmEuMCIsInB2ZS5iLjAuYi4xIiwicHZlLmIuMC5iLjEuYSIsInB2ZS5iLjAuYi4xLmEuMSJd"
  }
];

/* ═══════════════════════════════════════════════════════════════════
   LAYOUT ALGORITHM — THE EXACT TROVE MATH
   ═══════════════════════════════════════════════════════════════════ */
function rotatePt([ox, oy], [px, py], a) {
  return [
    ox + Math.cos(a) * (px - ox) - Math.sin(a) * (py - oy),
    oy + Math.sin(a) * (px - ox) + Math.cos(a) * (py - oy)
  ];
}

function buildBranch(back, last, dist, stars) {
  const total = 155, div = total / (stars.length + 1);
  stars.forEach((s, i) => {
    const fr = div * (i + 1) + back;
    s.Coords = rotatePt(last, [last[0] - dist, last[1]], fr * Math.PI / 180);
    if (s.Stars?.length) buildBranch(-((total / 2) - fr), s.Coords, dist, s.Stars);
  });
}

function rotBranch(star, orig, a) {
  for (const c of (star.Stars || [])) {
    c.Coords = rotatePt(orig, c.Coords || [0, 0], a);
    rotBranch(c, orig, a);
  }
}

function tweakBranch(by, parentPath, targetPath, angleDeg) {
  const parent = by[parentPath], target = by[targetPath];
  if (!parent?.Coords || !target?.Coords) return;
  const origin = parent.Coords, a = angleDeg * Math.PI / 180;
  function rotNode(node) {
    if (!node.Coords) return;
    node.Coords = rotatePt(origin, node.Coords, a);
    (node.Stars || []).forEach(rotNode);
  }
  rotNode(target);
}

// Compute layout once at module level — immutable after this point
const CHART = (() => {
  const raw = JSON.parse(JSON.stringify(starChartData));
  const nm = {}, nl = [], el = [], re = [];
  const backs = [0, -2, -4]; // Offsets for specific branches

  ['Combat', 'Gathering', 'Pve'].forEach((k, i) => {
    if (!raw[k]) return;
    const root = raw[k];
    const br = 120 * i * Math.PI / 180; // 120 degrees apart
    const pos = [500, 425]; // Distance from center

    // Beállítjuk a root node-ok alapértelmezett értékeit a Tooltip számára
    root.Constellation = k;
    root.ck = k;
    root.Type = "Root";
    if (k === 'Gathering') {
      root.Name = "Constellation of Gathering";
      root.Description = "Increased gains in harvesting and experience.";
    } else if (k === 'Combat') {
      root.Name = "Constellation of Combat";
      root.Description = "Physical & Magical damage, critical hit improvements.";
    } else if (k === 'Pve') {
      root.Name = "Constellation of Cubesly";
      root.Description = "Improved flasks and dungeon/delve power.";
    }

    root.Coords = rotatePt([CX, CY], pos, br);
    buildBranch(backs[i], pos, 55, root.Stars || []);
    rotBranch(root, [CX, CY], br);
  }); // Helyretett lezárás!

  // Flatting the tree and creating the node maps
  function walk(n, par) {
    n.Path = n.Path || n.id; // Fallback to id if Path is missing
    nm[n.Path] = n;
    n._cx = n.Coords[0];
    n._cy = n.Coords[1];
    n.parentPath = par;
    n.ck = n.Constellation || n.ck; // Normalize constellation key

    nl.push(n);

    if (par) {
      el.push({
        id: "e-" + par + "-" + n.Path,
        pathId: n.Path,
        x1: nm[par]._cx, y1: nm[par]._cy,
        x2: n._cx, y2: n._cy,
      });
    } else {
      // Draw line from absolute center to root node
      re.push({ id: "re-" + n.Path, x1: CX, y1: CY, x2: n._cx, y2: n._cy });
    }

    (n.Stars || []).forEach(c => walk(c, n.Path));
  }

  ['Combat', 'Gathering', 'Pve'].forEach(k => raw[k] && walk(raw[k], null));

  // The Manual Tweaks for exact pixel perfection
  tweakBranch(nm, 'pve.b.0.b', 'pve.b.0.b.0', 15);
  tweakBranch(nm, 'gathering.b.0', 'gathering.b.0.a', 15);
  tweakBranch(nm, 'gathering.b.0', 'gathering.b.0.b', 10);
  tweakBranch(nm, 'combat.a', 'combat.a.0', -25);
  tweakBranch(nm, 'combat.a', 'combat.a.1', -10);
  tweakBranch(nm, 'combat.b.0', 'combat.b.0.a', -10);
  tweakBranch(nm, 'combat.b', 'combat.b.0', 15);
  tweakBranch(nm, 'combat.b', 'combat.b.1', 35);

  // Recalculate physical positions for edges after tweaking
  el.forEach(edge => {
    edge.x2 = nm[edge.pathId]._cx = nm[edge.pathId].Coords[0];
    edge.y2 = nm[edge.pathId]._cy = nm[edge.pathId].Coords[1];
    if (nm[edge.pathId].parentPath) {
      edge.x1 = nm[nm[edge.pathId].parentPath]._cx = nm[nm[edge.pathId].parentPath].Coords[0];
      edge.y1 = nm[nm[edge.pathId].parentPath]._cy = nm[nm[edge.pathId].parentPath].Coords[1];
    }
  });

  // Recalculate root edges
  re.forEach(edge => {
    const rootPath = edge.id.replace('re-', '');
    if(nm[rootPath]) {
        edge.x2 = nm[rootPath]._cx;
        edge.y2 = nm[rootPath]._cy;
    }
  });

  return { nm, nl, el, re };
})();

/* ═══════════════════════════════════════════════════════════════════
   COLOR UTILITIES
   ═══════════════════════════════════════════════════════════════════ */
function mix(a, b, w = 0.5) {
  const c1 = parseInt(a.slice(1), 16), c2 = parseInt(b.slice(1), 16) || 0xffffff;
  const r = Math.round(((c1 >> 16) * (1 - w)) + ((c2 >> 16) * w));
  const g = Math.round((((c1 >> 8) & 0xff) * (1 - w)) + (((c2 >> 8) & 0xff) * w));
  const bl = Math.round(((c1 & 0xff) * (1 - w)) + ((c2 & 0xff) * w));
  return `rgb(${r},${g},${bl})`;
}

/* ═══════════════════════════════════════════════════════════════════
   PARTICLE BACKGROUND HOOK
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   KOZMIKUS WARP DRIVE HOOK — JAVÍTOTT, GYORSAN ELTŰNŐ CSÍKOKKAL
   ═══════════════════════════════════════════════════════════════════ */
function useParticles(ref) {
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, W, H, stars = [];

    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);

    function Star() {
      this.reset = () => {
        // Véletlenszerű elhelyezkedés a középponthoz képest
        this.x = (Math.random() - 0.5) * W;
        this.y = (Math.random() - 0.5) * H;
        this.z = W; // Kezdő távolság (mélység)
        this.color = Math.random() > 0.5 ? "#00aeff" : "#9b76d0"; // Trove-kék vagy kozmikus lila
      };
      this.reset();
    }

    for (let i = 0; i < 120; i++) stars.push(new Star());

    function draw() {
      ctx.fillStyle = "rgba(3, 4, 12, 0.7)"; 
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;

      for (let s of stars) {
        s.z -= 2;
        if (s.z <= 0) {
          s.reset();
          continue;
        }

        let px = (s.x / s.z) * W + cx;
        let py = (s.y / s.z) * H + cy;
        let radius = (1 - s.z / W) * 2.8;
        if (px < 0 || px > W || py < 0 || py > H) {
          s.reset();
          continue;
        }

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.1, radius), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
}

function SvgDefs() {
  return (
    <defs>
      <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <radialGradient id="center-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(18,15,42,0.7)" />
        <stop offset="100%" stopColor="rgba(3,3,10,0)" />
      </radialGradient>
      <radialGradient id="chart-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(12,10,30,0.55)" />
        <stop offset="100%" stopColor="rgba(3,3,10,0)" />
      </radialGradient>
    </defs>
  );
}

function CenterStar({ onClear }) {
  const ticks = [0, 90, 180, 270];
  return (
    <g onClick={onClear} className="sc-center" title="Click to clear all">
      <circle cx={CX} cy={CY} r={55} fill="url(#center-bg)" />
      <circle cx={CX} cy={CY} r={31} fill="none" stroke={GOLD} strokeWidth="1.4" strokeDasharray="3,3.5" opacity="0.58" />
      {ticks.map(a => {
        const rd = (a * Math.PI) / 180;
        return (
          <line key={a} x1={CX + Math.cos(rd) * 24} y1={CY + Math.sin(rd) * 24} x2={CX + Math.cos(rd) * 32} y2={CY + Math.sin(rd) * 32} stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
        );
      })}
      <g filter="url(#glow-gold)">
        <path d={`M${CX},${CY-20} L${CX+5},${CY-5} L${CX+20},${CY} L${CX+5},${CY+5} L${CX},${CY+20} L${CX-5},${CY+5} L${CX-20},${CY} L${CX-5},${CY-5} Z`} fill={GOLD} />
      </g>
      <circle cx={CX} cy={CY} r={6} fill="#fff6d0" />
    </g>
  );
}

function RootNode({ node, onRootClick, onEnter, onLeave }) {
  const ck = node.ck || node.Constellation;
  const color = COL[ck] || '#888';
  const { _cx: cx, _cy: cy } = node;
  const S = 14;
  return (
    <g onClick={e => onRootClick(node, e)} onMouseEnter={onEnter} onMouseLeave={onLeave} className="sc-node sc-root" style={{cursor: 'pointer'}}>
      <circle cx={cx} cy={cy} r={S * 1.75} fill="transparent" stroke={color} strokeWidth="1" strokeDasharray="2.5,3" opacity="0.38" />
      <polygon points={`${cx},${cy-S} ${cx+S},${cy} ${cx},${cy+S} ${cx-S},${cy}`} fill="rgba(3,5,16,0.88)" stroke={color} strokeWidth="2" />
      
      {ck === 'Combat' && <path d={`M${cx-4.5},${cy-4.5} L${cx+4.5},${cy+4.5} M${cx+4.5},${cy-4.5} L${cx-4.5},${cy+4.5}`} stroke={color} strokeWidth="2.5" strokeLinecap="round" />}
      {ck === 'Gathering' && <path d={`M${cx},${cy+4} C${cx-7},${cy+4} ${cx-5},${cy-3} ${cx},${cy-5} C${cx+5},${cy-3} ${cx+7},${cy+4} ${cx},${cy+4} Z`} fill={color} opacity="0.9" />}
      {ck === 'Pve' && <path d={`M${cx-2.5},${cy-4} L${cx+2.5},${cy-4} L${cx+2.5},${cy-1} L${cx+5},${cy+4} L${cx+5},${cy+5.5} L${cx-5},${cy+5.5} L${cx-5},${cy+4} L${cx-2.5},${cy-1} Z`} fill={color} opacity="0.9" />}
    </g>
  );
}

function MinorNode({ node, sel, ow, muted, onNodeClick, onEnter, onLeave }) {
  const color = COL[node.Constellation] || '#888';
  const { _cx: cx, _cy: cy } = node;
  const op = ow ? 0.18 : muted ? 0.35 : 1;
  const fill = sel ? mix(color, "#ffffff", 0.28) : color;
  const stroke = sel ? mix(color, "#ffffff", 0.50) : "#111111";

  return (
    <g onClick={() => onNodeClick(node)} onMouseEnter={onEnter} onMouseLeave={onLeave} className="sc-node sc-minor" style={{ opacity: op, cursor: "pointer" }}>
      {sel && <circle cx={cx} cy={cy} r={16} fill="none" stroke={fill} strokeWidth="0.6" opacity="0.2" />}
      <circle cx={cx} cy={cy} r={11} fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={8} fill={fill} />
      <circle cx={cx} cy={cy} r={2.8} fill="rgba(255,255,255,0.55)" />
    </g>
  );
}

function MajorNode({ node, sel, ow, muted, onNodeClick, onEnter, onLeave }) {
  const color = COL[node.Constellation] || '#888';
  const { _cx: cx, _cy: cy } = node;
  const op = ow ? 0.18 : muted ? 0.35 : 1;
  const fill = sel ? mix(color, "#ffffff", 0.28) : color;

  return (
    <g onClick={() => onNodeClick(node)} onMouseEnter={onEnter} onMouseLeave={onLeave} className="sc-node sc-major" style={{ opacity: op, cursor: "pointer" }}>
      {sel && <circle cx={cx} cy={cy} r={25} fill="none" stroke={fill} strokeWidth="0.7" opacity="0.16" />}
      <circle cx={cx} cy={cy} r={19.5} fill="none" stroke={fill} strokeWidth="1" opacity="0.27" />
      <circle cx={cx} cy={cy} r={16} fill="none" stroke={fill} strokeWidth="1.5" opacity="0.62" />
      <circle cx={cx} cy={cy} r={13} fill={fill} />
      <circle cx={cx} cy={cy} r={4.5} fill="rgba(255,255,255,0.58)" />
    </g>
  );
}

function Tooltip({ node, x, y }) {
  const color = COL[node.Constellation] || '#888';
  return (
    <div className="sc-tooltip" style={{ left: x, top: y }} id="sc-tooltip">
      <div className="sc-tt-head" style={{ borderLeftColor: color }}>
        <span className="sc-tt-type" style={{ color: color }}>{node.Type} · {CONST_LABEL[node.Constellation]}</span>
        <span className="sc-tt-name">{node.Name}</span>
      </div>
      {node.Description && <p className="sc-tt-desc">{node.Description}</p>}
      {node.Stats?.length > 0 && (
        <div className="sc-tt-block">
          <div className="sc-tt-label">Stats</div>
          {node.Stats.map((s, i) => (
            <div key={i} className="sc-tt-stat"><span>{s.name}</span><span style={{ color: color }}>+{s.value}{s.percentage ? "%" : ""}</span></div>
          ))}
        </div>
      )}
      {node.Abilities?.length > 0 && (
        <div className="sc-tt-block">
          <div className="sc-tt-label">Abilities</div>
          {node.Abilities.map((a, i) => <p key={i} className="sc-tt-ability">{a}</p>)}
        </div>
      )}
      {node.Obtainables?.length > 0 && (
        <div className="sc-tt-block">
          <div className="sc-tt-label">Obtainables</div>
          {node.Obtainables.map((o, i) => <p key={i} className="sc-tt-obtainable" style={{ color: GOLD }}>✦ {o}</p>)}
        </div>
      )}
      {node.Overwrites?.length > 0 && (
        <div className="sc-tt-upgrades">↑ Upgrades: {node.Overwrites.map(p => CHART.nm[p]?.Name || p).join(", ")}</div>
      )}
    </div>
  );
}

function DescPanel({ open, onToggle }) {
  return (
    <div className={`sc-desc ${open ? "sc-desc--open" : ""}`}>
      <button className="sc-desc-toggle" onClick={onToggle} aria-expanded={open}>
        <span className="sc-desc-title">✦ &nbsp;Celestial Star Chart Simulator</span>
      </button>
      {open && (
        <div className="sc-desc-body">
          <p className="sc-desc-intro">
            Three constellations of stars await. <strong>Click any node</strong> to select it - ancestors are selected automatically.
            <strong> Double-click a root diamond</strong> to select its entire constellation.
            You may unlock <strong style={{ color: GOLD }}>up to {MAX_NODES} nodes</strong> per build.
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryPanel({ count, stats, abilities, obtainables, onClear, sections, onToggleSection, sel, onLoadCode }) {
  const pct = Math.round((count / MAX_NODES) * 100);
  const full = count >= MAX_NODES;
  const [copyText, setCopyText] = useState("Copy Build Code");
  const [codeIn, setCodeIn] = useState("");

  const handleCopy = () => {
    if (sel.size === 0) return;
    const code = 'SC:' + btoa(unescape(encodeURIComponent(JSON.stringify([...sel].sort()))));
    navigator.clipboard.writeText(code).catch(() => {});
    setCopyText("✓ Copied");
    setTimeout(() => setCopyText("Copy Build Code"), 1600);
  };

  const handleLoad = () => {
    if (!codeIn.trim()) return;
    onLoadCode(codeIn.trim());
    setCodeIn("");
  };

  return (
    <aside className="sc-summary">
      <div className="sc-sum-header">
        <span className="sc-sum-title">Build Summary</span>
        <button className="sc-clear-btn" onClick={onClear} disabled={count === 0}>Clear All</button>
      </div>

      <div className="sc-code-box">
        <div className="sc-code-actions">
          <input 
            type="text" 
            className="sc-code-input" 
            placeholder="Paste build code here..." 
            value={codeIn}
            onChange={(e) => setCodeIn(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
          />
          <button className="sc-code-btn" onClick={handleLoad}>Load</button>
        </div>
        <button className="sc-code-copy-btn" onClick={handleCopy} disabled={count === 0}>{copyText}</button>
      </div>

      <div className="sc-counter">
        <div className="sc-counter-label"><span>{count} <span style={{ opacity: 0.55 }}>/ {MAX_NODES}</span> Nodes</span>{full && <span className="sc-counter-full">Full</span>}</div>
        <div className="sc-counter-track"><div className="sc-counter-fill" style={{ width: `${pct}%`, background: full ? "#E64A19" : GOLD }} /></div>
      </div>
      <SumSection icon="◈" label="Stats" id="stats" open={sections.stats} onToggle={() => onToggleSection("stats")}>
        {stats.length === 0 ? <p className="sc-empty">No stats selected.</p> : stats.sort((a,b)=>b.value-a.value).map((s, i) => <div key={i} className="sc-stat-row"><span>{s.name}</span><span className="sc-stat-val">+{s.value}{s.percentage ? "%" : ""}</span></div>)}
      </SumSection>
      <SumSection icon="⚡" label="Abilities" id="abilities" open={sections.abilities} onToggle={() => onToggleSection("abilities")}>
        {abilities.length === 0 ? <p className="sc-empty">No abilities selected.</p> : abilities.map((a, i) => <p key={i} className="sc-ability-item">{a}</p>)}
      </SumSection>
      <SumSection icon="✦" label="Obtainables" id="obtainables" open={sections.obtainables} onToggle={() => onToggleSection("obtainables")}>
        {obtainables.length === 0 ? <p className="sc-empty">No obtainables selected.</p> : obtainables.map((o, i) => <div key={i} className="sc-ob-row"><span className="sc-ob-icon" style={{ color: GOLD }}>✦</span><span>{o.name}{o.count > 1 ? ` ×${o.count}` : ""}</span></div>)}
      </SumSection>
    </aside>
  );
}

function SumSection({ icon, label, open, onToggle, children }) {
  return (
    <div className="sc-sec">
      <button className="sc-sec-toggle" onClick={onToggle}><span>{icon} &nbsp;{label}</span><span className="sc-sec-arrow">{open ? "▲" : "▼"}</span></button>
      {open && <div className="sc-sec-body">{children}</div>}
    </div>
  );
}

export default function StarChart() {
  const canvasRef = useRef(null), svgRef = useRef(null), vbRef = useRef({ ...VB0 }), panRef = useRef(null);
  useParticles(canvasRef);
  const [sel, setSel] = useState(new Set());
  const [vb, setVb] = useState({ ...VB0 });
  const [tt, setTt] = useState({ show: false, node: null, x: 0, y: 0 });
  const [descOpen, setDescOpen] = useState(true);
  const [sections, setSections] = useState({ stats: true, abilities: true, obtainables: true });

  useEffect(() => { vbRef.current = vb; }, [vb]);

  const ow = useMemo(() => {
    const s = new Set(); sel.forEach(p => CHART.nm[p]?.Overwrites?.forEach(o => s.add(o))); return s;
  }, [sel]);

  const active = useMemo(() => Array.from(sel).filter(p => !ow.has(p)), [sel, ow]);

  const summaryStats = useMemo(() => {
    const m = {}; active.forEach(p => { (CHART.nm[p]?.Stats || []).forEach(s => { const k = s.name + (s.percentage ? "_p" : "_f"); if (!m[k]) m[k] = { name: s.name, percentage: s.percentage, value: 0 }; m[k].value += s.value; }); }); return Object.values(m);
  }, [active]);

  const summaryAbilities = useMemo(() => {
    const abs = []; active.forEach(p => abs.push(...(CHART.nm[p]?.Abilities || []))); return abs;
  }, [active]);

  const summaryObtainables = useMemo(() => {
    const m = {}; active.forEach(p => (CHART.nm[p]?.Obtainables || []).forEach(o => { m[o] = (m[o] || 0) + 1; })); return Object.entries(m).map(([name, count]) => ({ name, count }));
  }, [active]);

  const getAncestorsToAdd = useCallback((path, cur) => {
    const list = []; let p = path;
    while (p && CHART.nm[p]) {
      if (cur.has(p)) break;
      const n = CHART.nm[p]; if (n.Type === "Root") break;
      list.push(p);
      const pp = n.parentPath; if (!pp || CHART.nm[pp]?.Type === "Root") break; p = pp;
    }
    return list;
  }, []);

  const handleNodeClick = useCallback(node => {
    setSel(prev => {
      if (prev.has(node.Path)) {
        const rem = new Set([node.Path]); let changed = true;
        while (changed) { changed = false; CHART.nl.forEach(n => { if (rem.has(n.parentPath) && !rem.has(n.Path)) { rem.add(n.Path); changed = true; } }); }
        const next = new Set(prev); rem.forEach(p => next.delete(p)); return next;
      } else {
        const toAdd = getAncestorsToAdd(node.Path, prev);
        if (prev.size + toAdd.length > MAX_NODES) return prev;
        const next = new Set(prev); toAdd.forEach(p => next.add(p)); return next;
      }
    });
  }, [getAncestorsToAdd]);

  const handleRootClick = useCallback((node, e) => {
    if (e.detail >= 2) {
      setSel(prev => { const next = new Set(prev); let count = next.size; CHART.nl.forEach(n => { if (n.ck === node.ck && n.Type !== "Root" && !next.has(n.Path) && count < MAX_NODES) { next.add(n.Path); count++; } }); return next; });
    } else {
      setSel(prev => { const next = new Set(prev); CHART.nl.forEach(n => { if (n.ck === node.ck) next.delete(n.Path); }); return next; });
    }
  }, []);

  const clearAll = useCallback(() => setSel(new Set()), []);

  const showTt = useCallback((e, node) => setTt({ show: true, node, x: e.clientX + 17, y: e.clientY + 17 }), []);
  const moveTt = useCallback(e => { setTt(prev => { if (!prev.show) return prev; let x = e.clientX + 17, y = e.clientY + 17; const el = document.getElementById("sc-tooltip"); if (el) { if (x + el.offsetWidth > window.innerWidth) x = e.clientX - el.offsetWidth - 17; if (y + el.offsetHeight > window.innerHeight) y = e.clientY - el.offsetHeight - 17; } return { ...prev, x, y }; }); }, []);
  const hideTt = useCallback(() => setTt(prev => ({ ...prev, show: false, node: null })), []);

  const loadCode = useCallback((code) => {
    try {
      const b64 = code.startsWith('SC:') ? code.slice(3) : code;
      const paths = JSON.parse(decodeURIComponent(escape(atob(b64))));
      if (!Array.isArray(paths)) return;
      const next = new Set();
      paths.forEach(p => { 
        if (CHART.nm[p] && CHART.nm[p].Type !== "Root") next.add(p); 
      });
      setSel(next);
    } catch (e) {
      console.error("Invalid build code");
    }
  }, []);

  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    const onWheel = e => { e.preventDefault(); const r = svg.getBoundingClientRect(); if (!r.width) return; const relX = (e.clientX - r.left) / r.width; const relY = (e.clientY - r.top) / r.height; const v = vbRef.current; const pt = { x: v.x + relX * v.w, y: v.y + relY * v.h, relX, relY }; const f = e.deltaY < 0 ? 0.84 : 1 / 0.84; const nw = Math.min(MAX_W, Math.max(MIN_W, v.w * f)); const nh = nw / ASPECT; const nv = { x: pt.x - pt.relX * nw, y: pt.y - pt.relY * nh, w: nw, h: nh }; vbRef.current = nv; setVb(nv); };
    svg.addEventListener("wheel", onWheel, { passive: false }); return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  const handleMouseDown = e => {
    if (e.button !== 0) return; if (e.target.closest?.(".sc-node") || e.target.closest?.(".sc-center")) return;
    const svg = svgRef.current; const r = svg?.getBoundingClientRect(); if (!r?.width) return; e.preventDefault();
    const v = vbRef.current; panRef.current = { sx: e.clientX, sy: e.clientY, svbx: v.x, svby: v.y, upx: v.w / r.width, upy: v.h / r.height }; svg.classList.add("is-panning");
    const onMove = ev => { if (!panRef.current) return; const d = panRef.current; const nv = { ...vbRef.current, x: d.svbx - (ev.clientX - d.sx) * d.upx, y: d.svby - (ev.clientY - d.sy) * d.upy }; vbRef.current = nv; setVb(nv); };
    const onUp = () => { svg.classList.remove("is-panning"); panRef.current = null; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
  };

  const zoomBy = f => { const v = vbRef.current; const cx = v.x + v.w / 2, cy = v.y + v.h / 2; const nw = Math.min(MAX_W, Math.max(MIN_W, v.w * f)); const nh = nw / ASPECT; const nv = { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh }; vbRef.current = nv; setVb(nv); };
  const resetView = () => { const nv = { ...VB0 }; vbRef.current = nv; setVb(nv); };

  return (
    <div className="sc-page">
      <canvas ref={canvasRef} className="sc-canvas" />
      <div className="sc-content">
        <DescPanel open={descOpen} onToggle={() => setDescOpen(v => !v)} />
        <div className="sc-main">
          <div className="sc-chart-wrap">
            
            <a href="https://github.com/AallynReed/BetterTroveTools" target="_blank" rel="noopener noreferrer" className="sc-credits-link">
              Credits: BetterTroveTools · AallynReed
            </a>

            <div className="sc-recommended-dropdown">
              <button className="sc-dropdown-trigger">
                <i className="ri-sparkling-2-line"></i> Recommended Builds ▾
              </button>
              <div className="sc-dropdown-menu">
                {RECOMMENDED_BUILDS.map((build, index) => (
                  <button 
                    key={index} 
                    className="sc-dropdown-item"
                    onClick={() => loadCode(build.code)}
                  >
                    {build.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sc-lore-container">
              <div className="sc-lore-item">
                <i className="ri-key-2-line" style={{ color: GOLD }}></i>
                <div className="sc-lore-tt"><strong>Constellation Key</strong> Unlocks or resets branches. First 3: 250 Flux at The Celestial. Additional: 130 Credits / 1300 Cubits.</div>
              </div>
              <div className="sc-lore-item">
                <i className="ri-bubble-chart-line" style={{ color: GOLD }}></i>
                <div className="sc-lore-tt"><strong>Celestial Sphere</strong> Unlocks one specific node. Only 40 Spheres available for 120 slots - plan carefully.</div>
              </div>
              <div className="sc-lore-item">
                <i className="ri-copper-diamond-line" style={{ color: GOLD }}></i>
                <div className="sc-lore-tt"><strong>Astral Echoes</strong> Currency for Spheres. Earned in dungeons/delves (20-50/run), weekly Almanac tome (5000/week), Turtle Shells ×4/week, Despoiled Divinity vendor ×5/day.</div>
              </div>
            </div>

            <svg ref={svgRef} className="sc-svg" viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} onMouseDown={handleMouseDown} onMouseMove={moveTt}>
              <SvgDefs />
              <circle cx={CX} cy={CY} r={280} fill="url(#chart-bg)" />
              {CHART.re.map(e => <line key={e.id} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#28283a" strokeWidth="1.2" strokeDasharray="4,4.5" strokeLinecap="round" />)}
              {CHART.el.map(e => <line key={e.id} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={sel.has(e.pathId) ? "#50507a" : "#1e1e2c"} strokeWidth={sel.has(e.pathId) ? 1.6 : 1} strokeDasharray="4,3.5" strokeLinecap="round" />)}
              <CenterStar onClear={clearAll} />
              {CHART.nl.map(node => {
                if (node.Type === "Root") return <RootNode key={node.Path} node={node} onRootClick={handleRootClick} onEnter={e => showTt(e, node)} onLeave={hideTt} />;
                const isSel = sel.has(node.Path), isOw = ow.has(node.Path), isMuted = !isSel && !isOw;
                const shared = { sel: isSel, ow: isOw, muted: isMuted, onNodeClick: handleNodeClick, onEnter: e => showTt(e, node), onLeave: hideTt };
                return node.Type === "Major" ? <MajorNode key={node.Path} node={node} {...shared} /> : <MinorNode key={node.Path} node={node} {...shared} />;
              })}
            </svg>
            {tt.show && tt.node && <Tooltip node={tt.node} x={tt.x} y={tt.y} />}
            <div className="sc-zoom">
              <button onClick={() => zoomBy(0.78)} title="Zoom in">+</button>
              <button onClick={() => zoomBy(1 / 0.78)} title="Zoom out">−</button>
              <button onClick={resetView} title="Reset view">⊞</button>
            </div>
          </div>
          <SummaryPanel 
            count={sel.size} 
            stats={summaryStats} 
            abilities={summaryAbilities} 
            obtainables={summaryObtainables} 
            onClear={clearAll} 
            sections={sections} 
            onToggleSection={k => setSections(prev => ({ ...prev, [k]: !prev[k] }))}
            sel={sel}
            onLoadCode={loadCode}
          />
        </div>
      </div>
    </div>
  );
}