//use react-folder-tree for ui
import "./Tree.css"

interface FileTreeNodeProps {
    fileName: string;
    nodes: { [key: string]: any } | any
}

function FileTreeNode({ fileName, nodes }: FileTreeNodeProps) {
    const isDir: boolean = !!nodes;
    return (
        <div style={{ "paddingLeft": "20px" }}>
            <p className={isDir ? "" : "file-node "}>{fileName}</p>
            {nodes && (
                <ul>
                    {Object.keys(nodes as Object).map((child) =>

                    (
                        <li key={child}>
                            <FileTreeNode fileName={child} nodes={nodes[child]} /></li>
                    )
                    )}
                </ul>
            )}
        </div>
    )
}

function Tree({ tree }: { tree: { [key: string]: any } }) {
    return (
        <FileTreeNode fileName='/' nodes={tree} />
    )
}

export default Tree

