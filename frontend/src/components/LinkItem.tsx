import LinkIcon from "./LinkIcon";
import ArrowIcon from "@/assets/images/icon-arrow-right.svg";
import { Link } from "react-router-dom";
import { getMatchingColor } from "@/utils/getMatchingColor";
import { getIcon } from "@/utils/getIcon";
import { options } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import Platform from "./SelectLists";

type Props = {
  id: string;
  url: string;
  title: string;
};
const LinkItem = ({ id, url, title }: Props) => {
  const color = getMatchingColor(title);
  const icon = getIcon(title);
  const handleLinkDetails = (id: string) => console.log(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li
          style={{ backgroundColor: color }}
          className={`p-2 rounded-md flex items-center cursor-pointer`}
          onClick={() => handleLinkDetails(id)}
        >
          <LinkIcon color="white" pathString={icon} />
          <span className="text-white block text-xs">{title}</span>

          <Link to={`${url}`} className="text-white ml-auto">
            <img src={ArrowIcon} alt="arrow icon" />
          </Link>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="platform" className="text-right">
              Platform
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={title} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <div key={option.id}>
                    <Platform title={option.title} icon={option.icon} />
                    {option.id !== options.length && <hr />}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input id="link" defaultValue={url} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive">Delete</Button>
          <Button type="submit" variant="saveButton">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkItem;
