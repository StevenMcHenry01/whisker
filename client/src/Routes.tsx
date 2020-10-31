// 3rd party imports
import React from 'react'
import { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// my imports
import Loading from './components/utils/Loading'

// Lazy Load Pages
const Test = lazy(() => import('./pages/Test'))
const DoesNotExist = lazy(() => import('./pages/DoesNotExits'))
const LoginRegister = lazy(() => import('./pages/LoginRegister'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
const SendResetEmail = lazy(() => import('./pages/SendResetEmail'))

export const Routes = () => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Switch>
          {/* unprotected */}
          <Route exact={true} path='/'>
            <Test />
          </Route>
          <Route exact={true} path='/login-register'>
            <LoginRegister />
          </Route>

          <Route path='/change-password/:token'>
            <ChangePassword />
          </Route>

          <Route path='/forgot-password'>
            <SendResetEmail />
          </Route>

          {/* protected */}
          {/* <Route exact={true} path='/activities'>
            {user ? <Activities /> : <Redirect to='/' />}
          </Route> */}

          <Route>
            <DoesNotExist />
          </Route>
        </Switch>
      </Suspense>
    </>
  )
}
