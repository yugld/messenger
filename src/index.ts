import './style/main.scss';

import { Login } from './pages/login/login';
import { SignUp } from './pages/signup/signup';
import { Chats } from './pages/chats/chats';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/editProfile/editProfile';
import { Error404 } from './pages/error/error404';
import { Error500 } from './pages/error/error500';

export function renderPage(selector: string, page: any) {
  const root = document.querySelector(selector)!;
  root.innerHTML = '';
  root.append(page.getContent()!);
}

window.addEventListener('DOMContentLoaded', () => {
  const path = document.location.pathname;
  switch (path) {
    case '/':
      break;
    case '/login':
      renderPage('#app', new Login({ title: 'Вход' }));
      break;
    case '/signup':
      renderPage('#app', new SignUp({ title: 'Регистрация' }));
      break;
    case '/chats':
      renderPage('#app', new Chats({ title: 'Chat' }));
      break;
    case '/profile':
      renderPage('#app', new Profile({ title: 'Иван' }));
      break;
    case '/editProfile':
      renderPage('#app', new EditProfile({ title: 'Edit Profile' }));
      break;
    case '/error404':
      console.log('render404');
      renderPage('#app', new Error404({ title: '404' }));
      break;
    case '/error500':
      renderPage('#app', new Error500({ title: '500' }));
      break;
  }
});
