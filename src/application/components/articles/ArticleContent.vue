<template>
	<div class="container">
		<div class="lead editor-container" v-html="article.body"></div>
		<div class="foot">
			<p>
				Tags:
				<span class="red text-capitalize mr-2" v-for="(tag, index) in article.tags" :key="tag">{{ tag }}{{ article.tags.length - 1 - index ? ',' : ' ' }}</span>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ArticleEntity } from '@modules/articles/domain/entities/article'
export default defineComponent({
	props: {
		article: {
			type: ArticleEntity,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	.container{
		padding-top: 3rem;
		padding-bottom: 3rem;
	}
	@media (min-width: $md){
		.container{
			padding-top: 5rem;
			padding-bottom: 5rem;
		}
	}
	.foot{ margin: 2.5rem 0; }
	@media (min-width: $md) { .foot{ margin: 4rem 0; } }
	@media (min-width: $lg) { .foot{ margin: 5rem 0; } }
</style>
