//use react-folder-tree for ui
import "./Tree.css"

interface FileTreeNodeProps {
    fileName: string;
    nodes: { [key: string]: any } | any,
    path: string,
    onSelect: any
}

function FileTreeNode({ fileName, nodes, path, onSelect }: FileTreeNodeProps) {
    const isDir: boolean = !!nodes;
    return (
        <div style={{ "paddingLeft": "20px" }} onClick={(e) => {
            e.stopPropagation()
            if(isDir) return;
            onSelect(path)

        }}>
            <p className={isDir ? "" : "file-node "} >{fileName}</p>
            {nodes && fileName != 'node_modules' && (
                <ul>
                    {Object.keys(nodes as Object).map((child) =>

                    (
                        <li key={child}>
                            <FileTreeNode fileName={child} nodes={nodes[child]} path={path + "/" + child} onSelect={onSelect} /></li>
                    )
                    )}
                </ul>
            )}
        </div>
    )
}

function Tree({ tree, onSelect }: { tree: { [key: string]: any }, onSelect: any }) {
    return (
        <FileTreeNode fileName='' nodes={tree} path='' onSelect={onSelect}/>
    )
}

export default Tree

