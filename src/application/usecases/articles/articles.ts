import { computed, reactive } from '@vue/composition-api'
import { ArticleEntity } from '@modules/articles/domain/entities/article'
import {
	DeleteArticle, GetArticles, FindArticle,
	GetArticleFactory, AddArticle, UpdateArticle
} from '@modules/articles'
import { Alert, Notify } from '@app/config/notifications'
import router from '@app/router'
import { useStore } from '@app/usecases/store'
import { useCreateModal, useEditModal } from '@app/usecases/modals'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)

const globalState = reactive({
	articles: reactive([]) as ArticleEntity[],
	fetched: false,
	loading: false,
	error: '',
	hasMore: false,
	olderArticlesLoading: false
})

const setArticle = (article: ArticleEntity) => {
	const index = globalState.articles.findIndex((p) => p.id === article.id)
	if(index !== -1) globalState.articles.splice(index, 1, article)
	else globalState.articles.push(article)
	globalState.error = ''
}
const unshiftArticle = (article: ArticleEntity) => {
	const index = globalState.articles.findIndex((p) => p.id === article.id)
	if(index !== -1) globalState.articles.splice(index, 1, article)
	else globalState.articles.unshift(article)
	globalState.error = ''
}
const fetchArticles = async () => {
	const date = globalState.articles[globalState.articles.length - 1]?.createdAt ?? undefined
	const entities = await GetArticles.call(date)
	globalState.hasMore = entities.length === PAGINATION_LIMIT + 1
	entities.splice(0, PAGINATION_LIMIT).forEach(setArticle)
}
const fetchArticlesOnInit = async () => {
	globalState.loading = true
	await fetchArticles().catch(() => globalState.error = 'Failed to fetch articles')
	if(globalState.articles.length === 0) globalState.error = 'No articles available at the moment. Check again later'
	globalState.loading = false
}
const fetchOlderArticles = async () => {
	globalState.olderArticlesLoading = true
	await fetchArticles()
	globalState.olderArticlesLoading = true
}

export const useArticlesList = () => {
	if(!globalState.fetched) fetchArticlesOnInit().then(() => globalState.fetched = true)

	return {
		loading: computed(() => globalState.loading),
		olderArticlesLoading: computed(() => globalState.olderArticlesLoading),
		hasMore: computed(() => globalState.hasMore),
		error: computed(() => globalState.error),

		articles: computed(() => globalState.articles),

		fetchOlderArticles
	}
}

export const useDeleteArticle = (article: ArticleEntity) => {
	const state = reactive({ loading: false })
	const deleteArticle = async () :Promise<boolean> => {
		try {
			const result = await Alert({
				title: 'Delete article',
				text: `Are you sure you want to delete ${article.title}? This cannot be undone`,
				icon: 'info',
				confirmButtonText: 'Delete'
			})
			if(result.value) {
				state.loading = true
				await DeleteArticle.call(article.id)
				globalState.articles = globalState.articles.filter((a) => a.id !== article.id)
				state.loading = false
				await Notify({ icon: 'success', title: 'Article deleted successfully' })
			}
			return !!result.value
		} catch(error) {
			await Notify({ icon: 'error', title: error.message })
			return false
		}
	}
	return {
		loading: computed(() => state.loading),
		deleteArticle
	}
}

const fetchArticle = async (id: string) => {
	let article = globalState.articles.find((article) => article.id === id)
	if(article) return article
	article = await FindArticle.call(id)
	if(article) unshiftArticle(article)
	return article
}

export const useSingleArticle = (id: string) => {
	const state = reactive({
		loading: false,
		article: undefined as ArticleEntity | undefined,
		error: ''
	})
	const findArticle = async () => {
		state.loading = true
		const article = await fetchArticle(id)
		if(article) state.article = article
		else{
			await router.replace('/articles')
			await Notify({ title: 'No such article found', icon: 'error' })
		}
		state.loading = false
	}
	findArticle().catch(() => state.error = 'Failed to fetch article')
	return {
		loading: computed(() => state.loading),
		article: computed(() => state.article),
		error: computed(() => state.error)
	}
}

export const useCreateArticle = () => {
	const state = reactive({
		loading: false,
		factory: GetArticleFactory.call()
	})

	state.factory.userId = useStore().auth.getId.value

	const createArticle = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			try{
				const id = await AddArticle.call(state.factory)
				await fetchArticle(id)
				state.factory.reset()
				useCreateModal().closeCreateModal()
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		createArticle,
	}
}

let currentEdit = undefined as ArticleEntity | undefined

export const setCurrentEditingArticle = (article: ArticleEntity) => currentEdit = article

export const useEditArticle = () => {
	const state = reactive({
		loading: false,
		factory: GetArticleFactory.call()
	})

	if(currentEdit) state.factory.loadEntity(currentEdit)

	const editArticle = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			try{
				const newId = await UpdateArticle.call(currentEdit!.id, state.factory)
				const article = await FindArticle.call(newId)
				if(article) unshiftArticle(article)
				state.factory.reset()
				useEditModal().closeEditModal()
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		editArticle,
	}
}
