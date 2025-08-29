export type ToastType = 'success' | 'error';

export interface ToastMessage {
    id?: number;
    text: string;
    type?: ToastType;
}
