class Block {
    getContent() { }

    show() {
        console.log('show');
    }

    hide() {
        console.log('hide');
    }
}

class Button extends Block {
    getContent() {
        return 'Button';
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

    //метод для отображения вьюшки, 
    //если переданный URL совпадает с URL текущего Route
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    //вызывает hide у элемента
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    //создаёт блок, если тот ещё не был создан 
    //(нужно создавать блок только после первого перехода на страницу), 
    //иначе вызывает у блока метод show
    render() {
        if(!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }
}

const route = new Route('/buttons', Button, {
    rootQuery: '.app',
});

route.render();

console.log(route._pathname, route._props); // /buttons, {rootQuery: '.app'}

route.navigate('/buttons'); // show
route.navigate('/trash'); // не будет никакого лога
route.leave(); // hide
