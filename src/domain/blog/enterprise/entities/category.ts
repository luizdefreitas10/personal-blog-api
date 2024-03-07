import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Post } from './post'

export interface CategoryProps {
  name: string
  description: string
  posts: Post[]
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get posts() {
    return this.props.posts
  }

  static create(props: CategoryProps, id?: UniqueEntityID) {
    const category = new Category({ ...props }, id)
    return category
  }
}
