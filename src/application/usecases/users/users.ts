import { computed, reactive } from '@vue/composition-api'
import { FindUsersByEmail, GetMailingListFactory, MakeAdmin, RemoveAdmin, SubscribeToMailingList } from '@modules/users'
import { Notify } from '@app/config/notifications'
import { UserEntity } from '@modules/users/domain/entities/user'

export const useMailingList = () => {
	const state = reactive({
		loading: false,
		factory: GetMailingListFactory.call()
	})

	const subscribeToMailingList = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await SubscribeToMailingList.call(state.factory)
				state.factory.reset()
				state.loading = false
				await Notify({ icon: 'success', title: 'Subscribed successfully' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	return {
		loading: computed(() => state.loading),
		factory: computed(() => state.factory),
		subscribeToMailingList
	}
}

export const useAdminRoles = () => {
	const state = reactive({
		loading: false,
		fetched: false,
		upgrading: false,
		email: '',
		users: reactive([]) as UserEntity[]
	})

	const getUsersByEmail = async () => {
		if(state.email){
			state.loading = true
			state.users = reactive(await FindUsersByEmail.call(state.email))
			state.fetched = true
			state.loading = false
		}
	}

	const adminUser = async (user: UserEntity) => {
		state.upgrading = true
		try{
			await MakeAdmin.call(user.id)
			state.users.find((u) => u.id === user.id)!.roles.isAdmin = true
		}catch(error){ await Notify({ icon: 'error', title: error.message }) }
		state.upgrading = false
	}

	const deAdminUser = async (user: UserEntity) => {
		state.upgrading = true
		try{
			await RemoveAdmin.call(user.id)
			state.users.find((u) => u.id === user.id)!.roles.isAdmin = false
		}catch(error){ await Notify({ icon: 'error', title: error.message }) }
		state.upgrading = false
	}

	const reset = () => {
		state.email = ''
		state.users = reactive([])
		state.fetched = false
	}


	return {
		loading: computed(() => state.loading),
		fetched: computed(() => state.fetched),
		upgrading: computed(() => state.upgrading),
		users: computed(() => state.users),
		email: computed({ get: () => state.email, set: (value: string) => state.email = value }),
		getUsersByEmail, adminUser, deAdminUser, reset
	}
}
