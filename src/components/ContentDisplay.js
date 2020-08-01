import React, {useMemo} from 'react'
import {createEditor} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'

const ContentDisplay = ({content}) => {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={content}>
      <Editable readOnly placeholder="Enter some plain text..." />
    </Slate>
  )
};

export default ContentDisplay