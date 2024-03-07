import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CommentProps {
  content: string
  createdAt: Date
  updatedAt?: Date | null
  authorId: UniqueEntityID
  postId: UniqueEntityID
}

export class Comment extends Entity<CommentProps> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get authorId() {
    return this.props.authorId
  }

  get postId() {
    return this.props.postId
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const createdAt = props.createdAt ?? new Date()
    const comment = new Comment({ ...props, createdAt }, id)
    return comment
  }
}
