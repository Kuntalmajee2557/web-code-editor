import { Terminal as Xterminal } from "@xterm/xterm"
import { useEffect, useRef } from "react";
import '@xterm/xterm/css/xterm.css'
function Terminal() {

    const terminalRef = useRef<HTMLDivElement | null>(null)
    const isRendered = useRef<boolean>(false)
    useEffect(() => {
        if(isRendered.current) return;
        isRendered.current = true;
        const term = new Xterminal({
            rows: 20
        });
        if(terminalRef.current){
            term.open(terminalRef.current)
        }
        term.onData((data) => {
            console.log(data)
        })

    }, [])
  return (
        <div ref={terminalRef}></div>
    )
}

export default Terminal