import { AutoformatBlockRule } from '@udecode/plate-autoformat';
import { getParentNode, isElement, isType, PlateEditor } from '@udecode/plate-common';
import { toggleList, unwrapList } from '@udecode/plate-list';

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) => unwrapList(editor);

export const format = (editor: PlateEditor, customFormatting: any) => {
    if (editor.selection) {
        const parentEntry = getParentNode(editor, editor.selection);
        if (!parentEntry) return;
        const [node] = parentEntry;
        if (isElement(node)) {
            customFormatting();
        }
    }
};

export const formatList = (editor: PlateEditor, elementType: string) => {
    format(editor, () =>
        toggleList(editor, {
            type: elementType
        })
    );
};

export const formatText = (editor: PlateEditor, text: string) => {
    format(editor, () => editor.insertText(text));
};
