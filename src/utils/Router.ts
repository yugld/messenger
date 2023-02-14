class Block {
    getContent() { }

    show() {
        console.log('show');
    }

    hide() {
        console.log('hide');
    }
}

class Chats extends Block {
    getContent() {
        return 'chats';
    }

    show() {
        console.log('show chats');
    }

    hide() {
        console.log('hide chats');
    }
}

class Users extends Block {
    getContent() {
        return 'users';
    }

    show() {
        console.log('show users');
    }

    hide() {
        console.log('hide users');
    }
}

function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {
    const root = document.querySelector(query);
    root.textContent = block.getContent();
    return root;
}

class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    //регистрирует блок по пути в роут и возвращает себя —
    // чтобы можно было выстроить в цепочку
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        
        this.routes.push(route);

        return this;
    }

    //по событию onpopstate запускает приложение
    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = event => {
            this._onRoute(event. currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
      
         if (!route) {
          return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    //переходит на нужный роут и отображает нужный блок
    go(pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    //возвращает в прошлое состояние и показывает блок, 
    //соответствующий тому состоянию
    back() {
        //this.history.back();
        this.history.go(-1);
        this._onRoute(pathname);
    }

    // переходит в следующие состояние и показывает соответствующий блок
    forward() {
        //this.history.forward();
        this.history.go(1);
        this._onRoute(pathname);
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

// Необходимо оставить в силу особенностей тренажёра
history.pushState({}, '', '/');

const router = new Router(".app");

// Можно обновиться на /user и получить сразу пользователя
router
    .use("/", Chats)
    .use("/users", Users)
    .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
setTimeout(() => {
    router.go("/users");
}, 1000);

// А можно и назад
setTimeout(() => {
    router.back();
}, 3000);

// И снова вперёд
setTimeout(() => {
    router.forward();
}, 5000);
