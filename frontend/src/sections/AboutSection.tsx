import Heading from "../components/Heading";
import { SectionProps } from "../types";

const tags = [
    "Token Utility (OPX)",
    "Trending topic Polls",
    "AI-Driven trending questions",
    "Multiple Wallet Support",
];

export default function AboutSection() {
    return (
        <section className="w-full flex flex-col-reverse md:flex-row-reverse items-center">
            <div className="text md:w-1/2 col gap-4 my-2">
                <Heading
                    className="max-w-[90%]"
                    heading="About Us"
                    subHeading="Trade Your Opinion, Earn more!"
                />
                <span className="text-app_gray/80 leading-8 text-xl">
                    Trade your opinions on Trending topics!
                    Bet in real-time, predict outcomes, and earn real money instantly. Your instincts, your profits – start now!
                    Built on a secure Web3 foundation, your transactions are safe and transparent.
                </span>
                <div className="row gap-2">
                    {tags.map((tag, i) => (
                        <button
                            key={i}
                            className="rounded-full px-4 py-3 bg-white/20 hover:bg-white/30"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <div className="md:w-1/2 my-2 h-full">
                <img
                    src="/assets/about.jpeg"
                    alt="robo"
                    className="object-contain max-w-[80%] max-h-[90%] mx-auto"
                />
            </div>
        </section>
    );
}
