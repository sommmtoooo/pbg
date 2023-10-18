import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC } from "react";

interface LayoutProps {
  Component: FC<any>;
}
export default function Layout({ Component }: LayoutProps) {
  const queryClient = new QueryClient();
  const props = { queryClient };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative w-full flex-col">
        <Navbar />
        <main className="w-5/6 mx-auto py-[8em]">
          <Component {...props} />
          <hr />
          <Footer name="Somtochukwu" repo="https://github.com/somtodev/pbg" />
        </main>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          hideProgressBar
          draggable
          closeOnClick
        />
      </div>
    </QueryClientProvider>
  );
}
