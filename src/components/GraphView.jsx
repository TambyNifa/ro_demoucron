import React, { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { INF } from "../algorithms/demoucron";

const NODE_RADIUS = 130;

const labelOf = (i) => String.fromCharCode(65 + i);

function buildNodesEdges(matrix, highlightPath) {
  const n = matrix.length;
  const pathSet = new Set();
  if (highlightPath && highlightPath.length > 1) {
    for (let i = 0; i < highlightPath.length - 1; i++) {
      pathSet.add(`${highlightPath[i]}-${highlightPath[i + 1]}`);
    }
  }
  const highlightNodes = new Set(highlightPath || []);

  // Layout circulaire
  const nodes = Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI;
    const x = NODE_RADIUS * Math.cos(angle) + NODE_RADIUS + 20;
    const y = NODE_RADIUS * Math.sin(angle) + NODE_RADIUS + 20;
    const isHighlighted = highlightNodes.has(i);
    return {
      id: `${i}`,
      position: { x, y },
      data: { label: labelOf(i) },
      style: {
        background: isHighlighted
          ? "linear-gradient(135deg, #78350f, #451a03)"
          : "linear-gradient(135deg, #1e293b, #0f172a)",
        border: `2px solid ${isHighlighted ? "#f59e0b" : "rgba(99,102,241,0.6)"}`,
        color: isHighlighted ? "#fde68a" : "#f1f5f9",
        borderRadius: "50%",
        width: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: "8px",
        fontFamily: "Inter, sans-serif",
        boxShadow: isHighlighted
          ? "0 0 20px rgba(245,158,11,0.5)"
          : "0 0 12px rgba(99,102,241,0.25)",
      },
    };
  });

  const edges = [];
  matrix.forEach((row, i) => {
    row.forEach((weight, j) => {
      if (weight !== INF && i !== j) {
        const isOnPath = pathSet.has(`${i}-${j}`);
        edges.push({
          id: `e${i}-${j}`,
          source: `${i}`,
          target: `${j}`,
          label: weight === INF ? "∞" : String(weight),
          labelStyle: {
            fill: isOnPath ? "#fde68a" : "#94a3b8",
            fontSize: 10,
            fontWeight: isOnPath ? 700 : 400,
            fontFamily: "JetBrains Mono, monospace",
          },
          labelBgStyle: {
            fill: "rgba(15,23,42,0.85)",
            rx: 4,
          },
          style: {
            stroke: isOnPath ? "#f59e0b" : "rgba(148,163,184,0.35)",
            strokeWidth: isOnPath ? 2 : 1,
          },
          animated: isOnPath,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isOnPath ? "#f59e0b" : "rgba(148,163,184,0.4)",
            width: 12,
            height: 12,
          },
        });
      }
    });
  });

  return { nodes, edges };
}

export default function GraphView({ matrix, highlightPath }) {
  const { nodes: initNodes, edges: initEdges } = buildNodesEdges(matrix, highlightPath);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(() => {
  const { nodes: newNodes, edges: newEdges } =
    buildNodesEdges(matrix, highlightPath);

  setNodes((currentNodes) =>
    newNodes.map((node) => {
      const existing = currentNodes.find(
        (n) => n.id === node.id
      );

      return existing
        ? {
            ...node,
            position: existing.position,
          }
        : node;
    })
  );

  setEdges(newEdges);
}, [matrix, highlightPath]);

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-violet-500"></div>
        <h2 className="text-sm font-semibold text-slate-200">Graphe</h2>
        <span className="text-xs text-slate-500 ml-auto">{matrix.length} sommets</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255,255,255,0.03)" gap={24} size={1} />
        <Controls
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
          }}
        />
      </ReactFlow>
    </div>
  );
}