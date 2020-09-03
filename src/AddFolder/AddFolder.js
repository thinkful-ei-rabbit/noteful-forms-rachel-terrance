import React from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';





function AddFolder(props) {

//props.history.push('/')
    //make this redirect to state function in api
    //then have it go backwords
    //how do other 


    //activate context
    //class static
    //function context consumer

    const handleForm = (e, addFolder) =>{

        //update, recieve, save into state
        e.preventDefault();
        const name= e.target.folder.value;

       fetch(`${config.API_ENDPOINT}/folders`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
        
    })
            .then(res => {
                if(res.ok){
                   return res.json();
                    
                } else {
                    return Promise.reject('Unable to fetch');
                }})
            .then(folder => {
                addFolder(folder);
                props.history.push('/');
                
            })
            .catch(err => console.log(err, err.message));

    }


    return (
        <ApiContext.Consumer>
            {({addFolder}) =>
        <form className="newFolder" onSubmit={e => handleForm(e, addFolder)} >
            <h2>Add a new folder</h2>
            <label htmlFor="folder">Folder name</label>
            <input
                type="text"
                className="registration__control"
                name="folder"
                id="folder"
            />
           
            <CircleButton
                tag='button'
                type='submit'
                className='AddFolder__add-folder-submit'
                >
                Submit
          </CircleButton>

        </form>
        }
        </ApiContext.Consumer>
    )
}

export default withRouter(AddFolder)

