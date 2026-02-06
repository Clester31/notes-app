"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { NoteTagType, NoteType, TagType } from "../types";

export interface NavContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  view: 'all' | 'archived'
  setView: (view: 'all' | 'archived') => void;
  popupOpen: boolean;
  setPopup: (content: ReactNode) => void;
  closePopup: () => void;
  popupContent: ReactNode | null;
  currentNote: NoteType | null;
  setCurrentNote: (note: NoteType) => void;
  tags: TagType[] | null;
  setTags: (tags: TagType[] | null) => void;
  noteTags: NoteTagType[] | null
  setNoteTags: (noteTags: NoteTagType[] | null) => void;
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
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);

  const[tags, setTags] = useState<TagType[] | null>(null)
  const[noteTags, setNoteTags] = useState<NoteTagType[] | null>(null)

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
    currentNote,
    setCurrentNote,
    tags,
    setTags,
    noteTags,
    setNoteTags
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
