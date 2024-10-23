"use client";

import { useEffect, useState } from "react";
import { CreditCard, LayoutDashboard, PieChart, TrendingUp, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { getJwtInfo, removeCookie } from "../actions";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function EnhancedFinanceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getCk = async () => {
      const info = await getJwtInfo();
      if (info) {
        setUserInfo(info);
      } else {
        router.push("/login");
      }
    };
    try {
      getCk();
    } catch (error) {
      console.error("Error at getting cookies");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? "block" : "hidden"} md:block`}
      >
        <div className="p-4 border-b bg-slate-900 cursor-pointer">
          <h2 className="text-2xl font-semibold text-white">Easy Finance</h2>
        </div>
        <nav className="flex-grow">
          <ul className="p-5 space-y-8">
            <li>
              <Button
                variant="ghost"
                className="w-full text-lg justify-start"
                onClick={() => {
                  router.push("/");
                }}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Geral
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-lg justify-start">
                <PieChart className="mr-2 h-4 w-4" />
                Gastos
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/renda");
                }}
                className="w-full text-lg justify-start"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Renda
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/transacoes");
                }}
                className="w-full text-lg justify-start"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Transaçôes
              </Button>
            </li>
            <li>
              <Link href={"/login"}>
                <Button
                  variant="ghost"
                  className="w-full text-lg text-red-600 justify-start"
                  onClick={async () => {
                    if (await removeCookie()) {
                      router.push("login");
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Erro ao deslogar",
                        description: "Por favor tente novamente",
                        action: (
                          <ToastAction altText="dismiss toast button"> Ok</ToastAction>
                        ),
                      });
                    }
                  }}
                >
                  <ExitIcon className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <h1 className="text-2xl font-semibold text-gray-900">Gastos</h1>

            <div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => {
                  toast({
                    variant: "default",
                    title: "Informações do usuário",
                    description: `Nome: ${userInfo.username} | email: ${userInfo.email}`,
                    action: <ToastAction altText="dismiss toast button"> Ok</ToastAction>,
                  });
                }}
              >
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="User avatar"
                />
              </Button>
              <span className="text-xl font-semibold text-gray-900 m-1 mb-2">
                {userInfo?.username || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100"></main>
      </div>
    </div>
  );
}
