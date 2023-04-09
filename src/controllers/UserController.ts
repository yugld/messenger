import { UserAPI, API } from "../api/UserAPI";
import { ChangePasswordData, ChangeUserData } from "../api/types";
import store from "../utils/Store";
import router from "../utils/Router";

class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async changeUser(data: ChangeUserData) {
        try {
            const user = await this.api.change(data);
            store.set("user", user);
            router.go('/profile');
        } catch (e) {
            console.error(e.message);
        }
    }

    async changePassword(data: ChangePasswordData) {
        try {
            await this.api.changePassword(data);
            router.go('/profile');
        } catch (e) {
            console.error(e.message);
        }
    }

    async changeAvatar(formData: FormData) {
        try {
            const user = await this.api.changeAvatar(formData);
            store.set("user", user);
            router.go('/messenger');
        } catch (e) {
            console.error(e.message);
        }
    }
    async searchUser(login: string) {
        store.set("userSearchResultList", undefined);
        try {
            const userSearchResultList = await this.api.searchUser({ login });
            store.set("userSearchResultList", userSearchResultList);
        } catch (e) {
            console.error(e.message);
        }
    }
}

export default new UserController();
