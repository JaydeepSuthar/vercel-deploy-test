<template>
	<section id="faq" class="tw-mt-5">
		<div
			class="faq-title tw-m-0 tw-min-w-0 tw-text-3xl tw-font-semibold tw-select-none back tw-text-left tw-transform-none"
		>
			Frequently Asked Questions
		</div>

		<div class="faq-list tw-mt-5">
			<li
				class="faq-list-item tw-list-none tw-select-none tw-hover:no-underline"
			>
				<p class="faq-question tw-font-bold">
					When does this course start and finish
				</p>
				<p class="faq-answer">
					The course starts now and never ends. It is a completely
					self-paced online course. you decide when you start and when
					you finish.
				</p>
			</li>

			<li class="faq-list-item tw-list-none">
				<p class="faq-question tw-font-bold">
					What does this course includes?
				</p>
				<p class="faq-answer">
					Course includes online streaming access to videos, all code
					files that are used in this course. Please check course
					content on the course page, as we list all of our topics
					very transparently. Whatever is included, is mentioned.
				</p>
			</li>
			<li class="faq-list-item tw-list-none">
				<p class="faq-question tw-font-bold">
					How many times can I watch a video
				</p>
				<p class="faq-answer">
					As many times as you like. Watch it 10 times or 100 times.
					Totally on you
				</p>
			</li>
			<li class="faq-list-item tw-list-none">
				<p class="faq-question tw-font-bold">
					Does this course come with certificate?
				</p>
				<p class="faq-answer">
					Yep, All of our paid course comes with certificates
				</p>
			</li>
			<li class="faq-list-item tw-list-none">
				<p class="faq-question tw-font-bold">
					Can I check the video quality?
				</p>
				<p class="faq-answer">
					Yes of course. In fact, we recommend it. Take our free
					javascript course or take a look. We take audio, video and
					content quality very seriously. Also, some videos in this
					course are marked for preview, so that you can test the
					quality
				</p>
			</li>
			<li class="faq-list-item tw-list-none">
				<p class="faq-question tw-font-bold">Do you offer Refunds?</p>
				<p class="faq-answer">
					We recommend checking free previews and course content.
					Also, check our free course to get an idea about video and
					content quality. Our courses are a digital product which
					means, once consumed, it cannot be returned. WE DON'T OFFER
					REFUNDS AT THIS PLATFORM. Sorry, we are not a marketplace,
					where quality can be misled by fake reviews.
				</p>
			</li>
		</div>
	</section>
</template>

<script>
export default {
	name: "FAQ",
};
</script>

<style lang="scss" scoped>
.faq-list {
	// background: whitesmoke;
	margin: 1em auto;
	max-width: 80%;

	* {
		margin-top: 5px;
		user-select: none;
		font-weight: bold;

		&:hover {
			text-decoration: none;
			color: currentColor;
		}
	}
}

.back {
	//   background: wheat;
	text-align: center;
}

.faq-question::before {
	counter-increment: faq-counter;
	font-weight: bold;
	content: counter(faq-counter) ". ";
}
.faq-answer {
	box-sizing: border-box;
	margin: 0px 0px 16px;
	min-width: 0px;
	font-size: 1rem;
	font-weight: 400;
	user-select: none;
	text-align: left;
	text-transform: none;
	line-height: 1.5;
}
</style>
