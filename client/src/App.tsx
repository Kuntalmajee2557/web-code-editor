import { useEffect, useState } from "react"
import Terminal from "./components/Terminal"
import Tree from "./components/Tree"
import socket from "./socket"
import AceEditor from "react-ace";
import { getMode } from "./getMode";
import './App.css'

import "ace-builds/src-noconflict/theme-ambiance";
// Importing modes for Ace Editor
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-tsx';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/mode-dart';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-scss';
import 'ace-builds/src-noconflict/mode-less';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-yaml';

import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-toml';
import 'ace-builds/src-noconflict/mode-ini';

import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-tex';
import 'ace-builds/src-noconflict/mode-latex';

import 'ace-builds/src-noconflict/mode-svg';
import 'ace-builds/src-noconflict/mode-vue';
import 'ace-builds/src-noconflict/mode-text';

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
    if (selectedFile != '') {
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
    <div className="overflow-hidden h-screen w-screen grid grid-cols-12 grid-rows-6">
      <div className="col-span-2 row-span-6 border border-b-amber-500 " >
        <div className=" border border-pink-400">
        <Tree tree={fileTree} onSelect={(data: any) => setSelectedFile(data)} />

        </div>
      </div >
      <div className="col-span-10 row-span-4 border border-b-amber-500 flex flex-col" >
        <p>{selectedFile.replaceAll("/", " > ")}</p>
        <div className="border border-purple-500 h-full">
          {selectedFile && <AceEditor mode={getMode(selectedFile)} theme="ambiance" width="100%" height="100%" fontSize="16px" value={code} onChange={(e) => setCode(e)} />}
        </div>

      </div>
      <div className="col-span-10 row-span-2">
        <Terminal />

      </div>
    </div>
  )
}

export default App
