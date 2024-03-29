"use client";

import { useEffect, useState } from "react";

import {
  CreateChannelModal,
  CreateServerModal,
  DeleteServerModal,
  EditServerModal,
  InviteModal,
  LeaveServerModal,
  MembersModal,
} from "@/components/modals";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <DeleteServerModal />
      <MembersModal />
      <InviteModal />
      <CreateChannelModal />
      <LeaveServerModal />
    </>
  );
};
