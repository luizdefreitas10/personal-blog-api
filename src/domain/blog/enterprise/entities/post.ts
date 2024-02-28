import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PostProps {
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  authorId: UniqueEntityID
  categoryId: UniqueEntityID
}

export class Post extends Entity<PostProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

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

  get categoryId() {
    return this.props.categoryId
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<PostProps, 'createdAt'>, id?: UniqueEntityID) {

    const createdAt = props.createdAt ?? new Date();

    const post = new Post({
      ...props,
      createdAt,
    }, id)

    return post
  }
}
