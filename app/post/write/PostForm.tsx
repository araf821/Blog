"use client";

import ImageUpload from "@/app/components/inputs/ImageUpload";
import { FC, useState } from "react";
import MultiSelect from "./MultiSelect";
import PostInput from "@/app/components/inputs/PostInput";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { SelectOption } from "./SingleSelect";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import TitleInput from "./TitleInput";
import { SafeUser } from "@/app/types";

interface PostFormProps {
  currentUser: SafeUser | null;
}

const options = [
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Anime", value: "anime" },
  { label: "Gaming", value: "gaming" },
  { label: "Movies", value: "movies" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Fashion", value: "fashion" },
  { label: "Fitness", value: "fitness" },
  { label: "Sports", value: "sports" },
  { label: "Business", value: "business" },
  { label: "Art", value: "art" },
  { label: "Science", value: "science" },
  { label: "Lifestyle", value: "lifestyle" },
];

const PostForm: FC<PostFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postTags, setPostTags] = useState<SelectOption[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      imgSrc: "",
      title: "",
      content: "",
      slug: "",
      tags: [],
      published: false,
    },
  });

  const onPublish: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/post/publish", {
        ...data,
        slug: slugify(data.title),
        published: true,
        tags: postTags.map((tag) => tag.label),
      })
      .then(() => {
        toast.success("Post published!");
        router.push("/explore");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const imgSrc = watch("imgSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <form className="flex w-full max-w-[1280px] flex-col gap-4 rounded-md border px-4 py-6 shadow-lg">
      {/* Title */}
      <TitleInput
        id="title"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />

      <div className="mx-auto max-w-[700px] space-y-2 text-center">
        <ImageUpload
          value={imgSrc}
          onChange={(value) => setCustomValue("imgSrc", value)}
        />
      </div>
      {/* <ToolbarComponent /> */}

      {/* Tags */}
      <MultiSelect
        options={options}
        value={postTags}
        onChange={(tag) => setPostTags(tag)}
      />

      <PostInput
        id="content"
        errors={errors}
        placeholder="Post Content"
        register={register}
        required
        textarea
        disabled={isLoading}
        className={`font-ubuntu sm:text-lg md:text-xl lg:text-2xl`}
      />

      {/* Buttons */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-12">
        <Button
          onClick={() => {}}
          label="Save As Draft"
          outline
          className="md:max-w-[400px]"
        />
        <Button
          onClick={handleSubmit(onPublish)}
          label="Publish Post"
          className="md:max-w-[400px]"
        />
      </div>
    </form>
  );
};

export default PostForm;