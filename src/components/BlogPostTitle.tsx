import React from 'react'
import CSS from './BlogPostTitle.module.css'
import PostContent from './PostContent/index'

interface Props {
  title: string
  date: string | void
  body: any
}

const BlogPostTitle = (props: Props) => {
  const { title, date, body } = props
  return (
    <div className={CSS.root}>
      <h1 className={CSS.title}>{title}</h1>

      <p className={CSS.byline}>
        <span className={CSS.author}>by Rico Sta. Cruz</span>
        {date ? (
          <span className={CSS.date}>{date}</span>
        ) : (
          <span className={CSS.date}>Not published</span>
        )}
      </p>

      <div className={CSS.body}>
        <PostContent body={body} />
      </div>
    </div>
  )
}

export default BlogPostTitle
