import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/common/Auth';
import AuthLoading from './components/common/AuthLoading';
import Main from './components/pages/main/Main';
import AuthTop from './components/pages/signin/AuthTop';

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
