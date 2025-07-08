import {
  BarChart3,
  Briefcase,
  FileText,
  Settings,
  Users,
  User,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Oportunidades",
      url: "/opportunities",
      icon: Briefcase,
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Relatórios",
      url: "#",
      icon: FileText,
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-700">
      {/* Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <aside className="w-60 flex-none h-full border-r hidden sm:block p-4">
            <div className="mb-4">
              <h1 className="font-bold text-lg">Menu</h1>
            </div>
            <ScrollArea className="h-[calc(100vh-100px)]">
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start ${
                            location.pathname === item.url
                              ? "font-semibold"
                              : "font-normal"
                          }`}
                          onClick={() => navigate(item.url)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </ScrollArea>
            <Separator />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                  <AvatarFallback>{user?.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.full_name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start mt-2"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </aside>
        </SheetTrigger>
        <SheetContent side="left" className="w-60">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Navegue pelas opções do sistema.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)]">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          location.pathname === item.url
                            ? "font-semibold"
                            : "font-normal"
                        }`}
                        onClick={() => navigate(item.url)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </ScrollArea>
          <Separator />
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                <AvatarFallback>{user?.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.full_name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start mt-2"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
