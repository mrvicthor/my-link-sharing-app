import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import PhoneIcon from "@/assets/images/illustration-empty.svg";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import PhoneContainer from "@/components/PhoneContainer";
import { useMutation } from "@tanstack/react-query";
import { createLink } from "@/lib/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { options } from "@/lib/constants";
import Platform from "@/components/SelectLists";
import useLinks from "@/hooks/useLinks";

const Link = z.object({
  title: z.string({
    required_error: "Please select an platform to display.",
  }),
  url: z.string({
    required_error: "Please enter a link.",
  }),
});

const FormSchema = z.object({
  links: z.array(Link),
});

const Links = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { links } = useLinks();
  console.log("link", links);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      links: [
        {
          title: "GitHub",
          url: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const { mutate: createNewLink, isError } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      toast.success("Link created successfully");
      setIsFormOpen(false);
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) =>
    createNewLink(data.links);
  // return createNewLink(data.links);

  return (
    <section className="container md:px-6">
      <Toaster />
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <PhoneContainer />
        </div>
        <div className="box-links bg-[#ffffff] pt-6 rounded-md pb-6">
          {isError && <p className="text-red-500">Error creating link</p>}
          <h1 className="font-bold text-2xl px-6 ">Customize your links</h1>
          <p className="text-[#737373] text-sm mt-4 opacity-80 px-6 w-full">
            Add/edit/remove links below and then share all your profiles with
            the world{" "}
          </p>
          <div className="px-6 mt-6">
            <Button
              variant={"addButton"}
              size={"lg"}
              className="font-bold"
              onClick={() => {
                setIsFormOpen(true);
                if (isFormOpen) append({ title: "", url: "" });
              }}
            >
              + Add new link
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              {isFormOpen ? (
                <section className="h-[22.8rem] px-6 space-y-3 overflow-auto">
                  {fields.map((item, index) => (
                    <div key={item.id} className="bg-[#fafafa] rounded-md p-3">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#737373]">
                            = Link #{index + 1}
                          </span>
                        </div>
                        <span
                          role="button"
                          className="block hover:cursor-pointer text-[#737373] opacity-50"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </span>
                      </div>

                      <FormField
                        control={form.control}
                        name={`links.${index}.title` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#333333]">
                              Platform
                            </FormLabel>

                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="GitHub" />
                                </SelectTrigger>
                              </FormControl>
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`links.${index}.url` as const}
                        render={({ field }) => (
                          <FormItem className="mt-1">
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input
                                className=""
                                placeholder="🔗  https://github.com/benwright"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </section>
              ) : (
                <section className="px-6">
                  <div className="bg-[#fafafa] flex flex-col justify-center items-center mt-4 rounded-md gap-y-6 py-10 mb-6 max-h-[19.1875rem]">
                    <img src={PhoneIcon} alt="phone icon" />
                    <h2 className="text-2xl font-bold">
                      Let's get you started
                    </h2>
                    <p className="text-center text-[#737373] text-sm opacity-80">
                      Use the "Add new link" button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We're here to help you share your profiles with everyone.
                    </p>
                  </div>
                </section>
              )}

              <hr />
              <div className="flex justify-end mt-4 px-6">
                <Button
                  type="submit"
                  variant={"saveButton"}
                  className={`${
                    isFormOpen ? "bg-[#633cff]" : "bg-[#beadff]"
                  } w-full md:w-auto`}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Links;
