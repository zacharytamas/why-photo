import { Sidebar, SidebarContent, SidebarHeader } from './ui/sidebar'

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      <SidebarContent>Hello.</SidebarContent>
    </Sidebar>
  )
}
