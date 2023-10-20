import Link from "next/link";
import eye from "../public/assets/main-page/eye.png";


const Header = () => {
  return (
    <div className="flex flex-row justify-between">
      <h2 className=" text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline fat-anchor">
          inicio.
        </Link>
      </h2>
      
      
    </div>
  );
};

export default Header;
