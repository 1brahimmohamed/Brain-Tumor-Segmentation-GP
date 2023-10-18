const Logo = ({mode}) => {
    return (
        <img
            alt={"logo"}
            src={`${mode === 'dark' ? "/logos/logo-white.png" : '/logos/logo-black.png'}`}
        />
    )
};

export default Logo;
