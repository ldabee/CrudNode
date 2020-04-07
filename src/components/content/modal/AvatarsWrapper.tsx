import React, { useState, useContext, FC } from 'react';
import { Button, Popup, Icon } from 'semantic-ui-react';
import { StyledAvatar } from './StyleImage';


import { Users } from '../../../context/UsersContext';
import { IAvatar } from '../../../interfaces/IState';

const AvatarsModal: FC<any> = (props: any): JSX.Element => {
  const { state } = useContext(Users);
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Popup
        content={state.avatars.length && state.avatars.map((avatar: IAvatar) => {
          return (
            <StyledAvatar
              wrapped size='mini'
              key={avatar.id}
              src={avatar.url}
              onClick={() => { props.getAvatar(avatar.url); setOpen(false) }}
            />
          )
        })}
        on='click'
        pinned
        trigger={<Button icon inverted color='green'><Icon name='user secret' /></Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      />
    </React.Fragment>
  )
}

export default AvatarsModal