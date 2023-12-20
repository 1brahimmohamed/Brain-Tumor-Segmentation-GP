
const ViewportFrame = ({children}) => {
    return (
        <div className={"m-0.5"} style={{width:"100%", height:425}}>
               {children}
        </div>
    );
};

export default ViewportFrame;
