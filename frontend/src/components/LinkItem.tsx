import LinkIcon from "./LinkIcon";
import ArrowIcon from "@/assets/images/icon-arrow-right.svg";
import { Link } from "react-router-dom";
import { getMatchingColor } from "@/utils/getMatchingColor";
import { getIcon } from "@/utils/getIcon";

type Props = {
  url: string;
  title: string;
};
const LinkItem = ({ url, title }: Props) => {
  const color = getMatchingColor(title);
  console.log(color, "color");
  const icon = getIcon(title);
  return (
    <li
      style={{ backgroundColor: color }}
      className={`p-2 rounded-md flex items-center`}
    >
      <LinkIcon color="white" pathString={icon} />
      <span className="text-white block text-xs">{title}</span>

      <Link to={`${url}`} className="text-white ml-auto">
        <img src={ArrowIcon} alt="arrow icon" />
      </Link>
    </li>
  );
};

export default LinkItem;
