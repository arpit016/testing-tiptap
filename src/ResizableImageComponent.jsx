import React from "react";
import {Rnd} from 'react-rnd';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

const ResizableImageComponent = (props) => {

  return (
    <NodeViewWrapper className="resizable-image-component">
        <Rnd
          minWidth={300}
          minHeight={190}
          bounds="parent"
          disableDragging= {true}
          onResizeStop={(e, direction, ref, delta, position) => {
            props.updateAttributes({
              width: ref.style.width,
              height: ref.style.height
            })
            
          }}
        >
          <div
            className="resizable-image-wrapper"
            style={{ margin: 0, height: '100%', paddingBottom: '40px', maxWidth: "400px" }}
          >
            <img className="resizable-image" src={props.node.attrs.src} alt={props.node.attrs.alt} draggable="false" />
          </div>
        </Rnd>

        {/* <img className="resizable-image" src={props.node.attrs.src} alt={props.node.attrs.alt} draggable="false" /> */}
    </NodeViewWrapper>
  )
}

export default ResizableImageComponent;