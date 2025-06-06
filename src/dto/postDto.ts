export interface PostDto {
  postId?: number
  title: string
  body: string
  authorName: string
  dateTime: Date
}

export interface LoadFeedDto {
  postId?: number,
  limit?: number
}
