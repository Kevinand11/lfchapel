import { EventFromModel, EventToModel } from '../models/event'
import { EventEntity } from '../../domain/entities/event'
import { dateToTimestamp, timestampToDate } from '@modules/core/data/transformers/converters/getFirestoreDate'

export class EventTransformer {
	public fromJSON(model: EventFromModel) {
		const { id, title, description, start, end, allDay, dates: { createdAt }, userId } = model
		return new EventEntity({
			id,
			title, description, userId, allDay,
			start: timestampToDate(start)!,
			end: timestampToDate(end)!,
			createdAt: timestampToDate(createdAt)!
		})
	}

	public toJSON(entity: EventEntity) :EventToModel {
		return {
			title: entity.title,
			description: entity.description,
			start: dateToTimestamp(entity.start),
			end: dateToTimestamp(entity.end),
			allDay: entity.allDay,
			userId: entity.userId
		}
	}

}
