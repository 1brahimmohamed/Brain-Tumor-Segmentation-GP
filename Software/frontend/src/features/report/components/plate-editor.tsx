'use client';

import { useRef } from 'react';
import { cn } from '@udecode/cn';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
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

export default function PlateEditor() {
    const containerRef = useRef(null);

    const initialValue = [
        {
            id: '1',
            type: ELEMENT_PARAGRAPH,
            children: [{ text: 'Hello, World!' }]
        }
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate plugins={plugins} initialValue={initialValue}>
                <div
                    ref={containerRef}
                    className={cn(
                        'relative',
                        // Block selection
                        '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                    )}
                >
                    <FixedToolbar>
                        <FixedToolbarButtons />
                    </FixedToolbar>

                    <Editor
                        className="px-[48px] py-8 h-72 overflow-y-auto"
                        autoFocus
                        focusRing={false}
                        variant="ghost"
                        size="md"
                    />

                    <FloatingToolbar>
                        <FloatingToolbarButtons />
                    </FloatingToolbar>

                    <CursorOverlay containerRef={containerRef} />

                    <div className="flex justify-end gap-4 mt-2">
                        <Button variant="outlined" color="secondary" onClick={() => {}}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => {}}>
                            Save
                        </Button>
                    </div>
                </div>
            </Plate>
        </DndProvider>
    );
}
