import PhoneIcon from "@/assets/images/illustration-empty.svg";
import PhoneMockup from "@/assets/images/illustration-phone-mockup.svg";
const Links = () => {
  return (
    <section className="container mt-4 md:px-6">
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <img src={PhoneMockup} alt="phone mockup" />
        </div>
        <div className="box-links bg-[#ffffff] pt-6 px-6 rounded-md">
          <h1 className="font-bold text-2xl">Customize your links</h1>
          <p className="text-[#737373] text-sm mt-4 opacity-80">
            Add/edit/remove links below and then share all your profiles with
            the world{" "}
          </p>
          <img src={PhoneIcon} alt="phone icon" />
        </div>
      </div>
    </section>
  );
};

export default Links;
