import { Menu } from "@base-ui/react/menu"
import { cn } from "cn"

function DropdownMenu(props: Menu.Root.Props) {
  return <Menu.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger({
  className,
  ...props
}: Menu.Trigger.Props) {
  return (
    <Menu.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-none select-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[popup-open]:bg-primary data-[popup-open]:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuPopup({
  className,
  sideOffset = 8,
  align = "start",
  ...props
}: Menu.Popup.Props &
  Pick<Menu.Positioner.Props, "sideOffset" | "align">) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        sideOffset={sideOffset}
        align={align}
        className="outline-none"
      >
        <Menu.Popup
          data-slot="dropdown-menu-popup"
          className={cn(
            "min-w-32 origin-[var(--transform-origin)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none transition-[scale,opacity] duration-100 ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: Menu.Item.Props) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "flex cursor-default items-center rounded-md px-2.5 py-1.5 text-sm outline-none select-none data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuPopup, DropdownMenuItem }
