import SideNav from "../sidenav/sidenav";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <SideNav />
      </nav>
      <main className="px-auto flex justify-center items-center flex-col md:flex-row ">
        {children}
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
