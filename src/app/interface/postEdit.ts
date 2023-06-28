
export interface ResponsePostEditLog {
    limit: number
    offset: number
    total_rows: number
    rows: PostEditLog[]
}

export interface PostEditLog {
    editor_id: number
    end_at: number
    end_received_at: number
    is_forceout: boolean
    message: string
    message_id: number
    message_received: string
    slices: Slice[];
    start_at: number
}


interface Slice {
    at: number;
    message: string
}