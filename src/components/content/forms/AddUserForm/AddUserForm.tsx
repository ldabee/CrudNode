import React, { useState, useContext, FC } from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import { Content, StyledForm, Title } from './StyledAddUserForm';
import axios from 'axios';
import AvatarsModal from '../../modal/AvatarsWrapper';
import { Users } from '../../../../context/UsersContext';
import { IUser } from '../../../../interfaces/IState';

const AddUserForm: FC = (): JSX.Element => {

  const { state, dispatch } = useContext(Users);
  const [userToAdd, setUserToAdd] = useState({} as IUser)

  const AddAndClear = (user: IUser) => {
    axios.post('http://localhost:3090/api/create', { user }).then(() => {
      dispatch({ type: 'ADD_USER', payload: [...state.users, user] })
    })
    setUserToAdd({} as IUser)
  }

  const getAvatar = (url: string) => {
    setUserToAdd({ ...userToAdd, img_url: url })
  }

  return (
    <React.Fragment>
      <Content>
        <Title>Add a user here </Title>
        <StyledForm>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name'
                value={userToAdd.surname}
                onChange={(e) => setUserToAdd({ ...userToAdd, surname: e.target.value })} />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name'
                value={userToAdd.name}
                onChange={(e) => setUserToAdd({ ...userToAdd, name: e.target.value })} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email'
                value={userToAdd.email}
                onChange={(e) => setUserToAdd({ ...userToAdd, email: e.target.value })} />
            </Form.Field>
            <Form.Field>
              <label>Avatar</label>
              <div
                style={{ display: 'flex', width: '20%', justifyContent: 'space-around' }}
              >
                <Image
                  src={userToAdd.img_url ? userToAdd.img_url : 'https://olympus.umons.ac.be/wp-content/uploads/2018/01/empty-avatar-1170x1170.png'}
                  size="mini"
                />
                <AvatarsModal getAvatar={getAvatar} />
                <input placeholder='Avatar'
                  value={userToAdd.img_url}
                  onChange={(e) => setUserToAdd({ ...userToAdd, img_url: e.target.value })}
                  hidden
                />
              </div>
            </Form.Field>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit'
                inverted
                color='blue'
                onClick={() => AddAndClear(userToAdd)}
              >Submit</Button>
            </div>
          </Form>
        </StyledForm>
      </Content>
    </React.Fragment>
  )
}

export default AddUserForm