import { Terminal as Xterminal } from "@xterm/xterm"
import { useEffect, useRef } from "react";
import '@xterm/xterm/css/xterm.css'
import socket from "../socket";
function Terminal() {

    const terminalRef = useRef<HTMLDivElement | null>(null)
    const isRendered = useRef<boolean>(false)
    useEffect(() => {
        if(isRendered.current) return;
        isRendered.current = true;

        const term = new Xterminal({
            rows: 20
        });

        if(!terminalRef.current){
            return;
        }

        term.open(terminalRef.current)

        term.onData((data) => {
            socket.emit("terminal:write", data )
        })

        socket.on("terminal:data", (data) => {
            term.write(data)
        })

    }, [])
  return (
        <div ref={terminalRef}></div>
    )
}

export default Terminal