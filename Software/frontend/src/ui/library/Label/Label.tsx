import { ReactNode } from 'react';
import classnames from 'classnames';

type TLabelProps = {
    text: string;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
};

const Label = (props: TLabelProps) => {
    const { text, className, children, ...rest } = props;

    const baseClasses = '';

    return (
        <label className={classnames(baseClasses, className)} {...rest}>
            {text}
            {children}
        </label>
    );
};

export default Label;
