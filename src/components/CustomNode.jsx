import { memo } from "react"
import { Handle, Position } from "@xyflow/react"

function CustomNode({ data, selected }) {
  const nodeStyle = selected ? { padding: "10px", border: "2px solid #3498db", borderRadius: "5px" } : { padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <div>Step: {data.step}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default memo(CustomNode)
