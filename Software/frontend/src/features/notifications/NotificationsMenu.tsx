import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import NotificationItem from '@features/notifications/NotificationItem.tsx';

const emptyNotifications = () => {
    return (
        <div className={'h-52 w-full bg-AAFirstShade flex justify-center items-center'}>
            You have no notifications
        </div>
    );
};

const NotificationsMenu = () => {
    const { notifications } = useSelector((store: IStore) => store.ui);

    return (
        <div className={'h-auto w-80 flex-col space-y-1'}>
            {notifications.length === 0
                ? emptyNotifications()
                : notifications.map((notification) => {
                      return (
                          <NotificationItem
                              id={notification.id}
                              content={notification.content}
                              type={notification.type}
                          />
                      );
                  })}
        </div>
    );
};

export default NotificationsMenu;
