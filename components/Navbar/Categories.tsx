import Container from "../Container/Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { BsSnow } from "react-icons/bs";

import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { Variants, motion } from "framer-motion";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern !",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on island !",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to lake !",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities !",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities !",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has snowfall !",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in cave !",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the batn!",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  const boxVariants: Variants = {
    open: {
      transition: {
        duration: 0.5,
        delayChildren: 0,
        staggerChildren: 0.1,
      },
    },
    closed: {
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Container>
      <motion.div
        // variants={boxVariants}
        // initial="closed"
        // animate="open"
        className="pt-4 flex flex-row items-center justify-between overflow-x-auto"
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </motion.div>
    </Container>
  );
};

export default Categories;
0;
