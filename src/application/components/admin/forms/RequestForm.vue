<template>
	<form class="mx-2" @submit.prevent="submit">
		<slot name="title"><h4>Title</h4></slot>
		<div class="form-group my-3">
			<label for="name">Your Name</label>
			<input class="form-control" placeholder="Eg. John Doe" v-model="factory.name" id="name"
			       :class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}">
			<span class="small" v-if="factory.errors.name">{{ factory.errors.name }}</span>
		</div>
		<div class="form-group my-3">
			<label for="email">Your Email</label>
			<input class="form-control" placeholder="Eg. johndoe@gmail.com" v-model="factory.email" id="email"
			       :class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}">
			<span class="small" v-if="factory.errors.email">{{ factory.errors.email }}</span>
		</div>
		<div class="form-group my-3">
			<label for="message">Your Message</label>
			<textarea class="form-control" v-model="factory.message" id="message" rows="6"
		          :class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
		          placeholder="Eg I would like the church to join me in praying for my family members">
			</textarea>
			<span class="small" v-if="factory.errors.message">{{ factory.errors.message }}</span>
		</div>
		<div class="form-group">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="public" v-model="factory.public">
				<label class="form-check-label" for="public">
					Can we share your prayer request publicly in church?
				</label>
			</div>
		</div>
		<hr>
		<div class="d-flex my-3">
			<button class="btn btn-gold text-white" type="submit" :disabled="loading || !factory.valid">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { RequestFactory } from '@modules/forms/domain/factories/request'
export default defineComponent({
	name: 'RequestForm',
	props: {
		factory: {
			type: RequestFactory,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		submit: {
			type: Function,
			required: true
		}
	}
})
</script>
