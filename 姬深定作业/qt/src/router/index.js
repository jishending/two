import React from 'react';
import RouterMap from '../router/map';
import routes from './router';
import {BrowserRouter} from 'react-router-dom';
function RouterView(props) {
    return <BrowserRouter>
        <RouterMap routes={routes}></RouterMap>
    </BrowserRouter>       
    
    
}
export default RouterView;