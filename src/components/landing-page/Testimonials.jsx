import ScrollOpacity from "../global/ScrollOpacity";
import SplitLineText from "../global/SplitLineText";

const testimonials = [
    {
        name: "Lisa Turner",
        company: "CEO, BeautyBooks",
        quote: "Codevider delivered a clean, scalable app ahead of schedule. Their communication and professionalism made the entire process smooth and reliable.",
    },
    {
        name: "Tom Blake",
        company: "Founder, Arcon",
        quote: "Our collaboration with Codevider saved us millions. Their team truly understands how to build for performance and scale.",
    },
    {
        name: "Sarah N.",
        company: "Project Lead, USAID Partner",
        quote: "We needed a secure, efficient platform for our African operations — Codevider executed it with precision and integrity.",
    },
];

const Testimonials = () => {
    return (
        <section className="w-full min-h-screen px-mobile lg:px-desktop-h py-[80px] flex flex-col items-center bg-[var(--color-myBackground)] text-[var(--color-myText)]">
            <ScrollOpacity>
                <SplitLineText text="Client Testimonials" textstyles="text-16-body mb-[60px]" />
            </ScrollOpacity>

            <div className="w-full max-w-6xl flex flex-col gap-y-[60px]">
                {testimonials.map(({ name, company, quote }, index) => (
                    <ScrollOpacity key={index}>
                        <div className="border-l-4 border-[var(--color-myAccent)] pl-[20px]">
                            <p className="text-25-body md:text-32-body mb-[15px]">&ldquo;{quote}&rdquo;</p>
                            <p className="text-14-body opacity-60">
                                {name}, <span className="italic">{company}</span>
                            </p>
                        </div>
                    </ScrollOpacity>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
