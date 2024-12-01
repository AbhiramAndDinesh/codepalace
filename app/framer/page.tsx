"use client";
import { motion } from "motion/react";
const Page = () => {
  return (
    <motion.div
      className="w-[500px] h-[500px] bg-slate-400"
      animate={{ x: 100 }}
    />
  );
};
export default Page;
