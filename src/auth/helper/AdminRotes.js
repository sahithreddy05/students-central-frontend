import React from 'react'
import {Route,Redirect} from "react-router-dom"
import { isAuthenticated } from './index'


function AdminRoutes({ component:Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().user.role!==0? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
export default AdminRoutes