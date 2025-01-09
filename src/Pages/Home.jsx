
import { Header } from "../components/Header";
import { SideCategory } from "../components/SideCatgory";
import { About } from "../components/About";
import { Products } from "../components/Products";

export const Home = () => {



  return (
    <>
      <Header />
      <SideCategory />
      <main className="mt-8 md:top-20  md:left-56 absolute md:w-[80%] h-screen  w-full " >
        <About />
        <Products />
      </main>

    </>
  );
};
