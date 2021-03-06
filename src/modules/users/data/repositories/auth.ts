import { IAuthRepository } from '../../domain/irepositories/iauth'
import { AuthBaseDataSource } from '../datasources/auth-base'
import { AuthUser } from '../../domain/entities/auth'
import firebase from '@/services/firebase'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor(dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	public async loginWithEmail(user: AuthUser): Promise<string> {
		return await this.dataSource.loginWithEmail(user)
	}

	public async loginWithGoogle(): Promise<string> {
		return await this.dataSource.loginWithGoogle()
	}

	public async logout(): Promise<void> {
		return await this.dataSource.logout()
	}

	public async registerWithEmail(user: AuthUser): Promise<string> {
		return await this.dataSource.registerWithEmail(user)
	}

	public registerOnAuthChangedCallback(cb: (user: firebase.User | null) => void): void {
		return this.dataSource.registerOnAuthChangedCallback(cb)
	}

	public async resetPassword(user: { email: string }): Promise<void> {
		return await this.dataSource.resetPassword(user)
	}

}
