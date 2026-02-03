"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface NavContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  view: 'all' | 'archived'
  setView: (view: 'all' | 'archived') => void;
  popupOpen: boolean;
  setPopup: (content: ReactNode) => void;
  closePopup: () => void;
  popupContent: ReactNode | null;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export interface NavContextProps {
  children: ReactNode;
}

export const NavProvider = ({ children }: NavContextProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [view, setView] = useState<'all' | 'archived'>('all');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const setPopup = (content: ReactNode) => {
    setPopupContent(content);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupContent(null);
  };

  const contextValue: NavContextType = {
    open,
    setOpen,
    view,
    setView,
    popupOpen,
    setPopup,
    closePopup,
    popupContent,
  };

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
};

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNavContext must be used within a NavProvider");
  }
  return context;
};
