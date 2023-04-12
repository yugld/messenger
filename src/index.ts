//@ts-nocheck
import './style/main.scss';

import { Login } from './pages/login/login';
import { SignUp } from './pages/signup/signup';
import { MessengerPage } from './pages/Messenger/index';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/editProfile/editProfile';
import { EditPassword } from './pages/editPassword/editPassword';
import { Error404 } from './pages/error/error404';
import { Error500 } from './pages/error/error500';

import Router from './utils/Router';
import AuthController from './controllers/AuthController';

enum Routes {
    Index = '/',
    Login = '/login',
    SignUp = '/signup',
    Profile = '/profile',
    EditProfile = '/editprofile',
    EditPassword = '/editpassword',
    Messenger = '/messenger',
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
        .use(Routes.EditPassword, EditPassword)
        .use(Routes.Messenger, MessengerPage)
        .use(Routes.Error404, Error404 )
        .use(Routes.Error500, Error500)


    let isProtectedRoute = true;

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
    }

});
