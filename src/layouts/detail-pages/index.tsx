import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const DetailPagesLayout = () => {
  const { lang } = useParams();
  const mainStyle =
    lang === "ka"
      ? "mx-auto min-h-screen w-5/6 ka"
      : "mx-auto min-h-screen w-5/6 en";
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default DetailPagesLayout;
