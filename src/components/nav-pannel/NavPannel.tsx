import React, { useContext, useEffect, FC } from 'react';
import { Pannel } from './StyledNavPannel';
import UserItem from './users/UserItem';
import { Users } from '../../context/UsersContext';
import axios from 'axios';
import { IUser } from '../../interfaces/IState';

const NavPannel: FC = (): JSX.Element => {
    const { state, dispatch } = useContext(Users);

    useEffect(() => {
        axios.get('http://localhost:3090/api/users').then((result) => {
            return dispatch({
                type: 'FETCH_USERS', payload: result.data.data
            });
        })
        axios.get('http://localhost:3090/api/avatars').then((result) => {
            return dispatch({
                type: 'FETCH_AVATARS', payload: result.data.data
            })
        })
    }, [dispatch])

    return (
        <React.Fragment>
            <Pannel>
                {state.users.length && state.users.map((user: IUser, idx: number) => <UserItem key={idx} {...user} />)}
            </Pannel>
        </React.Fragment>
    )

}

export default NavPannel