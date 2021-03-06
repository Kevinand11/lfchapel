import { trimToLength, extractTextFromHTML, extractDate } from '@modules/core/validations/sanitizers'
import { Media } from '@modules/core/data/models/base'
import { BaseEntity } from '@modules/core/domains/entities/BaseEntity'

export class PictureEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly imageData: Media
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, title, description, imageData, createdAt, userId }: PictureConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.imageData = imageData
		this.createdAt = createdAt
		this.userId = userId
	}

	get image(){ return this.imageData.link }

	get trimmedDescription(){ return trimToLength(extractTextFromHTML(this.description), 200) }

	get createdDate(){return extractDate(this.createdAt) }
}

type PictureConstructorArgs = { id: string, title: string, description: string, imageData: Media, createdAt: Date, userId: string }

