import { RouterProvider } from 'react-router-dom';
import AppRouter from '@/router';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '@models/store.ts';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { TAppDispatch } from '@/redux/store.ts';
import { Notification } from '@ui/library';
import { Spinner } from '@ui/library';

function App() {
    // Get the notification from the store
    const notification = useSelector((store: IStore) => {
        return store.ui.notification;
    });

    // Get the loading state from the store
    const isLoading = useSelector((store: IStore) => store.ui.isLoading);

    const dispatch = useDispatch<TAppDispatch>();

    const handleNotificationDisappearing = () => {
        dispatch(uiSliceActions.clearNotification());
    };

    return (
        <div className="app">
            <Notification
                notification={notification}
                notificationDisappearingHandler={handleNotificationDisappearing}
            />

            <Spinner loading={isLoading} color={'#10a9e2'} />

            <main className="content">
                <RouterProvider router={AppRouter} />
            </main>
        </div>
    );
}

export default App;
