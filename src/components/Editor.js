import React, {useMemo, useCallback} from 'react';
import styled from 'styled-components';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {faUnderline, faItalic, faHeading, faBold} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorButton = styled.button`
    padding: 5px 10px;
    border: none;
    border-right: 1px solid #aaa;

    ${props => {
      return props.active ? `
        background-color: #666;
        color: #fff;
      ` : ``;
    }}

    &:last-child {
        border: none;
    }
`;

const Toolbar = styled.div`
    display: flex;
    background-color: #eee;
`;

const initialState = [
    {
        type: 'paragraph',
        children: [
          { text: '' }
        ],
    },
];

const editorStyles = {
    padding: '30px',
    border: '1px solid #eee',
    backgroundColor: '#fff'
};

const contentDisplayStyles = {
    ...editorStyles,
    width: '100%',
    marginBottom: '30px'
};

function DraftEditor ({state, onChange}) {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate editor={editor} value={state || initialState} onChange={onChange}>
            <Toolbar>
                <MarkButton format="bold" icon={faBold} />
                <MarkButton format="italic" icon={faItalic} />
                <MarkButton format="underline" icon={faUnderline} />
                <BlockButton format="heading-one" icon={faHeading} />
            </Toolbar>
            <Editable
                style={editorStyles}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
            />
        </Slate>
    )
}

export function ContentDisplay ({content}) {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate editor={editor} value={content}>
            <Editable
                style={contentDisplayStyles}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                readOnly
            />
        </Slate>
    )
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    })
  
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
  
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }
  
  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
    });
  
    return !!match;
  };
  
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };
  
  const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  };
  
  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
  
    if (leaf.code) {
      children = <code>{children}</code>;
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
  
    return <span {...attributes}>{children}</span>;
  };
  
  const BlockButton = ({ format, icon }) => {
    const editor = useSlate();

    return (
      <EditorButton
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </EditorButton>
    );
  };
  
  const MarkButton = ({ format, icon }) => {
    const editor = useSlate();

    return (
      <EditorButton
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </EditorButton>
    );
  };

export default DraftEditor;
