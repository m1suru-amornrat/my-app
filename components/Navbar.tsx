import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between p-4 shadow-lg/20">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/info">Info</Link>
          <Link href="/book">Book</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login">login</Link>
          <Link href="/register">register</Link>
        </div >

      </nav >
    </>
  );
};
export default Navbar;