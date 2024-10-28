import CardInfo from "@/components/CardInfo";
import PreviewHeader from "@/components/PreviewHeader";
import Notification from "@/components/Notification";
import { NotificationProvider } from "@/context/NotificationContext";
import useAuth from "@/hooks/useAuth";

const Preview = () => {
  const { user } = useAuth();

  return (
    <NotificationProvider>
      <section className="relative">
        <div className="md:bg-[#633cff] px-6 pt-6 h-[22.3125rem] md:rounded-b-3xl">
          {user ? <PreviewHeader /> : null}
        </div>
        <CardInfo />
        <Notification message="The link has been copied to your clipboard!" />
      </section>
    </NotificationProvider>
  );
};

export default Preview;
