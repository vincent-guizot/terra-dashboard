import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FileUpload({
  onFilesSelected,
  className,
}: {
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)];
    setFiles(next);
    onFilesSelected?.(next);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className={className}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          dragging ? "border-primary-500 bg-primary-50" : "border-border-strong"
        )}
      >
        <UploadCloud className="size-8 text-text-muted" />
        <div>
          <p className="text-sm font-medium text-text-primary">Drag & drop file here</p>
          <p className="text-xs text-text-muted">or click browse to choose a file</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
          Browse Files
        </Button>
        <input ref={inputRef} type="file" multiple hidden onChange={(e) => addFiles(e.target.files)} />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-md border border-border-default bg-surface-elevated px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2 truncate text-text-primary">
                <FileIcon className="size-4 shrink-0 text-text-muted" />
                {f.name}
              </span>
              <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} aria-label="Remove file">
                <X className="size-4 text-text-muted hover:text-danger-500" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
