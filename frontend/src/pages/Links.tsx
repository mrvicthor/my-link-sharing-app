import PhoneIcon from "@/assets/images/illustration-empty.svg";
import PhoneMockup from "@/assets/images/illustration-phone-mockup.svg";
import { Button } from "@/components/ui/button";
const Links = () => {
  return (
    <section className="container md:px-6">
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <img src={PhoneMockup} alt="phone mockup" />
        </div>
        <div className="box-links bg-[#ffffff] pt-6 rounded-md">
          <div className="px-6">
            <h1 className="font-bold text-2xl">Customize your links</h1>
            <p className="text-[#737373] text-sm mt-4 opacity-80">
              Add/edit/remove links below and then share all your profiles with
              the world{" "}
            </p>
            <Button variant={"addButton"} size={"lg"} className=" mt-8">
              + Add new link
            </Button>
            <section className="bg-[#fafafa] flex flex-col justify-center items-center mt-4 rounded-md gap-y-6 py-10 mb-6">
              <img src={PhoneIcon} alt="phone icon" />
              <h2 className="text-2xl font-bold">Let's get you started</h2>
              <p className="text-center text-[#737373] text-sm opacity-80">
                Use the "Add new link" button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone.
              </p>
            </section>
          </div>
          <hr />
          <div className="flex justify-end mt-4 pr-6">
            <Button variant={"saveButton"}>Save</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Links;
