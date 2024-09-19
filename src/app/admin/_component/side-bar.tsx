"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const containerVariants = {
  close: {
    width: "4rem",
    transition: {
      type: "string",
      damping: 15,
      duration: 0.25,
    },
  },
  open: {
    width: "12rem",
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
  return (
    <TooltipProvider>
      <motion.nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="flex flex-col items-center gap-4 px-2 sm:py-4"
      >
        <Link
          href="/admin"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/admin/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-black md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Bảng số liệu</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Bảng số liệu</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full flex justify-center">
              <Link
                href="/admin/orders"
                className="flex h-9 w-9 items-center justify-center w-full rounded-lg bg-accent text-accent-foreground transition-colors hover:text-black md:h-8 md:w-8"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/admin/event-management"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-black md:h-8 md:w-8"
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-black md:h-8 md:w-8"
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-black md:h-8 md:w-8"
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip>
      </motion.nav>
    </TooltipProvider>
  );
}
