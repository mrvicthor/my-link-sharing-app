import { useState } from "react";
import { z } from "zod";
import PhoneIcon from "@/assets/images/illustration-empty.svg";
import PhoneMockup from "@/assets/images/illustration-phone-mockup.svg";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { options } from "@/lib/constants";
import LinkIcon from "@/components/LinkIcon";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Link = z.object({
  platform: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  urlLink: z.string({
    required_error: "Please enter a link.",
  }),
});

const FormSchema = z.object({
  links: z.array(Link),
});

const Links = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      links: [
        {
          platform: "GitHub",
          urlLink: "https://example.com",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <section className="container md:px-6">
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <img src={PhoneMockup} alt="phone mockup" />
        </div>
        <div className="box-links bg-[#ffffff] pt-6 rounded-md pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h1 className="font-bold text-2xl px-6">Customize your links</h1>
              <p className="text-[#737373] text-sm mt-4 opacity-80 px-6">
                Add/edit/remove links below and then share all your profiles
                with the world{" "}
              </p>
              <div className="px-6">
                <Button
                  variant={"addButton"}
                  size={"lg"}
                  className="font-bold"
                  onClick={() => {
                    setIsFormOpen(true);
                    if (isFormOpen) append({ platform: "", urlLink: "" });
                  }}
                >
                  + Add new link
                </Button>
              </div>
              {isFormOpen ? (
                <section className="min-h-[27.1875rem] px-6">
                  {fields.map((item, index) => (
                    <div>
                      <Button onClick={() => remove(index)}>Remove</Button>
                      <FormField
                        key={item.id}
                        {...form.register(`links.${index}.platform` as const)}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>

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
                                  <>
                                    <SelectItem
                                      value={option.title}
                                      key={option.id}
                                      className="relative text-[#737373] py-2"
                                    >
                                      <div className="absolute ">
                                        <LinkIcon
                                          color=""
                                          pathString={option.icon}
                                        />{" "}
                                      </div>
                                      <div className="ml-8">{option.title}</div>
                                    </SelectItem>
                                    <hr />
                                  </>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </section>
              ) : (
                <section className="px-6">
                  <div className="bg-[#fafafa] flex flex-col justify-center items-center mt-4 rounded-md gap-y-6 py-10 mb-6 min-h-[24.1875rem]">
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
                <Button variant={"saveButton"} className="w-full md:w-auto">
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
