import { Toaster } from "react-hot-toast";
import PhoneContainer from "@/components/PhoneContainer";
import CreateForm from "@/components/CreateForm";

const Links = () => {
  return (
    <section className="container md:px-6">
      <Toaster />
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <PhoneContainer />
        </div>
        <CreateForm />
      </div>
    </section>
  );
};

export default Links;
