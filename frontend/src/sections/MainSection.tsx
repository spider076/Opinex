import Button from "../components/Button";

export default function MainSection() {
    return (
        <section className="w-full flex flex-col md:flex-row center gap-8">
            <div className=" flex flex-col items-center text md:w-1/7 col gap-8">
                <h1 className="md:text-6xl text-center text-3xl text-gray-300 font-redzone">
                    Earn with your opinions leveraing AI
                </h1>
                <span className="text-app_gray text-center leading-8 text-lg w-full">
                Stake your opinion on trending topics with our AI-blockchain bot and earn rewards! Enjoy a sleek, secure platform that turns your views into profit.
                </span>
                <div className="row gap-4">
                    <button style={{
                        border: "1px solid gray",
                        borderRadius: "12px", // For curved edges
                        padding: "10px 20px", // For sufficient padding
                        backgroundColor: "black", // Optional: Add background color
                        color: "white", // Text color for contrast
                        cursor: "pointer", // Pointer cursor for better UX
                        fontSize: "16px", // Adjust font size for better readability
                    }}>Get Started</button>
                    {/* <Button outline={true}>Join Discord</Button> */}
                </div>
            </div>

            {/* any good image */}
            {/* <div className="relative md:w-1/2 col gap-4 center">
                <img
                    src="/assets/banner.jpeg"
                    alt="etherum_logo"
                    className="w-[86%] h-[70%] object-contain mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
           -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)"

                />
            </div> */}
        </section>
    );
}
