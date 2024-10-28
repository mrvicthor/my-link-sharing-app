import useAuth from "@/hooks/useAuth";
import CardLink from "./CardLink";

const CardInfo = () => {
  const { user } = useAuth();

  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <section className="p-8 bg-white rounded-lg w-[21.8125rem] absolute top-[14rem] left-[50%] -translate-x-[50%] z-50 flex flex-col gap-y-4 items-center card-wrapper">
      <div className="h-[6.5rem] w-[6.5rem] overflow-hidden rounded-full border-4 border-[#633cff]">
        <img src={user?.image} alt="profile picture" />
      </div>
      <h1 className="font-bold text-2xl capitalize">{fullName}</h1>
      <p className="text-[#737373]">{user?.email}</p>
      <ul className="space-y-4">
        {user?.links.map((link) => (
          <CardLink title={link.title} url={link.url} key={link._id} />
        ))}
      </ul>
    </section>
  );
};

export default CardInfo;
