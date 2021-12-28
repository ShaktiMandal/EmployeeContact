import React, { useMemo, useState } from 'react';
import './App.css';
import {AppContext} from './container/appContext';
const AppRoutes = React.lazy(()=> import('./components/routing'))


function App() {

  const [context, setContext] = useState(null);
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
