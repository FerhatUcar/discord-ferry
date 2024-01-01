import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";
import { MakePropertiesOptional } from "@/types";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

type ModalData = {
  server: Server;
  channel: Channel;
  channelType: ChannelType;
  apiUrl: string;
  query: Record<string, any>;
};

type ModalStore = {
  type: ModalType | null;
  data: MakePropertiesOptional<ModalData>;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: MakePropertiesOptional<ModalData>) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
