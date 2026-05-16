import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, X } from 'lucide-react';

const { div: MotionDiv } = motion;

const ImageDropzone = ({ preview, onFileSelect, disabled }) => {
    const [dragging, setDragging] = useState(false);

    const handleFiles = useCallback(
        (files) => {
            const file = files?.[0];
            if (!file || !file.type.startsWith('image/')) return;
            onFileSelect(file);
        },
        [onFileSelect]
    );

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (disabled) return;
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                if (!disabled) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`relative rounded-2xl border-2 border-dashed transition-colors overflow-hidden ${
                dragging
                    ? 'border-black bg-zinc-50'
                    : 'border-zinc-200 hover:border-zinc-400'
            } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <label className="flex flex-col items-center justify-center min-h-[220px] cursor-pointer p-6 text-center">
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    disabled={disabled}
                    onChange={(e) => handleFiles(e.target.files)}
                />
                <AnimatePresence mode="wait">
                    {preview ? (
                        <MotionDiv
                            key="preview"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full max-w-xs aspect-square"
                        >
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="w-full h-full object-cover rounded-xl border border-zinc-200"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFileSelect(null);
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-black text-white rounded-full"
                                aria-label="Quitar imagen"
                            >
                                <X size={14} />
                            </button>
                        </MotionDiv>
                    ) : (
                        <MotionDiv
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3 text-zinc-500"
                        >
                            <ImagePlus size={32} strokeWidth={1.25} />
                            <p className="text-sm font-medium text-black font-sans normal-case">
                                Arrastrá una imagen o hacé clic
                            </p>
                            <p className="text-xs text-zinc-400 font-sans normal-case">
                                JPG, PNG o WebP · máx. 5 MB
                            </p>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </label>
        </div>
    );
};

export default ImageDropzone;
