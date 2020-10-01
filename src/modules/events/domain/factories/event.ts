import { BaseFactory } from '@modules/core/domains/factories/base'
import {
	isLongerThan, isRequired, isRequiredIf
} from '@modules/core/validations/rules'
import { EventToModel } from '../../data/models/event'
import { EventEntity } from '../entities/event'
import { dateToTimestamp } from '@modules/core/data/transformers/converters/getFirestoreDate'

const isLongerThan3 = (value: string) => isLongerThan(3, value)

export class EventFactory extends BaseFactory<EventEntity, EventToModel> {
	public rules = {
		title: [isRequired,isLongerThan3],
		description: [isRequired,isLongerThan3],
		allDay: [isRequired],
		start: [isRequired],
		end: [(date: Date) => isRequiredIf(date, !this.allDay)],
		userId: [isRequired],
	}
	public values: { title: string, description: string, userId: string, allDay: boolean, start: Date, end: Date } = {
		title: '', description: '', userId: '', allDay: false, start: new Date(), end: new Date()
	}
	public validValues: { title: string, description: string, userId: string, allDay: boolean, start: Date, end: Date } = {
		title: '', description: '', userId: '', allDay: false, start: new Date(), end: new Date()
	}
	public errors = {
		title: undefined, description: undefined, userId: undefined, allDay: undefined, start: undefined, end: undefined
	}

	get title(){ return this.values.title }
	set title(value: string){ this.set('title', value) }
	get description(){ return this.values.description }
	set description(value: string){ this.set('description', value) }
	get userId(){ return this.values.userId }
	set userId(value: string){ this.set('userId', value) }
	get allDay(){ return this.values.allDay }
	set allDay(value: boolean){
		this.set('allDay', value)
		if(!value){
			const start = this.start ?? new Date
			start.setDate(start.getDate() + 1)
			this.end = start
		}
	}
	get start(){ return this.values.start }
	set start(value: Date){ this.set('start', value) }
	get end(){ return this.values.end }
	set end(value: Date){ this.set('end', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				title: this.validValues.title,
				description: this.validValues.description,
				userId: this.validValues.userId,
				allDay: this.validValues.allDay,
				start: dateToTimestamp(this.validValues.start),
				end: dateToTimestamp(this.validValues.end),
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: EventEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.userId = entity.userId
		this.allDay = entity.allDay
		this.start = entity.start
		this.end = entity.end
	}

}
