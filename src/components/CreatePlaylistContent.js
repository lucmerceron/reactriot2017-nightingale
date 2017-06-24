import React from 'react'

import FormInputText from './generalPurpose/form/FormInputText'
import Button from './generalPurpose/Button'

import './CreatePlaylistContent.css'

const CreatePlaylistContent = () => (
  <div>
    <h2>Create a Playlist</h2>
    <FormInputText label="Playlist title" placeholder="Your awesome playlist title" onChange={(value) => console.log(value)} />
    <FormInputText label="User Name" placeholder="Give you an awesome name" onChange={(value) => console.log(value)} />
    <Button label="let's rock" onClick={() => console.log('create playlist')} />
  </div>
)

export default CreatePlaylistContent
