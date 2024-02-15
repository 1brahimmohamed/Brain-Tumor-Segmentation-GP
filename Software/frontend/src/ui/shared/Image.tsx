const Image = ({width, height, src, alt, ...props }) => {

    return (
        <img
            width={width}
            height={height}
            src={src}
            alt={alt}
            {...props}
        />
    );
};

export default Image;
