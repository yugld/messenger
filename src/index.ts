import './style/main.scss';

import { Login } from './pages/login/login';
import { SignUp } from './pages/signup/signup';
import { Chats } from './pages/chats/chats';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/editProfile/editProfile';
import { Error404 } from './pages/error/error404';
import { Error500 } from './pages/error/error500';

import Router from './utils/Router';
import AuthController from './controllers/AuthController';
import store from './utils/Store';

enum Routes {
  Index = '/',
  Login = '/login',
  SignUp = '/signup',
  Profile = '/profile',
  EditProfile = '/editprofile',
  Chats = '/chats',
  Error404 = '/404',
  Error500 = '/500'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, Login)
    .use(Routes.Login, Login)
    .use(Routes.SignUp, SignUp)
    .use(Routes.Profile, Profile)
    .use(Routes.EditProfile, EditProfile)
    .use(Routes.Chats, Chats)
    .use(Routes.Error404, Error404)
    .use(Routes.Error500, Error500)

    //CHANGEE!!
    .start();

  /*let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }*/

});
