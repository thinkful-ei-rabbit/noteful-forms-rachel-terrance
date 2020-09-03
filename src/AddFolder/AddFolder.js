import React from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';
import { withRouter } from 'react-router-dom';

function AddFolder() {


    const handleForm = (e) =>{

        console.log(config)
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
                
                console.log('OK!')
              

            } else {
                console.log('NOT')
            }})
            .catch(err => console.log(err, err.message));

    }


    return (
        <form className="newFolder" onSubmit={e => handleForm(e)} >
            <h2>Add a new folder</h2>
            <label htmlFor="folder">Name your new form</label>
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






    )


}

export default withRouter(AddFolder)

