"use client";

import { Calendar, LayoutDashboard, Package2, BellRing } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  close: {
    width: "3.25rem",
    transition: {
      type: "string",
      damping: 15,
      duration: 0.25,
    },
  },
  open: {
    width: "18rem",
    transition: {
      type: "string",
      damping: 15,
      duration: 0.25,
    },
  },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else containerControls.start("close");
  }, [isOpen, containerControls]);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const menu = [
    {
      title: "Bảng số liệu",
      link: "#",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Quản lý sự kiện",
      link: "/organizer/quan-ly-su-kien",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Thông báo",
      link: "#",
      icon: <BellRing className="h-5 w-5" />,
    },
  ];
  return (
    <motion.nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className="flex flex-col items-center overflow-hidden gap-4 px-2 sm:py-4"
    >
      <div className="flex gap-4 px-1 items-center w-full">
        <Link
          href="#"
          className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
        </Link>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Fvent</p>
          <p className="text-xs text-muted-foreground">Organizer</p>
        </div>
      </div>
      <Separator />
      {menu.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="w-full flex justify-start items-center gap-4 px-2 hover:bg-primary hover:text-background rounded-md group"
        >
          <div className="flex items-center justify-center w-full rounded-lg transition-colors group-hover:text-background md:h-8 md:w-8">
            {item.icon}
          </div>
          <p className="text-sm font-semibold truncate">{item.title}</p>
        </Link>
      ))}
    </motion.nav>
  );
}
