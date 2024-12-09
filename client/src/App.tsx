import { useEffect, useState } from "react"
import Terminal from "./components/Terminal"
import Tree from "./components/Tree"
import socket from "./socket"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function App() {
  const [fileTree, setFileTree] = useState({})
  const [selectedFile, setSelectedFile] = useState<any | undefined>('')
  const [code, setCode] = useState('')
  async function getFileTree() {
    const response = await fetch("http://localhost:3000/files")
    const result = await response.json()
    setFileTree(result.tree)
  }

  async function getFileContent() {
    const response = await fetch(`http://localhost:3000/files/content?path=${selectedFile}`)
    const result = await response.json();
    setCode(result.content)
  }

  useEffect(() => {
    getFileTree()
  }, [])

  useEffect(() => {
    if(selectedFile != ''){
      getFileContent();
    }
  }, [selectedFile])

  useEffect(() => {
    socket.on("file:refresh", getFileTree)
  }, [])

  useEffect(() => {
    if (selectedFile != '') {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code
        })
      }, 1000);
      return () => {
        clearTimeout(timer);
      }
    }


  }, [code])


  return (
    <div>
      <Terminal />
      <div>
        {selectedFile.replaceAll("/", " > ")}
      </div>
      <Tree tree={fileTree} onSelect={(data: any) => setSelectedFile(data)} />
      {selectedFile && <AceEditor value={code} onChange={(e) => setCode(e)} />}
    </div>
  )
}

export default App
