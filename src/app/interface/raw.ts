export interface ResponseRawLog {
    limit: number
    offset: number
    total_rows: number
    rows: MessageLog[]
}


export interface MessageLog {
    publish?: number
    offsetFirst?: string
    offsetSecond?: string
    agent_id: number
    edited_messages?: any[]
    message: string
    message_id: number
    on_screen: OnScreen
    speech_at: number
    speech_duration: number
    transcribe_at: number
    transcribe_duration: number
    wav_file?: string
    wav_file_new?: string
    start_at?: number
    submit_at?: number
}

interface OnScreen {
    at: number;
    buffered_message: string
}