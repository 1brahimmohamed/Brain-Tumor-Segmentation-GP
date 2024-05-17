import { Link, Outlet, useLocation } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { FaBrain } from 'react-icons/fa';
import { BsBrushFill } from 'react-icons/bs';
import NeutralTopBar from '@features/top-bars/NeutralTopBar/NeutralTopBar.tsx';

const navigation = [
    { name: 'General', href: '/settings', icon: AccountCircle, current: true },
    { name: 'Segmentation Models', href: '/settings/segmentation-models', icon: BsBrushFill, current: false },
    {
        name: 'Motion Artifacts Models',
        href: '/settings/motion-artifacts-models',
        icon: FaBrain,
        current: false
    },
    { name: 'Synthesis Models', href: '/settings/synthesis-models', icon: FaBrain, current: false }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Settings = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    navigation.forEach((item) => {
        item.current = item.href === currentPath;
    });

    return (
        <>
            <div className={'h-10 mt-2 mx-7'}>
                <NeutralTopBar />
            </div>

            <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
                <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <h1 className={'text-4xl pb-10'}>Settings</h1>
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-AAPrimary/10 text-AAPrimary'
                                                : 'text-gray-100 hover:bg-AAPrimaryLight/10 hover:text-AAPrimary',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current
                                                    ? 'text-AAPrimary'
                                                    : 'text-gray-300 group-hover:text-AAPrimary',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">{<Outlet />}</main>
            </div>
        </>
    );
};

export default Settings;
