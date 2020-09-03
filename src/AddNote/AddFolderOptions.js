import React from 'react';



export default function AddFolderOptions(props) {
//add error boundary here

    const folderArr = props.folders.map((folder, key) => {
        return (
            <option key={key} value={folder}>{folder}</option>
        )

    })

    return (
        <select id="folderSelection" name="folderSelection">
            {folderArr}
        </select>
    )


}