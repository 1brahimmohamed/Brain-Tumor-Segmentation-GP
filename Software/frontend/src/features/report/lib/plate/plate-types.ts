import React from 'react';
import { AutoformatRule } from '@udecode/plate-autoformat';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
    createPlateEditor,
    CreatePlateEditorOptions,
    createPluginFactory,
    createPlugins,
    createTEditor,
    Decorate,
    DecorateEntry,
    DOMHandler,
    EDescendant,
    EElement,
    EElementEntry,
    EElementOrText,
    EMarks,
    ENode,
    ENodeEntry,
    EText,
    ETextEntry,
    getTEditor,
    InjectComponent,
    InjectProps,
    KeyboardHandler,
    NoInfer,
    OnChange,
    OverrideByKey,
    PlateEditor,
    PlateId,
    PlatePlugin,
    PlatePluginComponent,
    PlatePluginInsertData,
    PlatePluginProps,
    PlateProps,
    PluginOptions,
    SerializeHtml,
    TElement,
    TNodeEntry,
    TReactEditor,
    TText,
    useEditorRef,
    useEditorState,
    WithOverride
} from '@udecode/plate-common';
import {
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6
} from '@udecode/plate-heading';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { ELEMENT_LINK, TLinkElement } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_IMAGE, TImageElement } from '@udecode/plate-media';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TR, TTableElement } from '@udecode/plate-table';

/**
 * Text
 */

export type EmptyText = {
    text: '';
};

export type PlainText = {
    text: string;
};

export interface RichText extends TText {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    kbd?: boolean;
    subscript?: boolean;
    backgroundColor?: React.CSSProperties['backgroundColor'];
    fontFamily?: React.CSSProperties['fontFamily'];
    color?: React.CSSProperties['color'];
    fontSize?: React.CSSProperties['fontSize'];
    fontWeight?: React.CSSProperties['fontWeight'];
}

/**
 * Inline Elements
 */

export interface MyLinkElement extends TLinkElement {
    type: typeof ELEMENT_LINK;
    children: RichText[];
}

export type MyInlineElement = MyLinkElement;
export type MyInlineDescendant = MyInlineElement | RichText;
export type MyInlineChildren = MyInlineDescendant[];

/**
 * Block props
 */

export interface MyIndentProps {
    indent?: number;
}

export interface MyIndentListProps extends MyIndentProps {
    listStart?: number;
    listRestart?: number;
    listStyleType?: string;
}

export interface MyLineHeightProps {
    lineHeight?: React.CSSProperties['lineHeight'];
}

export interface MyAlignProps {
    align?: React.CSSProperties['textAlign'];
}

export interface MyBlockElement extends TElement, MyIndentListProps, MyLineHeightProps {
    id?: PlateId;
}

/**
 * Blocks
 */

export interface MyParagraphElement extends MyBlockElement {
    type: typeof ELEMENT_PARAGRAPH;
    children: MyInlineChildren;
}

export interface MyH1Element extends MyBlockElement {
    type: typeof ELEMENT_H1;
    children: MyInlineChildren;
}

export interface MyH2Element extends MyBlockElement {
    type: typeof ELEMENT_H2;
    children: MyInlineChildren;
}

export interface MyH3Element extends MyBlockElement {
    type: typeof ELEMENT_H3;
    children: MyInlineChildren;
}

export interface MyH4Element extends MyBlockElement {
    type: typeof ELEMENT_H4;
    children: MyInlineChildren;
}

export interface MyH5Element extends MyBlockElement {
    type: typeof ELEMENT_H5;
    children: MyInlineChildren;
}

export interface MyH6Element extends MyBlockElement {
    type: typeof ELEMENT_H6;
    children: MyInlineChildren;
}

export interface MyBlockquoteElement extends MyBlockElement {
    type: typeof ELEMENT_BLOCKQUOTE;
    children: MyInlineChildren;
}

export interface MyTableElement extends TTableElement, MyBlockElement {
    type: typeof ELEMENT_TABLE;
    children: MyTableRowElement[];
}

export interface MyTableRowElement extends TElement {
    type: typeof ELEMENT_TR;
    children: MyTableCellElement[];
}

export interface MyTableCellElement extends TElement {
    type: typeof ELEMENT_TD;
    children: MyNestableBlock[];
}

