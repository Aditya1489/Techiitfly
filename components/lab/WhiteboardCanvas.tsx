"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ToolType = "pen" | "compass" | "protractor" | "ruler" | "setsquare";

interface Stroke {
  tool: ToolType;
  color: string;
  size: number;
  points: { x: number; y: number }[];
  extra?: any;
}

export default function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<ToolType>("pen");
  const [color, setColor] = useState("#f59e0b");
  const [size, setSize] = useState(3);
  const [history, setHistory] = useState<Stroke[]>([]);
  const isDrawing = useRef(false);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  // Redraw entire canvas
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.fillStyle = "#12110e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle isometric/math grid
    ctx.strokeStyle = "rgba(243, 238, 230, 0.04)";
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw all completed strokes
    for (const stroke of history) {
      drawStroke(ctx, stroke);
    }
  }, [history]);

  // Helper to draw a single stroke
  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (stroke.tool === "pen") {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    } else if (stroke.tool === "compass") {
      // Circle from center to edge
      if (stroke.points.length < 2) return;
      const [p1, p2] = stroke.points;
      const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Radius line with distance label
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(243, 238, 230, 0.3)";
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Center point
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.font = "11px var(--font-geist-mono, monospace)";
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(`r = ${Math.round(radius)}px`, (p1.x + p2.x) / 2 + 6, (p1.y + p2.y) / 2 - 6);
      ctx.restore();
    } else if (stroke.tool === "ruler") {
      if (stroke.points.length < 2) return;
      const [p1, p2] = stroke.points;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Length label
      const dist = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));
      ctx.save();
      ctx.font = "11px var(--font-geist-mono, monospace)";
      ctx.fillStyle = stroke.color;
      ctx.fillText(`${dist}px`, (p1.x + p2.x) / 2 + 6, (p1.y + p2.y) / 2 - 8);
      ctx.restore();
    } else if (stroke.tool === "protractor") {
      if (stroke.points.length < 2) return;
      const [p1, p2] = stroke.points;
      const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const deg = Math.round(((angle * 180) / Math.PI + 360) % 360);

      // Baseline
      ctx.save();
      ctx.strokeStyle = "rgba(243, 238, 230, 0.4)";
      ctx.beginPath();
      ctx.moveTo(p1.x - radius, p1.y);
      ctx.lineTo(p1.x + radius, p1.y);
      ctx.stroke();

      // Arc
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, Math.min(radius, 50), 0, angle, angle < 0);
      ctx.stroke();

      // Ray
      ctx.strokeStyle = stroke.color;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Angle degree readout
      ctx.font = "600 12px var(--font-geist-mono, monospace)";
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(`${deg}°`, p1.x + 18, p1.y - 12);
      ctx.restore();
    } else if (stroke.tool === "setsquare") {
      if (stroke.points.length < 2) return;
      const [p1, p2] = stroke.points;
      const p3 = { x: p2.x, y: p1.y }; // Right angle vertex

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.stroke();

      // Right angle indicator at p3
      const sq = 12;
      const dirX = Math.sign(p1.x - p3.x) || 1;
      const dirY = Math.sign(p2.y - p3.y) || 1;
      ctx.beginPath();
      ctx.moveTo(p3.x + dirX * sq, p3.y);
      ctx.lineTo(p3.x + dirX * sq, p3.y + dirY * sq);
      ctx.lineTo(p3.x, p3.y + dirY * sq);
      ctx.stroke();
    }
  };

  // Resize canvas to match display size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      }
      redraw();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  // Pointer event helpers
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawing.current = true;
    const coords = getCoordinates(e);
    startPos.current = coords;
    currentPos.current = coords;
    currentPoints.current = [coords];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const coords = getCoordinates(e);
    currentPos.current = coords;

    if (activeTool === "pen") {
      currentPoints.current.push(coords);
      redraw();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        drawStroke(ctx, {
          tool: "pen",
          color,
          size,
          points: currentPoints.current,
        });
      }
    } else {
      // Interactive preview for geometric tools
      redraw();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        drawStroke(ctx, {
          tool: activeTool,
          color,
          size,
          points: [startPos.current, currentPos.current],
        });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const coords = getCoordinates(e);
    const newStroke: Stroke = {
      tool: activeTool,
      color,
      size,
      points: activeTool === "pen" ? [...currentPoints.current] : [startPos.current, coords],
    };

    setHistory((prev) => [...prev, newStroke]);
  };

  const handleUndo = () => {
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setHistory([]);
  };

  return (
    <div
      className="force-dark"
      data-theme="dark"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          padding: "12px 18px",
          background: "#161411",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Tool selector */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "pen", label: "Pencil ✏️" },
            { id: "compass", label: "Compass ⭕" },
            { id: "protractor", label: "Protractor 📐" },
            { id: "ruler", label: "Ruler 📏" },
            { id: "setsquare", label: "Set-Square ⊿" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as ToolType)}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.8rem",
                padding: "6px 12px",
                borderRadius: "6px",
                border: activeTool === t.id ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: activeTool === t.id ? "rgba(245,158,11,0.18)" : "transparent",
                color: activeTool === t.id ? "var(--accent)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Color & Size & Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Colors */}
          <div style={{ display: "flex", gap: "6px" }}>
            {["#f59e0b", "#f3eee6", "#38bdf8", "#f43f5e"].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: c,
                  border: color === c ? "2px solid #fff" : "1px solid rgba(0,0,0,0.5)",
                  cursor: "pointer",
                  padding: 0,
                  transform: color === c ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Stroke Size */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--muted)" }}>
              {size}px
            </span>
            <input
              type="range"
              min="1"
              max="8"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              style={{ width: "60px", accentColor: "var(--accent)", cursor: "pointer" }}
            />
          </div>

          {/* Undo / Clear */}
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.76rem",
                padding: "5px 10px",
                borderRadius: "6px",
                background: "var(--surface-2)",
                color: history.length === 0 ? "#555" : "var(--text)",
                border: "1px solid var(--border)",
                cursor: history.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Undo
            </button>
            <button
              onClick={handleClear}
              disabled={history.length === 0}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.76rem",
                padding: "5px 10px",
                borderRadius: "6px",
                background: "var(--surface-2)",
                color: history.length === 0 ? "#555" : "#f43f5e",
                border: "1px solid var(--border)",
                cursor: history.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div style={{ position: "relative", width: "100%", height: "460px", touchAction: "none" }}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            cursor: activeTool === "pen" ? "crosshair" : "cell",
          }}
        />
      </div>

      {/* Footer caption */}
      <div
        style={{
          padding: "10px 18px",
          background: "#0e0d0b",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--muted)",
          }}
        >
          These tools come from Mathsy Meet, the virtual classroom we built.
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.72rem",
            color: "var(--accent)",
          }}
        >
          Click & drag to measure angles, draw circles & straight lines
        </span>
      </div>
    </div>
  );
}
