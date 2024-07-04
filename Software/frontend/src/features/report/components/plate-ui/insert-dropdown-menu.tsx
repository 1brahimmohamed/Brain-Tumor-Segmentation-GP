'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { focusEditor, insertEmptyElement, useEditorRef } from '@udecode/plate-common';
import {
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6
} from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { Icons } from '../icons';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    useOpenState
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';

const items = [
    {
        label: 'Basic blocks',
        items: [
            {
                value: ELEMENT_PARAGRAPH,
                label: 'Paragraph',
                description: 'Paragraph',
                icon: Icons.paragraph
            },
            {
                value: ELEMENT_H1,
                label: 'Heading 1',
                description: 'Heading 1',
                icon: Icons.h1
            },
            {
                value: ELEMENT_H2,
                label: 'Heading 2',
                description: 'Heading 2',
                icon: Icons.h2
            },
            {
                value: ELEMENT_H3,
                label: 'Heading 3',
                description: 'Heading 3',
                icon: Icons.h3
            },
            {
                value: ELEMENT_H4,
                label: 'Heading 4',
                description: 'Heading 4',
                icon: Icons.h4
            },

            {
                value: ELEMENT_H5,
                label: 'Heading 5',
                description: 'Heading 5',
                icon: Icons.h5
            },

            {
                value: ELEMENT_H6,
                label: 'Heading 6',
                description: 'Heading 6',
                icon: Icons.h6
            },
            {
                value: ELEMENT_HR,
                label: 'Horizontal rule',
                description: 'Horizontal rule',
                icon: Icons.hr
            },
            {
                description: 'Bulleted list',
                icon: Icons.ul,
                label: 'Bulleted list',
                value: 'ul'
            },
            {
                description: 'Numbered list',
                icon: Icons.ol,
                label: 'Numbered list',
                value: 'ol'
            },
            {
                value: ELEMENT_BLOCKQUOTE,
                label: 'Quote',
                description: 'Quote (⌘+⇧+.)',
                icon: Icons.blockquote
            }
        ]
    }
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
    const editor = useEditorRef();
    const openState = useOpenState();

    return (
        <DropdownMenu modal={false} {...openState} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
                    <Icons.add />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
            >
                {items.map(({ items: nestedItems, label }, index) => (
                    <React.Fragment key={label}>
                        {index !== 0 && <DropdownMenuSeparator />}

                        <DropdownMenuLabel>{label}</DropdownMenuLabel>
                        {nestedItems.map(({ value: type, label: itemLabel, icon: Icon }) => (
                            <DropdownMenuItem
                                key={type}
                                className="min-w-[180px]"
                                onSelect={async () => {
                                    switch (type) {
                                        // case ELEMENT_CODE_BLOCK: {
                                        //   insertEmptyCodeBlock(editor);
                                        //
                                        //   break;
                                        // }
                                        // case ELEMENT_IMAGE: {
                                        //   await insertMedia(editor, { type: ELEMENT_IMAGE });
                                        //
                                        //   break;
                                        // }
                                        // case ELEMENT_MEDIA_EMBED: {
                                        //   await insertMedia(editor, {
                                        //     type: ELEMENT_MEDIA_EMBED,
                                        //   });
                                        //
                                        //   break;
                                        // }
                                        // case 'ul':
                                        // case 'ol': {
                                        //   insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
                                        //     select: true,
                                        //     nextBlock: true,
                                        //   });
                                        //
                                        //   if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
                                        //     toggleIndentList(editor, {
                                        //       listStyleType: type === 'ul' ? 'disc' : 'decimal',
                                        //     });
                                        //   } else if (settingsStore.get.checkedId('list')) {
                                        //     toggleList(editor, { type });
                                        //   }
                                        //
                                        //   break;
                                        // }
                                        // case ELEMENT_TABLE: {
                                        //   insertTable(editor);
                                        //
                                        //   break;
                                        // }
                                        // case ELEMENT_LINK: {
                                        //   triggerFloatingLink(editor, { focused: true });
                                        //
                                        //   break;
                                        // }
                                        default: {
                                            insertEmptyElement(editor, type, {
                                                select: true,
                                                nextBlock: true
                                            });
                                        }
                                    }

                                    focusEditor(editor);
                                }}
                            >
                                <Icon className="mr-2 size-5" />
                                {itemLabel}
                            </DropdownMenuItem>
                        ))}
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
