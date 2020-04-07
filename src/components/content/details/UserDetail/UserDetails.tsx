import React, { useState, useContext, FC } from 'react';
import { Dropdown, Button, Form, Image, DropdownProps } from 'semantic-ui-react';
import { StyledForm } from '../../forms/AddUserForm/StyledAddUserForm';
import AvatarsModal from '../../modal/AvatarsWrapper';
import { Users } from '../../../../context/UsersContext';
import { WrapperContent } from './StyledWrapperDetail';
import axios from 'axios';
import { IUser } from '../../../../interfaces/IState';

const UserDetails: FC = (): JSX.Element => {

  const { state, dispatch } = useContext(Users);
  const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser)

  const handleGetSelected = (id: number) => {
    axios.get(`http://localhost:3090/api/users/${id}`).then((result) => {
      setSelectedUser(result.data.data[0]);
    })
  }

  const updateUser = (user: IUser) => {
    axios.post(`http://localhost:3090/api/update/${user.id}`, { user }).then((result) => {
      dispatch({ type: 'UPDATE_USER', payload: result.data.data })
    })
  }

  const getAvatar = (url: string) => {
    setSelectedUser({ ...selectedUser, img_url: url })
  }

  const options: any = [];
  state?.users?.map((user: IUser) => {
    return options.push({
      key: `${user.id}`,
      text: `${user.surname}`,
      value: `${user.id}`,
      image: { avatar: true, src: `${user.img_url}` },
    });
  });

  return (
    <React.Fragment>
      <Dropdown
        placeholder='Select Friend'
        fluid
        selection
        options={options}
        onChange={(event: React.SyntheticEvent<HTMLElement>, { value }) => value && handleGetSelected(+value)}
      />
      {selectedUser.id !== undefined &&
        <WrapperContent>
          <div>
            <Image src={selectedUser.img_url} size='medium' />
            <p> Prénom :&nbsp; {selectedUser.surname}</p>
            <p> Nom :&nbsp; {selectedUser.name}</p>
            <p> Email :&nbsp; {selectedUser.email}</p>
            <Button inverted color='yellow'><a href={`mailto:${selectedUser.email}`}>Send an email to {selectedUser.surname}</a></Button>
          </div>

          {/* <Content> */}
          <StyledForm>
            <Form>
              {/* <div style={{ margin: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Title>Update : {selectedUser.surname} </Title>
                <p>Vote for your favourite ? </p>
                <span>
                  <Rating
                    icon='star'
                    defaultRating={0}
                    maxRating={5}
                    size='huge'
                    onRate={(e, { rating, maxRating }) => setSelectedUser({ ...selectedUser, level: +rating })}
                  />
                </span>
              </div> */}
              <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name'
                  value={selectedUser.surname}
                  onChange={(e) => setSelectedUser({ ...selectedUser, surname: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name'
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email'
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Avatar</label>
                <AvatarsModal getAvatar={getAvatar} />
                <input placeholder='Avatar'
                  value={selectedUser.img_url}
                  onChange={(e) => setSelectedUser({ ...selectedUser, img_url: e.target.value })}
                  hidden
                />
              </Form.Field>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  inverted
                  color='blue'
                  onClick={() => updateUser(selectedUser)}
                >Submit</Button>
              </div>
            </Form>
          </StyledForm>
          {/* </Content> */}
        </WrapperContent>
      }
    </React.Fragment>
  )
}

export default UserDetails