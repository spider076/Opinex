import Heading from "../components/Heading";

const cards = [
    {
        id: 1,
        title: "AI generated Opinion Polls",
        desc: "You will trade your opinion on trending topics. AI will be generating opinion polls.",
    },
    {
        id: 2,
        title: "Multiple Wallet Support",
        desc: "No hurdles while connecting with us, We got multiplt wallet support!",
    },
    {
        id: 3,
        title: "Seamless UI experience",
        desc: "No need to traverse multiple pages just to trade, We got all in one page only. We got multi-theme UI.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="w-full col center gap-4">
            <Heading
                heading="Key Features"
                subHeading="Access The Future"
                className="text-center"
            />
            <div className="row w-full justify-center gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-gradient-to-br from-white/10 col rounded-2xl items-start gap-4 py-6 px-4 md:flex-1"
                    >
                        <img
                            className="w-16 h-w-16"
                            src={`/assets/${card.id}.png`}
                            alt={card.title}
                        />
                        <h4 className="font-redzone text-2xl">{card.title}</h4>
                        <span className="text-app_gray/70">{card.desc}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
