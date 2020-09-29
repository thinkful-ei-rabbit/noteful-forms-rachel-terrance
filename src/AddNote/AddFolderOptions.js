import React, { Fragment } from 'react';
import PropTypes from 'prop-types';



export default function AddFolderOptions(props) {

    return (
        < Fragment >
            {
                props.folders.map((folder, i) =>
                    <option key={i}
                        id={folder.id}
                        name={folder.title}>
                        {folder.title}
                    </option>)
            }
        </Fragment >
    )
}

AddFolderOptions.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.object)
}


