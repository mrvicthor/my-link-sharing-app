import CardInfo from "@/components/CardInfo";
import PreviewHeader from "@/components/PreviewHeader";

const Preview = () => {
  return (
    <section className="relative">
      <div className="bg-[#633cff] md:px-6 md:pt-6 h-[22.3125rem] rounded-b-3xl">
        <PreviewHeader />
      </div>
      <CardInfo />
    </section>
  );
};

export default Preview;
