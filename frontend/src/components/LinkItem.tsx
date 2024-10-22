import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LinkIcon from "./LinkIcon";
import ArrowIcon from "@/assets/images/icon-arrow-right.svg";
import { Link, redirect } from "react-router-dom";
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
import { Form, FormField, FormItem } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import Platform from "./SelectLists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink, updateLink } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  id: string;
  url: string;
  title: string;
};

const updateSchema = z.object({
  id: z.string(),
  title: z.string({
    message: "Please select an platform to display.",
  }),
  url: z
    .string({
      message: "Can't be empty.",
    })
    .min(1, { message: "Can't be empty." }),
});
const LinkItem = ({ id, url, title }: Props) => {
  const queryClient = useQueryClient();
  const color = getMatchingColor(title);
  const icon = getIcon(title);
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      id,
      title,
      url,
    },
  });

  const { mutate: deleteOne } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      toast.success("Link deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      return redirect("/");
    },
  });

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      toast.success("Link updated successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      return redirect("/");
    },
  });

  const onSubmit = (data: z.infer<typeof updateSchema>) => handleUpdate(data);

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger asChild>
        <li
          style={{ backgroundColor: color }}
          className={`p-2 rounded-md flex items-center cursor-pointer`}
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
          <DialogTitle>Edit or Delete link</DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="platform" className="text-right">
                        Platform
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder={title} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <div key={option.id}>
                              <Platform
                                title={option.title}
                                icon={option.icon}
                              />
                              {option.id !== options.length && <hr />}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link" className="text-right">
                        Link
                      </Label>
                      <Input id="link" {...field} className="col-span-3" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => deleteOne(id)}>
                Delete
              </Button>
              <Button
                type="submit"
                variant="saveButton"
                disabled={isPending || !form.formState.isDirty}
                className="bg-[#633cff]"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkItem;
