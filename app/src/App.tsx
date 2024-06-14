import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import routes from './routes';
import { userStore } from './store/userStore';
import { languageStore } from './store/languageStore';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'));


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const { t, i18n } = useTranslation()

  const token: string = userStore((state: any) => state.token)
  const lang: string = languageStore((state: any) => state.lang)
  const user: any = JSON.parse(userStore((state: any) => state.user))


  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/login" element={token == null && token == undefined ? <Login /> : <Navigate to="/" replace={true} />} />

        <Route element={<DefaultLayout />}>
          <Route path="/" element={token != null && token != undefined ? <Dashboard /> : <Navigate to="/auth/login" replace={true} />}>

          </Route>

          {/* <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })} */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
