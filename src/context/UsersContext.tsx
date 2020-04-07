import React, { useReducer } from 'react';
import { IState, IAction } from '../interfaces/IState';
import moment from 'moment';


const initialState: IState = {
  users: [],
  avatars: []
}

export const Users = React.createContext<IState | any>(initialState);

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload }
    case 'FETCH_AVATARS':
      return { ...state, avatars: action.payload }
    case 'ADD_USER':
      return { ...state, users: action.payload }
    case 'UPDATE_USER':
      return { ...state, users: action.payload }
    case 'DELETE_USER':
      return { ...state, users: action.payload }
    default:
      return state
  }
}

console.log(moment(new Date()))

export const UsersProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Users.Provider value={{ state, dispatch }}>
      {props.children}
    </Users.Provider>
  )
}