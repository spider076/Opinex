import Button from "../components/Button";

export default function PromoSection() {
    return (
        <section className="relative w-full min-h-[400px] row items-end justify-around gap-4">
            <img
                className="object-scale-down max-w-[200px] sm:max-w-sm max-h-[inherit] overflow-hidden"
                src="/assets/vr-person.webp"
                alt="vr_person"
            />
            <div className="bg-gradient-to-bl from-sky-700 via-purple-700 to-blue-800 rounded-3xl p-3 md:p-0 w-full sm:h-[320px] h-full absolute bottom-0 z-[-1] shadow-lg"></div>
            <article className="col gap-6 items-start justify-center h-[inherit] md:max-w-[40%] m-2 lg:-translate-y-10">
                <h4 className="font-redzone text-6xl">Let's Get Started</h4>
                <span className="text-gray-200">
                It's time to level up! Ready for the emersify experience of trading you opinions.
                    Amazing User Experince. We invite you to join yourself in this amazing journey of 
                    trading your opinions in the pool trading.
                </span>
                <a href="https://t.me/opinionx_bot" target="_blank" style={{ textDecoration: "none" }}>
  <button style={{
      border: "2px solid white",
      borderRadius: "12px", // For curved edges
      padding: "10px 20px", // For sufficient padding
      backgroundColor: "#007BFF", // Optional: Add background color
      color: "white", // Text color for contrast
      cursor: "pointer", // Pointer cursor for better UX
      fontSize: "16px", // Adjust font size for better readability
    }}>
    Platform Link
  </button>
</a>

            </article>
        </section>
    );
}

export function PromoSectionV2() {
    return (
        <section className="w-full">
            <div className="relative bg-gradient-to-bl from-sky-700 via-purple-700 to-blue-800 rounded-3xl p-3 md:p-0 min-h-[394px] row justify-around">
                <img
                    className="object-scale-down max-w-[200px] sm:max-w-sm max-h-[inherit] overflow-hidden"
                    src="/assets/vr-person.webp"
                    alt="vr_person"
                />
                <article className="col gap-6 items-start justify-center h-[inherit] md:max-w-[40%] m-2">
                    <h4 className="font-redzone text-6xl">Let's Get Started</h4>
                    <span className="text-app_gray">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem illo
                        eaque fugiat pariatur error!
                    </span>
                    <Button outline>Join Tournament</Button>
                </article>
            </div>
        </section>
    );
}

export function PromoSectionV1() {
    return (
        <section className="w-full pt-28">
            <div className="relative bg-gradient-to-bl from-sky-700 via-purple-700 to-blue-800 rounded-3xl h-[394px]">
                <img
                    className="object-scale-down max-w-[200px] sm:max-w-sm max-h-[inherit] absolute left-4 md:left-32 scale-150 -top-24 "
                    src="/assets/vr-person.webp"
                    alt="vr_person"
                />
                <article className="absolute col gap-6 items-start justify-center h-[inherit] right-1 max-w-[50%]">
                    <h4 className="font-redzone text-6xl">Join Us now</h4>
                    <span className="text-gray-100">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem illo
                        eaque fugiat pariatur error!
                    </span>
                    <a href="https://t.me/opinionx_bot">
                    <button>Join Tournament</button>
                    </a>
                    <a href="https://t.me/opinionx_bot">
                    dd
                    </a>
                    <p>hii</p>
                     
                </article>
            </div>
        </section>
    );
}
