import { ThemeProvider } from "@/components/theme-provider";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const NotFoundLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children} || <Outlet />
    </ThemeProvider>
  );
};

export default NotFoundLayout;
