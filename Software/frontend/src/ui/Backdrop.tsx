import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop: React.FC<JSX.IntrinsicElements['div'] & { show: boolean }> = (props) => {
    const { className, show, ...restProps } = props;

    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            className={`fixed top-0 left-0 w-screen h-[100dvh] z-20 opacity-5 bg-AAprimary ${className}`}
            {...restProps}
        />,
        document.getElementById('backdrop')!
    );
};

export default Backdrop;
