"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import type { QuestionOption } from "@/lib/types";

function SortableRow({
  option,
  rank,
  onMove,
  isFirst,
  isLast,
}: {
  option: QuestionOption;
  rank: number;
  onMove: (dir: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: option.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-xl border-2 border-meti-slate/15 bg-white px-4 py-3.5"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-meti-navy text-xs font-semibold text-white">
        {rank}
      </span>
      <span className="flex-1 text-sm font-medium text-meti-navy">{option.label}</span>
      <div className="flex flex-col">
        <button
          type="button"
          aria-label="Move up"
          disabled={isFirst}
          onClick={() => onMove("up")}
          className="p-0.5 text-meti-slate hover:text-meti-navy disabled:opacity-25"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Move down"
          disabled={isLast}
          onClick={() => onMove("down")}
          className="p-0.5 text-meti-slate hover:text-meti-navy disabled:opacity-25"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <button
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="cursor-grab touch-none p-1 text-meti-slate/50 hover:text-meti-slate active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
    </div>
  );
}

export function RankQuestion({ options }: { options: QuestionOption[] }) {
  const [items, setItems] = useState(options);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function move(id: string, dir: "up" | "down") {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      const newIdx = dir === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      return arrayMove(prev, idx, newIdx);
    });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5">
          {items.map((opt, i) => (
            <SortableRow
              key={opt.id}
              option={opt}
              rank={i + 1}
              isFirst={i === 0}
              isLast={i === items.length - 1}
              onMove={(dir) => move(opt.id, dir)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
