export interface INotification {
    id: string;
    content: string;
    type: 'info' | 'success' | 'warning' | 'error';
}
