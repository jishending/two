import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';

class RouterMap extends Component {
    render() {
        const { routes} = this.props;
        console.log(this.props)
        const defaultRoute = <Redirect from="/" to="/login" key={'default'} exact {...this.props}></Redirect>;
        return <Switch>
                {
                    routes.map((item, index) => {
                        const children = item.children === undefined ? [] : item.children;
                        const Comp = item.component;
                        return <Route key={item.name} path={item.path} component={(props) => {
                           return <Comp routes={children} {...props}></Comp>
                        }} />
                    }).concat([defaultRoute])
                }

            </Switch>
    }
}
export default RouterMap;