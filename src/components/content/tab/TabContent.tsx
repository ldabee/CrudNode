import React, { FC } from 'react';
import { Tab } from 'semantic-ui-react'
import AddUserForm from '../forms/AddUserForm/AddUserForm';
import UserDetails from '../details/UserDetail/UserDetails';
import { Tabs } from './StyledTabContent';


const panes = [
    { menuItem: 'Detail', render: () => <Tab.Pane><UserDetails /></Tab.Pane> },
    { menuItem: 'Add', render: () => <Tab.Pane><AddUserForm /></Tab.Pane> }
]

const TabContent: FC = (): JSX.Element => <Tabs panes={panes} style={{ backgroundColor: 'rgba(143, 153, 176,0.75)' }} />



export default TabContent