import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { useParams } from "react-router-dom";

const AuthLayout = () => {
  const { lang } = useParams();
  const mainStyle =
    lang === "ka"
      ? "mx-auto min-h-screen w-full ka"
      : "mx-auto min-h-screen w-full en";
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <main className={mainStyle}>
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default AuthLayout;
