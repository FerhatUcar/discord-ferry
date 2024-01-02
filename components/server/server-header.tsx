"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  LucideIcon,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { createElement } from "react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const renderMenuItem = (
    condition: boolean,
    onClick: ModalType,
    label: string,
    icon: LucideIcon,
  ) => {
    const defaultClass = "px-3 py-2 text-sm cursor-pointer";
    const onClickClassMap: Partial<Record<ModalType, string>> = {
      invite: `text-indigo-600 dark:text-indigo-400 ${defaultClass}`,
      deleteServer: `text-rose-500 ${defaultClass}`,
      leaveServer: `text-rose-500 ${defaultClass}`,
    };

    const className = onClickClassMap[onClick] || defaultClass;

    return (
      condition && (
        <DropdownMenuItem
          onClick={() => onOpen(onClick, { server })}
          className={className}
        >
          {label}
          {icon && createElement(icon, { className: "h-4 w-4 ml-auto" })}
        </DropdownMenuItem>
      )
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {renderMenuItem(isModerator, "invite", "Invite People", UserPlus)}
        {renderMenuItem(isAdmin, "editServer", "Server Settings", Settings)}
        {renderMenuItem(isAdmin, "members", "Manage Members", Users)}
        {renderMenuItem(
          isModerator,
          "createChannel",
          "Create Channel",
          PlusCircle,
        )}
        {isModerator && <DropdownMenuSeparator />}
        {renderMenuItem(isAdmin, "deleteServer", "Delete server", Trash)}
        {renderMenuItem(!isAdmin, "leaveServer", "Leave server", LogOut)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
