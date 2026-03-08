"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
    id: string;
    endpoint: string;
}

export default function DeleteButton({ id, endpoint }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this record?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || "Delete failed");
            }
        } catch {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            style={{
                background: 'none',
                border: 'none',
                color: loading ? 'var(--color-text-muted)' : '#ef4444',
                cursor: loading ? 'not-allowed' : 'pointer'
            }}
        >
            <Trash2 size={16} />
        </button>
    );
}
