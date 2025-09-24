import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FamilyHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="font-serif font-bold text-lg text-foreground">FamilyHub</h2>
            <p className="text-xs text-muted-foreground">Familia García</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center">
              3
            </span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/loving-parent.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">MG</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
