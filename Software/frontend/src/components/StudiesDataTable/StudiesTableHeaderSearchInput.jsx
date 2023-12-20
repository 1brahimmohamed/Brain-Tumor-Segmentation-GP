import { Input } from "@mui/material";

const StudiesTableHeaderSearchInput = ({ displayName, onChange, theme, index}) => {
    return (
        <Input
            id="outlined-basic"
            placeholder={displayName}
            sx={{
                width: "100%",
                '&:before': {
                    borderBottom: 'none',
                },

                '&:hover::before, &:after': {
                    borderBottomColor: `${theme.palette.secondary.main} !important`,
                },
            }}
            onChange={(e) => onChange(index, e.target.value)}
        />
    );
};

export default StudiesTableHeaderSearchInput;
