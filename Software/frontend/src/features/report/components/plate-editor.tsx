'use client';

import { useMemo, useRef } from 'react';
import { cn } from '@udecode/cn';
import { Plate } from '@udecode/plate-common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { CursorOverlay } from './plate-ui/cursor-overlay';
import { Editor } from './plate-ui/editor';
import { FixedToolbar } from './plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from './plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from './plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from './plate-ui/floating-toolbar-buttons';
import { plugins } from '../lib/plate/plate-plugins';
import { Button } from '@mui/material';
import SaveButton from './SaveButton';
import { useNavigate } from 'react-router-dom';

interface PlateEditorProps {
    initialReport: any[];
    initialReadOnly: boolean;
}

export default function PlateEditor({ initialReport, initialReadOnly }: PlateEditorProps) {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const key = useMemo(() => {
        if (initialReport) {
            return window.crypto.randomUUID();
        }
    }, [initialReport]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate id="report" key={key} plugins={plugins} initialValue={initialReport}>
                <div
                    ref={containerRef}
                    className={cn(
                        'relative',
                        '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                    )}
                >
                    <FixedToolbar>
                        <FixedToolbarButtons />
                    </FixedToolbar>

                    <Editor
                        className="px-[48px] py-8 overflow-y-auto"
                        autoFocus
                        focusRing={false}
                        variant="ghost"
                        size="md"
                        initialReadOnly={initialReadOnly}
                    />

                    <FloatingToolbar>
                        <FloatingToolbarButtons />
                    </FloatingToolbar>

                    <CursorOverlay containerRef={containerRef} />

                    <div className="flex justify-end gap-4 mt-2">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Cancel
                        </Button>

                        <SaveButton key={key} />
                    </div>
                </div>
            </Plate>
        </DndProvider>
    );
}
