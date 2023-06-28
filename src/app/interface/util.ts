import { PostEditLog } from "./postEdit";
import { MessageLog } from "./raw";

export interface Filter {
    type: string;
    keyword: string;
    page: number;
    limit: number;
}

export interface Pagination {
    limit: number;
    offset: number;
    page: number;
    pages: number;
    total_row?: number;
}


export interface FilterCheckBox {
    status: any;
    type: string;
    keyword: string;
    type_room: any;
    page: number;
    limit: number;
    roomAccuracy: Number[];
    turnAccuracy: Number[];
    isPostEdit: number;
}

export interface GroupLogMessage {
    message_list: MessageLog[];
    agent_event_list: any;
    broadcaster_event_list: any;
    post_edit_list: PostEditLog[];
    all_event_list: any;
    post_edit_event_list: any;
    end: boolean;
    end_post_edit: boolean;
}