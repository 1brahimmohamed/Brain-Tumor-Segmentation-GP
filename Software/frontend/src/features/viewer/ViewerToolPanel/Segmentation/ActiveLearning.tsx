import { PanelSection } from '@ui/library';
import Button from '@mui/material/Button';
import { LinearProgressWithLabel } from '@ui/library';

const ActiveLearning = () => {
    return (
        <div>
            <PanelSection title={'Active Learning'}>
                <div className={'flex flex-col px-2 py-5 gap-y-7'}>
                    <div className={'flex justify-center gap-x-2'}>
                        <Button
                            color={'secondary'}
                            variant={'outlined'}
                            style={{ color: 'white' }}
                            onClick={() => console.log('Start Active Learning')}
                        >
                            Update Model
                        </Button>

                        <Button
                            color={'secondary'}
                            variant={'outlined'}
                            style={{ color: 'white' }}
                            onClick={() => console.log('Start Active Learning')}
                        >
                            Submit Label
                        </Button>
                    </div>

                    <div className={'flex flex-col gap-y-3'}>
                        <div className="flex gap-x-3 items-center">
                            <div className="w-2/5 text-md"> Training Accuracy</div>
                            <div className="mr-2 w-3/5">
                                <LinearProgressWithLabel value={82} />
                            </div>
                        </div>

                        <div className="flex gap-x-3 items-center">
                            <div className="w-2/5 text-md"> Current Accuracy</div>
                            <div className="mr-2 w-3/5">
                                <LinearProgressWithLabel value={77} />
                            </div>
                        </div>
                    </div>
                </div>
            </PanelSection>
        </div>
    );
};

export default ActiveLearning;