export interface MyBulletedListElement extends TElement, MyBlockElement {
    type: typeof ELEMENT_UL;
    children: MyListItemElement[];
}

export interface MyNumberedListElement extends TElement, MyBlockElement {
    type: typeof ELEMENT_OL;
    children: MyListItemElement[];
}

export interface MyListItemElement extends TElement, MyBlockElement {
    type: typeof ELEMENT_LI;
    children: MyInlineChildren;
}

export interface MyImageElement extends TImageElement, MyBlockElement {
    type: typeof ELEMENT_IMAGE;
    children: [EmptyText];
}

export interface MyHrElement extends MyBlockElement {
    type: typeof ELEMENT_HR;
    children: [EmptyText];
}

export type MyNestableBlock = MyParagraphElement;

export type MyBlock = Exclude<MyElement, MyInlineElement>;
export type MyBlockEntry = TNodeEntry<MyBlock>;

export type MyRootBlock =
    | MyParagraphElement
    | MyH1Element
    | MyH2Element
    | MyH3Element
    | MyH4Element
    | MyH5Element
    | MyH6Element
    | MyBlockquoteElement
    | MyTableElement
    | MyBulletedListElement
    | MyNumberedListElement
    | MyImageElement
    | MyHrElement;

export type MyValue = MyRootBlock[];

/**
 * Editor types
 */

export type MyEditor = PlateEditor<MyValue> & { isDragging?: boolean };
export type MyReactEditor = TReactEditor<MyValue>;
export type MyNode = ENode<MyValue>;
export type MyNodeEntry = ENodeEntry<MyValue>;
export type MyElement = EElement<MyValue>;
export type MyElementEntry = EElementEntry<MyValue>;
export type MyText = EText<MyValue>;
export type MyTextEntry = ETextEntry<MyValue>;
export type MyElementOrText = EElementOrText<MyValue>;
export type MyDescendant = EDescendant<MyValue>;
export type MyMarks = EMarks<MyValue>;
export type MyMark = keyof MyMarks;

/**
 * Plate types
 */

export type MyDecorate<P = PluginOptions> = Decorate<P, MyValue, MyEditor>;
export type MyDecorateEntry = DecorateEntry<MyValue>;
export type MyDOMHandler<P = PluginOptions> = DOMHandler<P, MyValue, MyEditor>;
export type MyInjectComponent = InjectComponent<MyValue>;
export type MyInjectProps = InjectProps<MyValue>;
export type MyKeyboardHandler<P = PluginOptions> = KeyboardHandler<P, MyValue, MyEditor>;
export type MyOnChange<P = PluginOptions> = OnChange<P, MyValue, MyEditor>;
export type MyOverrideByKey = OverrideByKey<MyValue, MyEditor>;
export type MyPlatePlugin<P = PluginOptions> = PlatePlugin<P, MyValue, MyEditor>;
export type MyPlatePluginInsertData = PlatePluginInsertData<MyValue>;
export type MyPlatePluginProps = PlatePluginProps<MyValue>;
export type MyPlateProps = PlateProps<MyValue, MyEditor>;
export type MySerializeHtml = SerializeHtml<MyValue>;
export type MyWithOverride<P = PluginOptions> = WithOverride<P, MyValue, MyEditor>;

/**
 * Plate store, Slate context
 */

export const getMyEditor = (editor: MyEditor) => getTEditor<MyValue, MyEditor>(editor);
export const useMyEditorRef = () => useEditorRef<MyValue, MyEditor>();
export const useMyEditorState = () => useEditorState<MyValue, MyEditor>();

/**
 * Utils
 */
export const createMyEditor = () => createTEditor() as MyEditor;
export const createMyPlateEditor = (options: CreatePlateEditorOptions<MyValue, MyEditor> = {}) =>
    createPlateEditor<MyValue, MyEditor>(options);
export const createMyPluginFactory = <P = PluginOptions>(
    defaultPlugin: PlatePlugin<NoInfer<P>, MyValue, MyEditor>
) => createPluginFactory(defaultPlugin);
export const createMyPlugins = (
    plugins: PlatePlugin[],
    options?: {
        components?: Record<string, PlatePluginComponent>;
        overrideByKey?: OverrideByKey;
    }
) => createPlugins<MyValue, MyEditor>(plugins, options);

export type MyAutoformatRule = AutoformatRule<MyValue, MyEditor>;
