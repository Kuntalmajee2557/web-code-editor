import { useEffect, useState } from "react"
import Terminal from "./components/Terminal"
import Tree from "./components/Tree"

function App() {
  const [fileTree, setFileTree] = useState({})
    useEffect(() => {
      async function getFileTree(){
        const response = await fetch("http://localhost:3000/files")
        const result = await response.json()
        console.log(result)
        setFileTree(result.tree)
      }
      getFileTree()
  }, [])

  return (
    <div>
      <Terminal />
      <Tree tree={fileTree} />
    </div>
  )
}

export default App
