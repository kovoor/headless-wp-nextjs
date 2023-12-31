import React from 'react'
import styles from './post-body.module.css'

const PostBody = ({ content }: any) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody