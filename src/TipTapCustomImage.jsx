import {
  Node,
} from "@tiptap/core";
import { mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageComponent from "./ResizableImageComponent";

const TipTapCustomImage = () => {
  return Node.create({
    name: "resizableImageComponent",

    // addOptions() {
    //   return {
    //     inline: false,
    //     allowBase64: false,
    //     group: 'block',
    //     content: "block*",
    //     HTMLAttributes: {},
    //   };
    // },
    group: 'block', // belongs to the 'block' group of extensions
    selectable: true, // so we can select the video
    draggable: true, // so we can drag the video
    atom: true,
    content: 'block*',


    addAttributes() {
      return {
        src: {
          default: null,
        },
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        width: {
          default: '100%',
        },
        height: {
          default: 'auto'
        },
        dataAlign: {
          default: 'left' // 'left' | 'center' | 'right'
        },
        dataFloat: {
          default: null // 'left' | 'right'
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'resizable-image-component',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        "resizable-image-component",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0
      ];
    },

    addCommands() {
      return {
        setImage:
          (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          },
      };
    },
    addNodeView() {
      return ReactNodeViewRenderer(ResizableImageComponent)
    },
  });
};

export default TipTapCustomImage;
