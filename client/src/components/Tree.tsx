import React, { useEffect, useState } from 'react'
import "./Tree.css"

function Tree({ fileObj }: { fileObj: { [key: string]: any } }) {
    return (
        <ul>
            {Object.keys(fileObj as Object).map((child) => {
                if (fileObj[child] == null) {
                    return <li key={child}>{child}</li>
                }
                else {
                    return (
                        <li key={child}>{child}
                            <Tree fileObj={fileObj[child]} /></li>
                    )

                }
            })}
        </ul>
    )
}

export default Tree