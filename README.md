# React Flow with Node Management

This project is a simple and interactive flow chart builder application using **React Flow**, allowing users to create, update, and manage nodes and edges in a flow chart. It provides functionality such as adding nodes, editing node properties (e.g., label, step), updating node positions, adding/removing edges, and more. 

It also includes robust **undo/redo** functionality and ensures that when a node is deleted, its child nodes are reattached to its parent node.

---

## Features

- **Node Creation**: Add custom nodes to the flow chart with labels and steps.
- **Node Editing**: Update the label and step of nodes, as well as change their positions.
- **Edge Management**: Connect nodes with edges, and automatically manage relationships when a node is deleted.
- **Undo/Redo**: Keep track of all actions (node addition, position change, edge addition/removal) and allow undoing and redoing those actions.
- **Child Node Reattachment**: Automatically reattach child nodes to the parent node when an intermediate node is deleted.

---

## Installation

To get started with the project, follow the steps below:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/react-flow-node-management.git
   cd react-flow-node-management

2. **Install dependencies: Using npm:**:
   ```bash
   npm install

3. **Run the project: After installing dependencies, start the development server:**:
   ```bash
   npm start

4. Access the app: The app should now be running at http://localhost:3000 in your browser.

## Usage

The app provides a simple user interface that allows users to interact with a flow chart. Here's how to use the app:

### Sidebar Features:
- **Add Node**: Input a label and step, then click "Add Node" to add a new node to the canvas.
- **Update Node**: Select a node to edit and modify its label and step.
- **Delete Node**: Delete the selected node. If the node has child nodes, they will automatically be connected to the parent node.
- **Clear Canvas**: Clears the entire canvas (nodes and edges).
- **Undo**: Undo the last action (node addition, position update, edge modification, etc.).
- **Redo**: Redo the previously undone action.

### Canvas Features:
- **Drag Nodes**: Click and drag nodes to change their positions on the canvas.
- **Connect Nodes**: Click on a node’s output handle (bottom) and drag to another node’s input handle (top) to create an edge between them.
- **Node Selection**: Clicking on a node will select it and enable editing options in the sidebar.

## Technologies Used
**React**: The core JavaScript library for building the user interface.
**React Flow**: A flexible library for building interactive node-based diagrams and flowcharts.
**React Hooks**: State management and side effects using React hooks (useState, useCallback, useNodesState, useEdgesState).
**CSS**: Basic CSS for styling the components.

## How It Works
The application manages two primary elements: nodes and edges.
###Nodes
Each node in the flow chart has the following properties:
- **id**: Unique identifier for each node.
- **type**: The type of the node, used to render it with a custom component (e.g., CustomNode).
- **position**: The x and y coordinates that define the node's location on the canvas.
- **data**: Contains metadata like the node's label and step.
### Edges
An edge is a connection between two nodes. Each edge has:
- **source**: The ID of the node from which the edge originates.
- **target**: The ID of the node to which the edge points.

## Child Node Reattachment
When a node is deleted, the app checks if the node has any child nodes. If the node has children, the app attaches them to its parent node (if a parent exists) and updates the flow chart accordingly.

### Deployment
The project is deployed on the given site [https://grand-gecko-646cd3.netlify.app/](https://grand-gecko-646cd3.netlify.app/)
