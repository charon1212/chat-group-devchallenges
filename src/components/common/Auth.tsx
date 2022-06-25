import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, logout } from '../..//features/user/userSlice';
import { auth } from '../../app/firebase/firebase';

type Prop = {
  loginUri: string;
  loadingComponent: React.ComponentType<any>;
  children: ReactNode;
};

/**
 * 認証フィルター。
 *
 * 本フィルタは、下記の機能を提供する。
 *
 * - ログインしているときは、props.childrenを描画する。
 * - ログアウトしているときは、loginUriにリダイレクト遷移する。
 * - 判定処理を実施しているときは、props.loadingComponentを描画する。
 *
 * props.childrenを描画するときは、Reduxのuserに値が入っていることを保証する。
 * ただし、他のオブジェクトからdispatch(login())やdispatch(logout())を呼び出してはならない。
 * かわりに、firebase.authを操作すること。
 *
 * @param props.loginUri ログイン画面のuri。無限ループを避けるため、Authコンポーネントの外のuriを指定すること。
 * @param props.loadingComponent ロード中に描画する画面。
 */
const Auth: React.FC<Prop> = (props) => {
  const dispatch = useDispatch();

  const [hasChecked, setHasChecked] = useState(false);
  const [onSignOut, setOnSignOut] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // ログインしている
        dispatch(login(authUser));
        setIsLogin(true);
      } else {
        // ログインしていない
        /**
         * 本当はここでdispatch(logout())を実行したいが、そうするとuserが初期状態でprops.childrenを描画する。
         * (この匿名関数の処理が全部終わる前に、dispatchした結果が各コンポーネントへ反映されてしまう。)
         * これを避けるため、一度onSignOutを切り替えることでローディングコンポーネントの描画に切り替え、そのあとでdispatch(logout())を実行する。
         */
        setOnSignOut(true);
      }
      setHasChecked(true);
    });
    return () => unSub();
  }, [dispatch]);

  /**
   * user.uidが空文字の状態でprops.childrenを描画したくないため苦肉の策。
   * ログアウトするときのState変化は、
   *   auth.signOut()を呼ぶ
   *     →auth.onAuthStateChangedに渡したobserverが呼び出される
   *     →setOnSignOut(true)が呼び出され、onSignOut=falseとなる。 (この時点でローディングコンポーネントを描画)
   *     →下のuseEffect()が呼び出され、dispatch(logout())を実行。 (この時点でuserがinitialStateとなる)
   *     →setIsLogin(false)で、isLogin=falseとなる。 (ここで、ログイン画面へのリダイレクトコンポーネントを描画)
   */
  useEffect(() => {
    if (onSignOut) {
      dispatch(logout());
      setIsLogin(false);
      setOnSignOut(false);
    }
  }, [onSignOut, dispatch]);

  if (!hasChecked) {
    return <>{props.loadingComponent}</>;
  } else if (onSignOut) {
    return <>{props.loadingComponent}</>;
  } else if (!isLogin) {
    return <Navigate to={props.loginUri} />;
  } else {
    return <>{props.children}</>;
  }
};

export default Auth;
