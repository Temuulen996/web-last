import SideNav from "../sidenav/sidenav";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <SideNav />
      </nav>
      <main className="w-full flex justify-center ">{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
