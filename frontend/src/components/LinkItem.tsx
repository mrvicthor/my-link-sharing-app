import LinkIcon from "./LinkIcon";
import ArrowIcon from "@/assets/images/icon-arrow-right.svg";
import { getMatchingColor } from "@/utils/getMatchingColor";
import { getIcon } from "@/utils/getIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditForm from "./EditForm";

type Props = {
  id: string;
  url: string;
  title: string;
};

const LinkItem = ({ id, url, title }: Props) => {
  const color = getMatchingColor(title);
  const icon = getIcon(title);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li
          style={{ backgroundColor: color }}
          className={`p-2 rounded-md flex items-center cursor-pointer`}
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit or Delete link</DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm id={id} title={title} url={url} />
      </DialogContent>
    </Dialog>
  );
};

export default LinkItem;
