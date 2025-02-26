export const initialNodes = [
    {
      id: "1",
      type: "custom",
      data: { label: "Node 1", step: "Step 1", subNodes: [] },
      position: { x: 250, y: 5 },
    },
    {
      id: "2",
      type: "custom",
      data: { label: "Node 2", step: "Step 2", subNodes: [] },
      position: { x: 100, y: 100 },
    },
    {
      id: "3",
      type: "custom",
      data: { label: "Node 3", step: "Step 2", subNodes: [] },
      position: { x: 400, y: 100 },
    },
  ]
  
  export const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
  ]
  
  