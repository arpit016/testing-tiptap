import { mergeAttributes, Node } from "@tiptap/core";
import TableCellNodeView from './TableCellNodeView';
import { ReactNodeViewRenderer } from '@tiptap/react';

const CustomTableCell = Node.create({
  name: "tableCell",

  addNodeView() {
    return ReactNodeViewRenderer(TableCellNodeView, {
      as: "td",
      className: "relative",
    });
  },
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "block+",

  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? [parseInt(colwidth, 10)] : null;

          return value;
        },
      },
    };
  },

  tableRole: "cell",

  isolating: true,

  parseHTML() {
    return [{ tag: "td" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "td",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
})

export default CustomTableCell;