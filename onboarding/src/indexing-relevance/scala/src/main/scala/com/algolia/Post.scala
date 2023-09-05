package com.algolia

case class Post(postId: Int,
                postTitle: String,
                postDate: Int,
                postDateFormatted: String,
                authorName: String,
                authorImageUrl: String,
                permalink: String,
                categories: Iterable[String],
                image: String,
                timeToRead: Int,
                content: String,
                recordIndex: Int)
