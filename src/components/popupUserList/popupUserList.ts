import Block from "../../utils/Block";
import template from "./popupUserList.pug";

import { ButtonClose } from "../buttonClose/buttonClose";
import { withStore } from "../../hocs/withStore";
import { UserItem } from "../userItem/userItem";
import ChatsController from "../../controllers/ChatsController";
import { ErrorText } from "../errorText/errorText";

import { User } from "../../api/types";

interface PopupUserListProps {
    selectedChatUserList?: User[];
    selectedChat: number;
}

export class PopupUserListBase extends Block<PopupUserListProps> {
    constructor(props: PopupUserListProps) {
        super(props);
    }

    init() {
        this.children.errorText = new ErrorText({
            errorText: "Нельзя удалить последнего участника",
        });

        this.children.closeButton = new ButtonClose({
            events: {
                click: () => this.hide(),
            },
        });

        this.children.userList = this.createUserList(this.props);
    }

    createUserList(props: PopupUserListProps) {
        (this.children.errorText as Block).hide();
        return (props.selectedChatUserList || []).map((user => {
            return new UserItem({
                name: `${user.login} (${user.first_name} ${user.second_name})`,
                buttonName: "Удалить",
                onClick: () => this.deleteUserFromChat(user),
            });
        }));
    }

    deleteUserFromChat(user: User) {
        if (this.props.selectedChatUserList && this.props.selectedChatUserList?.length <= 1) {
            (this.children.errorText as Block).show();
        } else {
            ChatsController.deleteUser(this.props.selectedChat, user.id);
            (this.children.errorText as Block).hide();
        }

    }

    componentDidUpdate(_oldProps: PopupUserListProps, newProps: PopupUserListProps): boolean {
        this.children.userList = this.createUserList(newProps);
        return true;
    }

    render() {
        return this.compile(template, {...this.props,});
    }
}

export const PopupUserList = withStore((state) => {
    return {
        selectedChatUserList: state.selectedChatUserList,
        selectedChat: state.selectedChat,
    };
})(PopupUserListBase);
