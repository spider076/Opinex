import type { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export default function AppLogo({ className, ...props }: Props) {
    return (
        <h2 {...props} className={`text-4xl font-redzone app-logo ${className}`}>
            OpineX
        </h2>
    );
    
}
