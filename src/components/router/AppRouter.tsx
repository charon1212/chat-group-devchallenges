import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import AuthLoading from './AuthLoading';
import Main from '../pages/main/Main';
import AuthTop from '../pages/auth/AuthTop';

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={pathSignin} element={<AuthTop />} />
          <Route
            path='*'
            element={
              <>
                <Auth loginUri={pathSignin} loadingComponent={AuthLoading}>
                  <Main />
                </Auth>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export const pathTop = '/';
export const pathSignin = '/signin';

export default AppRouter;
