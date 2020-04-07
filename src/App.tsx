import React, { FC } from 'react';
import { Title, UserWrapper } from './StyledApp';
import NavPannel from './components/nav-pannel/NavPannel';
import TabContent from './components/content/tab/TabContent';
import { UsersProvider } from './context/UsersContext';


const App: FC = (): JSX.Element => {

  return (
    <React.Fragment>
      <Title>My first CRUD Express Mysql with React</Title>
      <UsersProvider>
        <UserWrapper >
          <NavPannel />
        </UserWrapper>
        <TabContent />
      </UsersProvider>
    </React.Fragment>
  );
}

export default App;
