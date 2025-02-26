"use client"

import { useState, useCallback } from "react"
import { ReactFlow, addEdge, MiniMap, Controls, Background, useNodesState, useEdgesState } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import Sidebar from "./components/Sidebar"
import CustomNode from "./components/CustomNode"
import { initialNodes, initialEdges } from "./initialData"

const nodeTypes = {
  custom: CustomNode,
}

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [history, setHistory] = useState([]) // Stack for undo/redo
  const [redoStack, setRedoStack] = useState([]) // Stack for redo

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      const newEdges = addEdge(params, eds)
      return newEdges
    })
  }, [setEdges])

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node)
  }, [])

  const addNewNode = useCallback(
    (nodeData) => {
      const newNode = {
        id: `node_${nodes.length + 1}`,
        type: "custom",
        position: { x: 100, y: 100 },
        data: { label: nodeData.label, step: nodeData.step, subNodes: [] },
      }
      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode)
        setHistory([...history, { action: "add", nodes: updatedNodes, edges }])
        return updatedNodes
      })
    },
    [nodes, setNodes, edges, history]
  )

  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, ...newData } }
          }
          return node
        }),
      )
    },
    [setNodes],
  )

  const clearCanvas = useCallback(() => {
    setNodes([])
    setEdges([])
    setHistory([...history, { action: "clear", nodes: [], edges: [] }])
  }, [setNodes, setEdges, history])

  const deleteNode = useCallback(() => {
    if (selectedNode) {
      const parentNodeId = edges.find((edge) => edge.target === selectedNode.id)?.source
      const childNodes = edges.filter((edge) => edge.source === selectedNode.id).map((edge) => edge.target)

      // If a parent exists, we need to attach the children to the parent
      if (parentNodeId) {
        setEdges((eds) => {
          const newEdges = eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id)
          // Attach each child to the parent node
          childNodes.forEach((childId) => {
            newEdges.push({ source: parentNodeId, target: childId })
          })
          return newEdges
        })
      }

      setNodes((nds) => {
        const updatedNodes = nds.filter((node) => node.id !== selectedNode.id)
        setHistory([...history, { action: "delete", nodes: updatedNodes, edges }])
        return updatedNodes
      })
    }
  }, [selectedNode, nodes, edges, setNodes, setEdges, history])

  const undo = () => {
    const lastAction = history.pop()
    if (lastAction) {
      setNodes(lastAction.nodes)
      setEdges(lastAction.edges)
      setRedoStack([...redoStack, lastAction])
    }
  }

  const redo = () => {
    const redoAction = redoStack.pop()
    if (redoAction) {
      setNodes(redoAction.nodes)
      setEdges(redoAction.edges)
      setHistory([...history, redoAction])
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <Sidebar
        addNewNode={addNewNode}
        updateNodeData={updateNodeData}
        clearCanvas={clearCanvas}
        selectedNode={selectedNode}
        deleteNode={deleteNode}
        undo={undo}
        redo={redo}
      />
    </div>
  )
}

export default App
