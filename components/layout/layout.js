import SideNav from "../sidenav/sidenav";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <SideNav />
      </nav>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
