const General = () => {
    return (
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-300">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">User Information</p>

                <dl className="mt-6 space-y-6 divide-y divide-AASecondShade border-t border-AAPrimary text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-300 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-300">Ibrahim Mohamed</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-300 sm:w-64 sm:flex-none sm:pr-6">
                            Email address
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-300">ibrahim.mohamed@mmm.ai</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-300 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-300">Neurologist</div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default General;
