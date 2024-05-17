import settings from '@/assets/settings.json';
import { Button } from '@mui/material';

const SegmentationModels = () => {
    return (
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-300">Segmentation Models</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">The Integrated Segmentation Models</p>

                <dl className="mt-6 space-y-6 divide-y divide-AASecondShade border-t border-AAPrimary text-sm leading-6">
                    <div className="pt-6 flex justify-between">
                        <dt className="font-medium text-gray-300 sm:w-64 sm:flex-none sm:pr-6">Model name</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-300">Model Server Url</div>
                        </dd>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-300">Needed Sequences</div>
                        </dd>
                        <Button variant="text" color="secondary" size="small"></Button>
                    </div>
                    {settings.segmentationModels.map((model) => (
                        <div className="pt-6 flex justify-between" key={model.name}>
                            <dt className="font-medium text-gray-300 sm:w-64 sm:flex-none sm:pr-6">
                                {model.name}
                            </dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-300">{model.url}</div>
                            </dd>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                {model.neededSequences.join(', ').toLocaleUpperCase()}
                            </dd>
                            <Button variant="outlined" color="secondary" size="small">
                                Edit
                            </Button>
                        </div>
                    ))}
                </dl>

                <div className={'pt-10'}>
                    <Button variant="contained" color="secondary">
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SegmentationModels;
