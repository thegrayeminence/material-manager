import React from 'react'
import Rename from '../pages/Rename'


function filereader() {
    const fileInput = Rename.getElementById('fileinput_I')
    const previewDiv = Rename.getElementById('previewDiv')

    fileInput.addEventListener('change', () => {

        const fr = new FileReader();

        fr.readAsText(fileInput.files[0])
        fr.addEventListener('load', () => {
            previewDiv.textContent = fr.result;

        })

    })

  return (
   <>
   
   <div></div>
   </>
  )
}

export default filereader