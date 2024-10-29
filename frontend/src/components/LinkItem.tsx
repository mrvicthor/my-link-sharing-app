import LinkIcon from "./LinkIcon";
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
          className={`p-2 rounded-md flex items-center cursor-pointer ${
            title === "Frontend Mentor" ? "border text-black" : "text-white"
          }`}
        >
          <LinkIcon
            color={title === "Frontend Mentor" ? "black" : "white"}
            pathString={icon}
          />
          <span className=" block text-xs">
            {title === "Youtube" ? "YouTube" : title}
          </span>

          <a
            href={`${url}`}
            target="_blank"
            rel="noopener"
            className={`${
              title === "Frontend Mentor" ? "text-black" : "text-white"
            } ml-auto`}
          >
            <LinkIcon
              color={title === "Frontend Mentor" ? "black" : "white"}
              pathString="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
            />
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
