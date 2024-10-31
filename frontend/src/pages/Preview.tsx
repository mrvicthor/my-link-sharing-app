import { useParams } from "react-router-dom";
import CardInfo from "@/components/CardInfo";
import PreviewHeader from "@/components/PreviewHeader";
import Notification from "@/components/Notification";
import { NotificationProvider } from "@/context/NotificationContext";
import useDetails from "@/hooks/useDetails";
import Loader from "@/components/Loader";

const Preview = () => {
  const { id } = useParams();
  const { user, isLoading } = useDetails(id as string);
  if (isLoading) return <Loader />;

  return (
    <NotificationProvider>
      <section className="relative">
        <div className="md:bg-[#633cff] px-6 pt-6 h-[22.3125rem] md:rounded-b-3xl">
          {user ? <PreviewHeader /> : null}
        </div>
        <CardInfo user={user} />
        <Notification message="The link has been copied to your clipboard!" />
      </section>
    </NotificationProvider>
  );
};

export default Preview;
