import { AuthAPI } from '../api/AuthAPI';
import { SigninData, SignupData } from '../api/types';
import store from '../utils/Store';
import router from '../utils/Router';
//import { Routes } from "../index";

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = new AuthAPI;
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);
            await this.fetchUser();
            router.go('/profile');
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);

            this.fetchUser();
            router.go('/profile');
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser() {
        const user = await this.api.read();
        store.set('user', user);
    }

    async logout() {
            await this.api.logout();
            router.go('/');
            store.set("user", undefined);
    }
}

export default new AuthController();
