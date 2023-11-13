import { FaAirbnb } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <IconContext.Provider value={{ className: "text-rose-500" }}>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FaAirbnb size="30" />
        <header className="font-semibold text-rose-500 hidden md:block">
          Airbnb
        </header>
      </div>
    </IconContext.Provider>
  );
};

export default Logo;
