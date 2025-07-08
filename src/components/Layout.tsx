
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  Target,
  Users,
  FileText,
  Settings,
  User,
  LogOut,
  Plus,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Target, label: "Oportunidades", path: "/opportunities" },
  { icon: Users, label: "Clientes", path: "/clients" },
  { icon: FileText, label: "Relatórios", path: "/reports" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.raw_user_meta_data?.full_name) {
      return user.raw_user_meta_data.full_name;
    }
    return user?.email?.split('@')[0] || 'Usuário';
  };

  const getUserAvatar = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    if (user?.raw_user_meta_data?.avatar_url) {
      return user.raw_user_meta_data.avatar_url;
    }
    return undefined;
  };

  const getUserInitials = () => {
    const displayName = getUserDisplayName();
    return displayName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-foreground">CRM Sistema</span>
              )}
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={location.pathname === item.path}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className="mt-6">
              <Button
                onClick={() => navigate("/opportunities/new")}
                className="w-full justify-start gap-2"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                Nova Oportunidade
              </Button>
            </div>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={getUserAvatar()} alt={getUserDisplayName()} />
                    <AvatarFallback className="text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{getUserDisplayName()}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/permissions")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Permissões
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6 gap-4">
              <SidebarTrigger />
              <div className="flex-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getUserAvatar()} alt={getUserDisplayName()} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/permissions")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Permissões
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
