"use client"

import { useState } from "react"

function Sidebar({ addNewNode, updateNodeData, clearCanvas, selectedNode, deleteNode, undo, redo }) {
  const [nodeLabel, setNodeLabel] = useState("")
  const [nodeStep, setNodeStep] = useState("")

  const handleAddNode = () => {
    if (nodeLabel && nodeStep) {
      addNewNode({ label: nodeLabel, step: nodeStep })
      setNodeLabel("")
      setNodeStep("")
    }
  }

  const handleUpdateNode = () => {
    if (selectedNode && (nodeLabel || nodeStep)) {
      updateNodeData(selectedNode.id, {
        label: nodeLabel || selectedNode.data.label,
        step: nodeStep || selectedNode.data.step,
      })
      setNodeLabel("")
      setNodeStep("")
    }
  }

  return (
    <div style={{ padding: "20px", width: "250px", background: "#f0f0f0" }}>
      <h3>Add/Edit Node</h3>
      <input type="text" placeholder="Node Label" value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)} />
      <input type="text" placeholder="Node Step" value={nodeStep} onChange={(e) => setNodeStep(e.target.value)} />
      <button onClick={handleAddNode}>Add Node</button>
      {selectedNode && <button onClick={handleUpdateNode}>Update Node</button>}
      {selectedNode && <button onClick={deleteNode}>Delete Node</button>}
      <button onClick={clearCanvas}>Clear Canvas</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  )
}

export default Sidebar
