import LinkIcon from "./LinkIcon";
import { Link } from "react-router-dom";
import { getMatchingColor } from "@/utils/getMatchingColor";

type Props = {
  url: string;
  title: string;
};
const LinkItem = ({ url, title }: Props) => {
  const color = getMatchingColor(title);
  return (
    <li className={`bg-[${color}] p-2 rounded-md`}>
      <article>
        <LinkIcon color="white" pathString="" />
        <span>{title}</span>
        <Link to={`${url}`} className="text-white">
          <LinkIcon color="white" pathString="" />
        </Link>
      </article>
    </li>
  );
};

export default LinkItem;
