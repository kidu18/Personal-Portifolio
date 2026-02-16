"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Mail,
    Trash2,
    Search,
    MailOpen,
    Clock,
    User,
} from "lucide-react";
import { Message } from "@/types";

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await fetch(`/api/messages/${id}`, { method: "DELETE" });
            setMessages(messages.filter((m) => m._id !== id));
            if (selectedMessage?._id === id) setSelectedMessage(null);
        } catch (error) {
            console.error("Failed to delete message", error);
        }
    };

    const handleToggleRead = async (msg: Message) => {
        try {
            await fetch(`/api/messages/${msg._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ read: !msg.read }),
            });
            setMessages(
                messages.map((m) =>
                    m._id === msg._id ? { ...m, read: !m.read } : m
                )
            );
            if (selectedMessage?._id === msg._id) {
                setSelectedMessage({ ...msg, read: !msg.read });
            }
        } catch (error) {
            console.error("Failed to update message", error);
        }
    };

    const handleSelect = async (msg: Message) => {
        setSelectedMessage(msg);
        if (!msg.read) {
            try {
                await fetch(`/api/messages/${msg._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ read: true }),
                });
                setMessages(
                    messages.map((m) =>
                        m._id === msg._id ? { ...m, read: true } : m
                    )
                );
            } catch (error) {
                console.error("Failed to mark as read", error);
            }
        }
    };

    const filteredMessages = messages.filter(
        (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const unreadCount = messages.filter((m) => !m.read).length;

    const formatDate = (date?: Date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                    <p className="text-muted-foreground">
                        {unreadCount > 0
                            ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
                            : "No unread messages"}
                    </p>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {messages.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <Mail className="h-12 w-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium">No messages yet</p>
                        <p className="text-sm">
                            Messages from your contact form will appear here.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                        <AnimatePresence>
                            {filteredMessages.map((msg) => (
                                <motion.div
                                    key={msg._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    <Card
                                        className={`cursor-pointer transition-all hover:shadow-md ${selectedMessage?._id === msg._id
                                                ? "border-primary ring-1 ring-primary"
                                                : ""
                                            } ${!msg.read ? "border-l-4 border-l-primary" : ""}`}
                                        onClick={() => handleSelect(msg)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p
                                                            className={`font-medium truncate ${!msg.read ? "text-foreground" : "text-muted-foreground"
                                                                }`}
                                                        >
                                                            {msg.name}
                                                        </p>
                                                        {!msg.read && (
                                                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {msg.email}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                        {msg.message}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {formatDate(msg.createdAt)?.split(",")[0]}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {filteredMessages.length === 0 && (
                            <p className="text-center py-8 text-muted-foreground">
                                No messages found.
                            </p>
                        )}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-3">
                        {selectedMessage ? (
                            <motion.div
                                key={selectedMessage._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Card className="h-full">
                                    <CardHeader className="border-b">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <CardTitle className="text-xl">
                                                    {selectedMessage.name}
                                                </CardTitle>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="h-3 w-3" />
                                                        {selectedMessage.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatDate(selectedMessage.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleToggleRead(selectedMessage)}
                                                >
                                                    {selectedMessage.read ? (
                                                        <>
                                                            <Mail className="h-4 w-4 mr-1" /> Mark Unread
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MailOpen className="h-4 w-4 mr-1" /> Mark Read
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(selectedMessage._id!)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                            {selectedMessage.message}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <Card className="h-full min-h-[400px]">
                                <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground py-20">
                                    <MailOpen className="h-16 w-16 mb-4 opacity-30" />
                                    <p className="text-lg font-medium">Select a message</p>
                                    <p className="text-sm">
                                        Click on a message to view its contents.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
