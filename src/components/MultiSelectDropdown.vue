<template>
	<div class="multiselect">
		<div class="multiselect-box">
			<div class="multiselect-toggle float-right" @click="open = !open">
				V
			</div>
			<div v-for="(selection,i) in selected" :key="i">
				<div :class="'multiselect-selected ' + (i==0?'first ':'') + (i==selected.length-1?'last ':'')">
					<div class="multiselect-selected-text" :title="selection">
						{{selection}}
					</div>
					<div v-if="max > 1" class="multiselect-selected-remove">
						<button class="btn btn-danger" @click="removeSelection(i)">X</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="open" class="multiselect-dropdown">
			<div v-for="(option,i) in unselected" :key="i" class="multiselect-option" @click="addSelection(option)">
				{{option}}
			</div>
			<div v-if="unselected.length == 0">
				None
			</div>
		</div>
	</div>
</template>

<script>
import CourseAPI from '@/services/CourseAPI.js';

export default {
	name: 'Statistics',
	props: {
		options: Array,
		max: { type: Number, default: 999 }
	},
	components: {},
	data(){
		return {
			selected: [],
			unselected: [],
			open: false
		}
	},
	created() {
		this.options.forEach(option => {
			this.unselected.push(option)
		})
	},
	methods: {
		addSelection(option) {
			if(this.selected.length < this.max) {
				this.selected.push(option)
				this.selected.sort()
				let index = this.unselected.indexOf(option);
				if (index > -1) {
					this.unselected.splice(index, 1);
				}
				this.unselected.sort()
			} else if(this.max == 1 && this.selected[0] != option) {
				this.unselected.push(this.selected[0])
				this.selected[0] = option;
				let index = this.unselected.indexOf(option);
				if (index > -1) {
					this.unselected.splice(index, 1);
				}
				this.unselected.sort()
			}
		},
		removeSelection(i) {
			this.unselected.push(this.selected[i])
			this.selected.splice(i,1)
		},
		sendUpdates() {
			this.$emit('update',selected)
		}
	}
}
</script>

<style scoped>
.multiselect {
	text-align: left;
	display: inline-block;
}
.multiselect-box {
	border-radius: 0.25rem;
	min-height: 2.5rem;
	width: 10rem;
	/* margin: 0.5rem; */
	padding: 0.25rem;
	padding-bottom: 0;
	background: rgb(255, 255, 255)
}
.multiselect-toggle {
	position: relative;
	display: inline-block;
	text-align: center;
	top: 0;
	right: 0;
	margin: 0.25rem 0.5rem;
	width: 1rem;
	cursor: pointer;
}
.multiselect-selected {
	position: relative;
	display: inline-flex;
	background:#c4c4c4;
	margin-bottom: 0.25rem;
	max-width: 9.5rem;
}
.multiselect-selected.first {
	max-width: 7.5rem;
}
.multiselect-selected-text {
	padding: 0.25rem 0.5rem;
	font-size: 0.8rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.multiselect-dropdown {
	z-index: 999;
	max-height: 10rem;
	width: 10rem;
	overflow: auto;
	position: absolute;
	/* margin-top: -0.25rem; */
	background: rgb(255, 255, 255);
	border-top: 1px solid black;
}
.multiselect-option {
	margin: 0.5rem;
	padding: 0.25rem;
	background:#c4c4c4;
	border: 1px black solid;
	cursor: pointer;
}
.btn-danger {
	border-radius: 0.25rem;
	padding: 0.1rem 0.5rem;
	padding-left: 0;
	background: none;
	color: red;
	border: none;
	font-weight: 900;
	outline: none;
}
</style>