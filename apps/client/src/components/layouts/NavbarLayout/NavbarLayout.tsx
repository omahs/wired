import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function NavbarLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center h-full overflow-y-scroll">
      <div className="w-full h-14 fixed z-50">
        <Navbar />
      </div>
      <div className="w-full h-full pt-14">{children}</div>
    </div>
  );
}

export function getNavbarLayout(children: React.ReactNode) {
  return <NavbarLayout>{children}</NavbarLayout>;
}
