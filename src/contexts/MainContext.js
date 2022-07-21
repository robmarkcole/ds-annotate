import { createContext, useReducer } from 'react';
import propTypes from 'prop-types';
import projects from './../static/projects.json';
import {
  downloadGeojsonReducer,
  downloadInJOSMReducer,
  activeClassReducer,
  activeProjectReducer
} from './../reducers';

export const MainContext = createContext();

const MainContextProvider = (props) => {
  const [activeProject, dispatchSetActiveProject] = useReducer(
    activeProjectReducer,
    null
  );

  const [activeClass, dispatchSetActiveClass] = useReducer(
    activeClassReducer,
    null
  );

  const [dlGeojson, dispatchDLGeojson] = useReducer(
    downloadGeojsonReducer,
    false
  );

  const [dlInJOSM, dispatchDLInJOSM] = useReducer(downloadInJOSMReducer, false);

  return (
    <MainContext.Provider
      value={{
        projects,
        activeProject,
        dispatchSetActiveProject,
        activeClass,
        dispatchSetActiveClass,
        dlGeojson,
        dispatchDLGeojson,
        dlInJOSM,
        dispatchDLInJOSM
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainContextProvider.propTypes = {
  children: propTypes.node
};

export default MainContextProvider;
