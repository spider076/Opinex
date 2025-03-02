import { useEffect, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export type QAProps = {
    question: string;
    answer?: string;
};

const dummyAnswer = `It's time to level up! Ready for the emersify experience of trading you opinions.
                    Amazing User Experince. We invite you to join yourself in this amazing journey of 
                    trading your opinions in the pool trading.`;

export default function QAComponent({ question, answer }: QAProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>();

    useEffect(() => {
        if (isOpen) setContentHeight(contentRef.current?.scrollHeight);
        else setContentHeight(0);
    }, [isOpen]);

    const styles = {
        bg: isOpen ? "bg-app" : "",
        heading: isOpen ? "text-app_bg" : "text-app_gray/90",
        button: isOpen ? "text-app_bg" : "text-app_gray",
        icon: isOpen ? (
            <AiOutlineMinus size={24} color="inherit" />
        ) : (
            <AiOutlinePlus size={24} color="inherit" />
        ),
        contentStyle: {
            maxHeight: isOpen ? contentHeight : 0,
            opacity: isOpen ? 1 : 0,
            transition: "max-height 300ms ease-in-out, opacity 300ms ease-in-out",
        },
    };

    return (
        <div className="relative bg-white/20 rounded-3xl col m-2 transition-all duration-500 ease-in-out">
            <div
                className={`row justify-between gap-2 px-4 py-3 rounded-t-3xl ${styles.bg}`}
            >
                <h2 className={`font-redzone text-xl ${styles.heading}`}>{question}</h2>

                <button
                    onClick={() => setIsOpen((c) => !c)}
                    className={`hover:text-white ${styles.button}`}
                >
                    {styles.icon}
                </button>
            </div>
            <div className="overflow-hidden" style={styles.contentStyle}>
                <div className="py-4 px-4" ref={contentRef}>
                    {answer ?? dummyAnswer}
                </div>
            </div>
        </div>
    );
}
