"use client";

import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  CreditCard,
  Wallet,
  Activity,
  LayoutDashboard,
  PieChart,
  TrendingUp,
  Menu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getJwtInfo, removeCookie } from "./actions";
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
  const [expenseCategories, setExpenseCategories] = useState<any>({
    labels: ["Housing", "Food", "Transportation", "Utilities", "Entertainment", "Others"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  });
  const [transactions, setTransactions] = useState<any>([]);
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

    const fetchExpenseCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setExpenseCategories(data);
    };

    try {
      fetchExpenseCategories();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar categorias",
        description: "",
        action: <ToastAction altText="dismiss toast button"> Ok</ToastAction>,
      });
      console.error("Error at fetchExpenseCategories: ", error);
    }

    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    };

    try {
      fetchTransactions();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar transações",
        description: "",
        action: <ToastAction altText="dismiss toast button"> Ok</ToastAction>,
      });
      console.error("Error at fetchTransactions: ", error);
    }
  }, [router]);

  const incomeVsExpenses = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun"],
    datasets: [
      {
        label: "Renda",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Gastos",
        data: [1000, 1700, 2200, 3500, 1800, 2500],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const expenseTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Gastos",
        data: [1000, 1700, 2200, 3500, 1800, 2500],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

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
                onClick={() => {}}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Geral
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-lg justify-start"
                onClick={() => {
                  router.push("/gastos");
                }}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Gastos
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-lg justify-start"
                onClick={() => {
                  router.push("/renda");
                }}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Renda
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-lg justify-start"
                onClick={() => {
                  router.push("/transacoes");
                }}
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

            <h1 className="text-2xl font-semibold text-gray-900">Painel Geral</h1>

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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saldo total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{"R$ 12,750"}</div>
                  <p className="text-xs text-muted-foreground">
                    {"+2%"} desde último mês
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Renda</CardTitle>
                  <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{"R$ 7,500"}</div>
                  <p className="text-xs text-muted-foreground">
                    {"+5%"} desde último mês
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gastos</CardTitle>
                  <ArrowDownIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{"R$ 3,250"}</div>
                  <p className="text-xs text-muted-foreground">
                    {"-3%"} desde último mês
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Poupança</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{"R$ 2,000"}</div>
                  <p className="text-xs text-muted-foreground">
                    {"+8%"} desde último mês
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Renda x Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Bar
                    data={incomeVsExpenses}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Categorias de gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie
                    data={expenseCategories}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Line
                    data={expenseTrend}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Últimas Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {transactions.map((transaction: any) => (
                      <li
                        key={transaction.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          {transaction.type === "income" ? (
                            <ArrowUpIcon className="h-6 w-6 text-green-500" />
                          ) : (
                            <ArrowDownIcon className="h-6 w-6 text-red-500" />
                          )}
                          <span>{transaction.description}</span>
                        </div>
                        <span
                          className={
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          ${transaction.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
