import { IVideoRepository } from '../irepositories/ivideo'
import { VideoEntity } from '../entities/video'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetVideosUseCase {
	private repository: IVideoRepository

	constructor(repository: IVideoRepository) {
		this.repository = repository
	}

	public async call (date?: Date) :Promise<VideoEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT) + 1
		}
		if(date){
			conditions.where = [
				{
					field: 'dates.createdAt',
					condition: '<',
					value: date
				}
			]
		}
		return await this.repository.get(conditions)
	}

}

