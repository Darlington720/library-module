import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Library,
  Menu,
  Moon,
  Settings,
  Sun,
  Users,
  BookCopy,
  Receipt,
  BarChart3,
  Bell,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { DashboardStats } from "@/components/dashboard-stats";
import { ClearancePage } from "@/components/clearance/clearance-page";
import { BooksPage } from "@/components/books/books-page";
import { BorrowingPage } from "@/components/borrowing/borrowing-page";
import { PastPapersPage } from "@/components/past-papers/past-papers-page";
import { FinesPage } from "@/components/fines/fines-page";
import { ReportsPage } from "@/components/reports/reports-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ActivePage =
  | "dashboard"
  | "books"
  | "borrowings"
  | "clearance"
  | "digital"
  | "fines"
  | "reports"
  | "past-papers";

// Mock notifications for demo
const notifications = [
  {
    id: 1,
    type: "warning",
    message: "15 books are overdue today",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "info",
    message: "New past papers uploaded for Computer Science",
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "success",
    message: "System backup completed successfully",
    time: "5 hours ago",
  },
];

export function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [alerts, setAlerts] = useState(notifications);

  const renderContent = () => {
    switch (activePage) {
      case "books":
        return <BooksPage />;
      case "borrowings":
        return <BorrowingPage />;
      case "clearance":
        return <ClearancePage />;
      case "past-papers":
        return <PastPapersPage />;
      case "fines":
        return <FinesPage />;
      case "reports":
        return <ReportsPage />;
      default:
        return (
          <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
            <DashboardStats />

            {/* Quick Actions Section */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => setActivePage("books")}
                >
                  <BookOpen className="mb-2 h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Add New Book</h3>
                    <p className="text-sm text-muted-foreground">
                      Register a new book in the system
                    </p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => setActivePage("past-papers")}
                >
                  <FileText className="mb-2 h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Upload Past Papers</h3>
                    <p className="text-sm text-muted-foreground">
                      Add new examination papers
                    </p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left"
                  onClick={() => setActivePage("reports")}
                >
                  <BarChart3 className="mb-2 h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Generate Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Create custom analytics reports
                    </p>
                  </div>
                </Button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Recent Activities</h2>
              <div className="rounded-lg border bg-card">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b p-4 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">New book added</p>
                        <p className="text-sm text-muted-foreground">
                          "Clean Code" by Robert C. Martin
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      2h ago
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-card transition-transform duration-200 ease-in-out",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        {/* <div className="flex h-16 items-center justify-between border-b px-4">
          <img
            src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg"
            alt="Nkumba University Logo"
            className="h-10 w-auto"
          />
        </div> */}
        <nav className="space-y-1 p-4">
          <Button
            variant={activePage === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("dashboard")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activePage === "books" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("books")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Books
          </Button>
          <Button
            variant={activePage === "borrowings" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("borrowings")}
          >
            <Users className="mr-2 h-4 w-4" />
            Borrowings
          </Button>
          <Button
            variant={activePage === "past-papers" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("past-papers")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Past Papers
          </Button>
          <Button
            variant={activePage === "clearance" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("clearance")}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Clearance
          </Button>
          <Button
            variant={activePage === "fines" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("fines")}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Fines
          </Button>
          <Button
            variant={activePage === "reports" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActivePage("reports")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-margin duration-200 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Page Content */}
        {renderContent()}
      </div>
    </div>
  );
}
