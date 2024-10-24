"use client";
import UserNavBar from "@/components/navigation/user-navbar";
import Banner from "./_component/banner";
import Slider from "./_component/slider";
import EventList from "./_component/event-list";

// export default function Page() {
//   const targetRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });
//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-51%"]);
//   const events = [
//     { title: "Event1", image: "/images/event-bg.png", link: "#" },
//     { title: "Event1", image: "/images/event-bg-1.png", link: "#" },
//     { title: "Event1", image: "/images/event-bg-2.png", link: "#" },
//     { title: "Event1", image: "/images/event-bg-3.png", link: "#" },
//     { title: "Event1", image: "/images/event-bg.png", link: "#" },
//   ];
//   const categories = ["Sự kiện nổi bật"];
//   const [selectedCategory, setSelectedCategory] = useState("Sự kiện nổi bật");
//   return (
//     <>
//       <section ref={targetRef} className="relative h-[300vh]">
//         <div className="fixed z-10 w-full flex flex-col gap-8 p-4">
//           <nav className="relative ">
//             <div className="sticky top-0 flex items-center justify-between">
//               <div className="text-xl">Fvent</div>
//               {/* <div className="h-16 flex border-primary border-2 items-center rounded-full">
//                 {categories.map((item, index) => (
//                   <Button
//                     variant="link"
//                     key={index}
//                     onClick={() => {
//                       setSelectedCategory(item);
//                     }}
//                   >
//                     {item.toUpperCase()}
//                   </Button>
//                 ))}
//               </div> */}
//               {/* <div className="flex gap-4">
//                 {categories.map((item, index) => (
//                   <Button
//                     key={index}
//                     onClick={() => {
//                       setSelectedCategory(item);
//                     }}
//                   >
//                     {item}
//                   </Button>
//                 ))}
//               </div> */}
//               <Button variant="link">
//                 <Menu></Menu>
//               </Button>
//             </div>
//           </nav>
//           <div>
//             <div className="font-bold text-6xl text-primary">
//               {selectedCategory.toUpperCase()}
//             </div>
//           </div>
//         </div>
//         <div className="sticky top-0 bottom-0 px-4 pt-32 flex items-center h-screen overflow-hidden">
//           <motion.div style={{ x }} className="flex gap-2">
//             {events.map((item, index) => (
//               <Link
//                 href={item.link}
//                 className="h-[26rem] w-[19rem] rounded-[24px] overflow-hidden relative"
//                 key={index}
//               >
//                 <Image src={item.image} alt="event" fill></Image>
//               </Link>
//             ))}
//             {events.map((item, index) => (
//               <Link
//                 href={item.link}
//                 className="h-96 w-72 rounded-[24px] overflow-hidden relative"
//                 key={index}
//               >
//                 <Image src={item.image} alt="event" fill></Image>
//               </Link>
//             ))}
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Banner />
      <Slider />
      <EventList title="Talkshow" />
    </div>
  );
}
