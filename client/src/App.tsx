import { useEffect, useState } from "react"
import Terminal from "./components/Terminal"
import Tree from "./components/Tree"
import socket from "./socket"

function App() {
  const [fileTree, setFileTree] = useState({})
  async function getFileTree(){
    const response = await fetch("http://localhost:3000/files")
    const result = await response.json()
    console.log(result)
    setFileTree(result.tree)
  }
    useEffect(() => {
      getFileTree()
  }, [])

  useEffect(() => {
    socket.on("file:refresh", getFileTree)
  })

  return (
    <div>
      <Terminal />
      <Tree tree={fileTree} />
    </div>
  )
}

export default App
