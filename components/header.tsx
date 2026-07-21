import Link from "next/link";
import eye from "../public/assets/main-page/eye.png";


const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline fat-anchor">
          {"<"}inicio.
        </Link>
      </h2>

      <Link
        href="/blog"
        className="text-base md:text-lg font-medium hover:underline"
      >
        blog{">"}
      </Link>
    </div>
  );
};

export default Header;
