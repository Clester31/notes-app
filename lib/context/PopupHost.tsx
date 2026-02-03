"use client"

import PopupContainer from "@/components/popups/PopupContainer";
import { useNavContext } from "./NavContext";

export default function PopupHost() {
  const { popupOpen, popupContent } = useNavContext();

  if (!popupOpen || !popupContent) return null;

  return <PopupContainer>{popupContent}</PopupContainer>;
}