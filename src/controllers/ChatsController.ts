import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (error) {
      console.log(error);
    }
  }

  async fetchChats() {
    const chats = await this.api.read();
    chats.map(async (chat) => {
      const token: any = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async addUserToChat(id: number, userId: number) {
    await this.api.addUsers(id, [userId]);
    const userList = await this.api.getUsers(id);
    store.set('selectedChatUserList', userList);
  }

  async deleteUser(id: number, userId: number) {
    try {
      await this.api.deleteUsers(id, [userId]);
      const userList = await this.api.getUsers(id);
      store.set('selectedChatUserList', userList);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.delete(id);
      this.fetchChats();
      store.set('selectedChat', undefined);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async selectChat(id: number) {
    try {
      const userList = await this.api.getUsers(id);
      store.set('selectedChatUserList', userList);
      store.set('selectedChat', id);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  getToken(id: number) {
    try {
      return this.api.getToken(id);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
