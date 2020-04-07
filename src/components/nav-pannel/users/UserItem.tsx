import React, { useContext, FC } from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import { StyledCard } from './StyledUserItem';
import { Users } from '../../../context/UsersContext';
import axios from 'axios';
import moment from 'moment';
import { IUser } from '../../../interfaces/IState';

const UserItem: FC<IUser> = (user: IUser): JSX.Element => {
    const { dispatch } = useContext(Users);

    const renderStars = (range: any) => {
        let stars = []
        for (let i = 0; i < range; i++) {
            stars.push(<Icon key={i} name='star' size='small' color='yellow' />)
        }
        return stars
    }

    const deleteUser = (userID: number) => {
        if (userID !== null || userID !== undefined) {
            axios.post(`http://localhost:3090/api/delete/${userID}`).then((result) => {
                dispatch({ type: 'DELETE_USER', payload: result.data.data })
            })
        }
    }

    return (
        <React.Fragment>
            <StyledCard>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={user.img_url}
                    />
                    <Card.Header>{user.surname} {user.name}</Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                        <div>User present since {moment(user.created_at).fromNow()}</div>
                        <div>Current rating</div>
                        <div>{renderStars(user.level)}</div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button inverted color='red' onClick={() => deleteUser(user.id)}>
                            Delete
                            </Button>
                    </div>
                </Card.Content>
            </StyledCard>
        </React.Fragment>
    )
}

export default UserItem