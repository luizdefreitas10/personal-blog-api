import { AttachmentsRepository } from '@/domain/blog/application/repositories/attachments-repository'
import { Attachment } from '@/domain/blog/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
