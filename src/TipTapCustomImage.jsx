import {
  Node,
  nodeInputRule,
  mergeAttributes
} from "@tiptap/core";
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageComponent from "./ResizableImageComponent";

export const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

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
    inline: false,
    group: 'block', // belongs to the 'block' group of extensions
    selectable: true, // so we can select the video
    draggable: false,
    allowBase64: false,


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
      console.log("Html attributes: ", HTMLAttributes)
      console.log("Options: ", this.options)
      return [
        "resizable-image-component",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
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
    // addInputRules() {
    //   return [
    //     nodeInputRule({
    //       find: inputRegex,
    //       type: this.type,
    //       getAttributes: match => {
    //         const [,, alt, src, title, height, width, dataAlign, dataFloat] = match
    //         return { src, alt, title, height, width, dataAlign, dataFloat }
    //       },
    //     }),
    //   ]
    // },
  });
};

export default TipTapCustomImage;
