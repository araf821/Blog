"use client";

import { FC } from "react";
import Container from "../Container";
import { SafePost } from "@/app/types";
import PostCard from "../PostCard";
import Heading from "../Heading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Toast from "../Toast";

interface LatestPostsProps {
  posts: SafePost[] | null;
}

const LatestPosts: FC<LatestPostsProps> = ({ posts }) => {
  const router = useRouter();
  if (!posts?.length) return null;

  return (
    <Container>
      <motion.div
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.75,
          },
        }}
        initial={{
          y: 100,
          opacity: 0,
        }}
        className="-mt-12 pb-12"
      >
        <Heading title="Latest Posts" />

        {/* Cards container */}
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:justify-between md:rounded-md md:p-2 md:shadow-lg lg:gap-10 lg:p-3 xl:p-4">
          <div className="h-full w-full">
            <PostCard main post={posts[0]} />
          </div>
          <div className="flex h-fit w-full max-w-[700px] flex-col gap-4">
            <PostCard horizontal post={posts[1]} />
            <PostCard horizontal post={posts[2]} />
          </div>
        </div>
      </motion.div>
      <button
        onClick={() => {
          Toast({
            message: "Sure! 8:30pm works great!",
          });
        }}
      >
        Show Custom Toast
      </button>
    </Container>
  );
};

export default LatestPosts;
