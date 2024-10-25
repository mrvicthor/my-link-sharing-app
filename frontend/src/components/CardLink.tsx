import { getIcon } from "@/utils/getIcon";
import { getMatchingColor } from "@/utils/getMatchingColor";
import LinkIcon from "./LinkIcon";
import ArrowIcon from "@/assets/images/icon-arrow-right.svg";

type Props = {
  url: string;
  title: string;
};
const CardLink = ({ url, title }: Props) => {
  const color = getMatchingColor(title);
  const icon = getIcon(title);
  return (
    <li
      style={{ backgroundColor: color }}
      className={`p-2 rounded-md flex items-center cursor-pointer w-[14.8125rem]`}
    >
      <LinkIcon color="white" pathString={icon} />
      <span className="text-white block text-xs">{title}</span>

      <a
        href={`${url}`}
        target="_blank"
        rel="noopener"
        className="text-white ml-auto"
      >
        <img src={ArrowIcon} alt="arrow icon" />
      </a>
    </li>
  );
};

export default CardLink;
