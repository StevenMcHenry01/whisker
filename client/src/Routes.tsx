// 3rd party imports
import React from 'react'
import { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// my imports
import Loading from './components/utils/Loading'

// Lazy Load Pages
const Test = lazy(() => import('./pages/Test'))
const DoesNotExist = lazy(()=> import('./pages/DoesNotExits'))
const LoginRegister = lazy(()=> import('./pages/LoginRegister'))

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
          <Route exact={true} path='/' children={<Test />} />
          <Route exact={true} path='/login-register' children={<LoginRegister />} />
          
          {/* protected */}
          {/* <Route exact={true} path='/activities'>
            {user ? <Activities /> : <Redirect to='/' />}
          </Route> */}

          <Route children={<DoesNotExist />} />
        </Switch>
      </Suspense>
    </>
  )
}
