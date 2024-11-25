"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: 0,
    transition: { duration: 0.3, delay: 0.4, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: "47.5%", zIndex: 0, display: "none" },
    // zIndex: 0,
  },
  exit: {
    opacity: 1,
    top: "40%",
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
  },
};

const curve = ({
  initialPath,
  targetPath,
}: {
  initialPath: string;
  targetPath: string;
}) => {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
  };
};

const translate = {
  initial: {
    top: "-300px",
  },
  enter: {
    top: "-100vh",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: "100vh",
    },
  },
  exit: {
    top: "-300px",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};

// const routes: Record<string, string> = {
//   "/": "Sker",
//   "/about": "About",
//   "/news": "News",
//   "/shop": "Shop",
//   "/membership": "Membership",
// };

const anim = (variants: any) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

interface Dimensions {
  width: number | null;
  height: number | null;
}

const Curve = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div className="bg-background z-30">
        <div
          className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 bg-black transition-opacity duration-0 z-30"
          style={{
            opacity: dimensions.width == null ? "1" : "0",
          }}
        />
        <motion.p
          key={pathname}
          className={` cursor-default absolute font-bold uppercase left-1/2 top-[40%] text-primary text-8xl z-40 transform -translate-x-1/2 text-center`}
          {...anim(text)}
        >
          {/* {routes[pathname]} */} FVENT
        </motion.p>
        {dimensions.width != null && dimensions.height != null && (
          <SVG width={dimensions.width} height={dimensions.height} />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

interface SVGProps {
  height: number;
  width: number;
}

const SVG: React.FC<SVGProps> = ({ height, width }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.svg
        key={pathname}
        className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 z-30"
        {...anim(translate)}
      >
        <motion.path
          key={pathname}
          {...anim(curve({ initialPath, targetPath }))}
        />
      </motion.svg>
    </AnimatePresence>
  );
};

export default Curve;
