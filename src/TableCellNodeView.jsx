import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

import { FaChevronCircleRight } from "react-icons/fa";
import './TableNodeView.scss';


const TableCellNodeView = ({ node, getPos, selected, editor }) => {
  console.log("Editor: ", editor)
  console.log("Node: ", node)
  const [open, setOpen] = useState(false);

  const [focusedCell, setFocusedCell] = useState(false);

  const calculateifTableCellActive = () => {
    const { from, to } = editor.state.selection;

    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;
    setFocusedCell(nodeFrom <= from && to <= nodeTo);
  };

  useEffect(() => {
    editor.on("selectionUpdate", calculateifTableCellActive);

    setTimeout(calculateifTableCellActive, 100);

    return () => {
      editor.off("selectionUpdate", calculateifTableCellActive);
    };
  });

  const getButtonTrigger = () => {
    if (focusedCell || selected) {
      return (
        <Tippy
          appendTo={document.body}
          interactive
          animation="shift-toward-subtle"
          placement="right-start"
          onClickOutside={() => setOpen(false)}
          visible={open}
          content={<ul className="table-cell-dropdown-wrapper">
            <li onClick={() => editor.chain().focus().addRowBefore().run()}>Add row above</li>
            <li onClick={() => editor.chain().focus().addRowAfter().run()}>Add Row below</li>
            <li onClick={() => editor.chain().focus().addColumnBefore().run()}>Add column before</li>
            <li onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</li>
            <li onClick={() => editor.chain().focus().deleteTable().run()}>Remove table</li>
            <li onClick={() => editor.chain().focus().deleteRow().run()}>Remove row</li>
            <li onClick={() => editor.chain().focus().deleteColumn().run()}>Remove column</li>
            <li onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>Toggle header column</li>
            <li onClick={() => editor.chain().focus().toggleHeaderCell().run()}>Toggle header cell</li>
            <li onClick={() => editor.chain().focus().deleteTable().run()}>Remove table</li>
          </ul>}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("click");
              setOpen(true);
            }}
            className="table-cell-dropdown-trigger"
          >
            <FaChevronCircleRight />
          </button>
        </Tippy>
      )
    } else {
      return <></>
    }
  }

  return (
        <NodeViewWrapper>
          <NodeViewContent as="span" />
          {getButtonTrigger()}
      </NodeViewWrapper>
  )
}

export default TableCellNodeView;