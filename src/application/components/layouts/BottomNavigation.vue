<template>
	<footer class="position-relative">
		<div class="custom-divider">
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
				<path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
			</svg>
		</div>
		<div class="container pt-8">
			<div class="row align-items-center">
				<div class="col-md-4 my-3">
					<img src="@/application/assets/images/logo.png" alt="LFChapel" height="80">
				</div>
				<div class="col-md-4 d-flex align-items-center my-3">
				<span class="icon mr-2">
					<i class="fa fa-map-marker-alt"></i>
				</span>
					<span class="info">{{ address }}</span>
				</div>
				<div class="col-md-4 d-flex align-items-center my-3">
				<span class="icon mr-2">
					<i class="fa fa-envelope"></i>
				</span>
					<div class="info">
						<div class="phone"><a :href="`tel:${phone}`">{{ phone }}</a></div>
						<div class="email"><a :href="`mailto:${email_1}`">{{ email_1 }}</a></div>
						<div class="email"><a :href="`mailto:${email_2}`">{{ email_2 }}</a></div>
						<div class="email"><a :href="`mailto:${email_3}`">{{ email_3 }}</a></div>
					</div>
				</div>
			</div>
			<hr class="bordered my-5">
			<div class="row links">
				<div class="col-md-3 col-6">
					<h4>MAIN LINKS</h4>
					<ul class="list-group">
						<li class="list-group-item">
							<router-link to="/">Home</router-link>
						</li>
						<li class="list-group-item">
							<router-link to="/about-us/our-church">Our Church</router-link>
						</li>
						<li class="list-group-item">
							<router-link to="/media/photo-gallery">Media</router-link>
						</li>
						<li class="list-group-item">
							<router-link to="/contact-us">Contact Us</router-link>
						</li>
					</ul>
				</div>
				<div class="col-md-3 col-6">
					<h4>WHO WE ARE</h4>
					<ul class="list-group">
						<li class="list-group-item">
							<router-link to="/about-us/mission-and-vision">Mission and Vision</router-link>
						</li>
						<li class="list-group-item">
							<router-link to="/about-us/service-times">Service Times</router-link>
						</li>
						<li class="list-group-item">
							<router-link to="/articles">Blog</router-link>
						</li>
						<li class="list-group-item">
							<router-link to="/forms/prayer-requests">Prayer Requests</router-link>
						</li>
					</ul>
				</div>
				<div class="col-md-3 col-6">
					<h4>FOLLOW US</h4>
					<ul class="list-group">
						<li class="list-group-item d-flex">
							<span class="socials mr-2">
								<i class="fab fa-instagram"></i>
							</span>
							<a href="https://instagram.com/lfcowingsmills" target="_blank">Instagram</a>
						</li>
						<li class="list-group-item d-flex">
							<span class="socials mr-2">
								<i class="fab fa-facebook-f"></i>
							</span>
							<a href="https://www.facebook.com/lfcowingsmills1" target="_blank">Facebook</a>
						</li>
						<li class="list-group-item d-flex">
							<span class="socials mr-2">
								<i class="fab fa-youtube"></i>
							</span>
							<a href="https://www.youtube.com/channel/UC-1hbQqRXFAuS1AkIuAF7cg" target="_blank">Youtube</a>
						</li>
					</ul>
				</div>
				<div class="col-md-3 col-6">
					<h4>NEWSLETTER</h4>
					<form @submit.prevent="() => {}">
						<ul class="list-group">
							<li class="form-group">
								<input type="email" class="form-control" v-model="factory.email" placeholder="Email Address"
								       :class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email') }">
								<span class="small text-danger" v-if="factory.errors.email">{{ factory.errors.email }}</span>
							</li>
							<li class="list-group-item">
								<button class="btn btn-outline-light" type="submit" :disabled="loading" @click="subscribeToMailingList">
									<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
									<Loading v-if="loading" />
									<span>Submit</span>
								</button>
							</li>
						</ul>
					</form>
				</div>
			</div>
			<hr class="my-3">
			<div class="d-flex justify-content-center">
				<p>
					<span class="font-weight-bolder">&copy; Copyright {{ new Date().getFullYear() }} Living Faith Chapel. </span>
					<span>All Right Reserved</span>
				</p>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	footer{
		background: $gold;
		color: $white;
	}
	.custom-divider {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
	}

	.custom-divider svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 50px;
		transform: rotateY(180deg);
	}

	.custom-divider .shape-fill {
		fill: #FFFFFF;
	}
	span.icon{
		background: $main-red;
		color: $white;
		border-radius: 5rem;
		font-size: 1.5rem;
		width: 4rem;
		height: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}
	.info{
		font-weight: bold;
		a{
			color: $white;
		}
	}
	.links{
		background: $gold;
		color: $white;
		div{
			margin-bottom: 2rem;
		}
		h4{
			font-size: 1.25rem;
			font-weight: bold;
			margin-bottom: 1rem;
		}
		.list-group-item{
			background: $gold;
			border: none;
			padding: 0.5rem 0;
			a{
				color: $white;
			}
		}
		span.socials{
			//background: $white;
			//color: $gold;
			border-radius: 5rem;
			font-size: 1rem;
			width: 1.75rem;
			height: 1.75rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
		}
	}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useMailingList } from '@app/usecases/users/users'
export default defineComponent({
	setup(){
		const { loading, factory, subscribeToMailingList } = useMailingList()
	    return {
		    loading, factory, subscribeToMailingList,
	        address: process.env.VUE_APP_CHURCH_ADDRESS,
		    email_1: process.env.VUE_APP_CHURCH_EMAIL_1,
		    email_2: process.env.VUE_APP_CHURCH_EMAIL_2,
		    email_3: process.env.VUE_APP_CHURCH_EMAIL_3,
		    phone: process.env.VUE_APP_CHURCH_PHONE,
	    }
	}
})
</script>
