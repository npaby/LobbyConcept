import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../components/ui/context-menu.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { useSockets } from "../providers/socket-provider.tsx";

export default function LobbyChatroom() {}
