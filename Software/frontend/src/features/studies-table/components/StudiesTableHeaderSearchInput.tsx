import { Input } from '@mui/material';

type TStudiesTableHeaderSearchInputProps = {
    displayName: string;
    onChange: (index: number, value: string) => void;
    theme: any;
    index: number;
};

const StudiesTableHeaderSearchInput = (props: TStudiesTableHeaderSearchInputProps) => {
    return (
        <Input
            id="outlined-basic"
            placeholder={props.displayName}
            sx={{
                width: '100%',
                '&:before': {
                    borderBottom: 'none'
                },

                '&:hover::before, &:after': {
                    borderBottomColor: `${props.theme.palette.secondary.main} !important`
                }
            }}
            onChange={(e) => props.onChange(props.index, e.target.value)}
        />
    );
};

export default StudiesTableHeaderSearchInput;
