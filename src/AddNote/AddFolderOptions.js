import React, { Fragment } from 'react';



export default function AddFolderOptions(props) {
    return (
        <Fragment>
            {props.folders.map((folder, i) =>
                <option key={i}
                    id={folder.id}
                    name={folder.name}>
                    {folder.name}
                </option>)}
        </Fragment>

    )


}


