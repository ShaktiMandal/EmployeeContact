import React, { useMemo, useState } from 'react';
import './App.css';
import {AppContext} from './container/appContext';
const AppRoutes = React.lazy(()=> import('./components/routing'))


function App() {

  const [context, setContext] = useState(null);
  //This is to update the context anywhere in the application. 
  //Added it to update the context when user successfully logged in
  var value = useMemo(()=> ({context, setContext}), [context, setContext]);


  return (
    <div className="App" >
      <AppContext.Provider value={value}>
          <AppRoutes/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
