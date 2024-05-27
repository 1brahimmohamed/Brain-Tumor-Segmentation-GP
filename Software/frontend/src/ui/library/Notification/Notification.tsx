import React, { useEffect, useRef, useId } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast, Id } from 'react-toastify';
import { IStore, INotification } from '@/models';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';

const Notification: React.FC<{
    notification: INotification | null;
    notificationDisappearingHandler?: () => void;
}> = (props) => {
    const toastContainerId = useId();
    const lastNotificationId = useRef<Id>();

    const { notification, notificationDisappearingHandler } = props;
    const { content, type, id } = notification || {};

    const themeMode = useSelector((store: IStore) => store.ui.themeMode) as string;

    useEffect(() => {
        if (!content || lastNotificationId.current === id) {
            return;
        }

        toast.dismiss(lastNotificationId.current);

        lastNotificationId.current = toast(content, {
            containerId: toastContainerId,
            toastId: id,
            autoClose: 5000,
            position: 'bottom-right',
            closeOnClick: false,
            theme: themeMode,
            className: 'bg-[#1a1a1a]',
            type: type
        });
    }, [content, type, id, lastNotificationId, toastContainerId]);

    useEffect(() => {
        toast.onChange((toastItem) => {
            if (toastItem.status === 'removed') {
                toast.clearWaitingQueue({ containerId: toastContainerId });

                if (lastNotificationId.current === toastItem.id && notificationDisappearingHandler) {
                    notificationDisappearingHandler();
                }
            }
        });
    }, []);

    return ReactDOM.createPortal(
        <ToastContainer
            containerId={toastContainerId}
            style={{ maxWidth: '100%', width: '500px', right: 0, bottom: 0, padding: '1rem' }}
            position="bottom-right"
            limit={1}
        />,
        document.getElementById('notification')!
    );
};

export default React.memo(Notification);
