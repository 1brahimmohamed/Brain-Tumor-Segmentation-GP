interface ImageProps {
    width?: number;
    height?: number;
    src: string;
    alt: string;
    [x: string]: any;
}

const Image = ({ width, height, src, alt, ...props }: ImageProps) => {
    return <img width={width} height={height} src={src} alt={alt} {...props} />;
};

export default Image;
