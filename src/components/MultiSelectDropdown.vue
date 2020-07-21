<template>
	<div class="multiselect" v-click-outside="handleClickOutside">
		<div :class="'multiselect-box z'+(999-(2*n)+1)" @click="open = !open">
			<div class="multiselect-toggle float-right">
				{{"\u23F7"}}
			</div>
			<div v-for="(selection,i) in selected" :class="'multiselect-selected ' + (i==0?'first ':'') + (i==selected.length-1?'last ':'')" :key="i" v-on:click.stop>
				<div class="multiselect-selected-text" :title="getDisplayText(selection)">
					{{getDisplayText(selection)}}
				</div>
				<div v-if="max > 1" class="multiselect-selected-remove">
					<button class="btn btn-danger" @click="removeSelection(i)">X</button>
				</div>
			</div>
		</div>
		<div v-if="open" :class="'multiselect-dropdown z'+(999-(2*n))">
			<div v-for="(option,i) in unselected" :key="i" class="multiselect-option" :title="getDisplayText(option)" @click="addSelection(option)" v-on:click.stop>
				{{getDisplayText(option)}}
			</div>
		</div>
	</div>
</template>

<script>
import CourseAPI from '@/services/CourseAPI.js';

export default {
	name: 'MultiSelectDropdown',
	props: {
		options: Array,
		sortBy: String,
		displayAs: Array,
		max: { type: Number, default: 999 },
		n: { type: Number, default: 0 },
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
		this.unselected.sort((a,b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
	},
	methods: {
		addSelection(option) {
			if(this.selected.length < this.max) {
				this.selected.push(option)
				this.selected.sort((a,b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
			} else if(this.max == 1 && this.selected[0] != option) {
				this.unselected.push(this.selected[0])
				this.selected[0] = option;
			}
			let index = this.unselected.indexOf(option);
			if (index > -1) {
				this.unselected.splice(index, 1);
			}
			this.unselected.sort((a,b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
			this.sendUpdates()
		},
		removeSelection(i) {
			this.unselected.push(this.selected[i])
			this.selected.splice(i,1)
			this.unselected.sort((a,b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
			this.sendUpdates()
		},
		getDisplayText(option) {
			let display = ""
			if(this.displayAs) {
				this.displayAs.forEach((prop,i) => {
					display += (i>0 ? ", "+option[prop]  : option[prop])
				})
			} else {
				display +=  option[this.sortBy]
			}
			return display
		},
		sendUpdates() {
			this.$emit('update',this.selected)
		},
		repopulate(data) {
			this.unselected = []
			this.selected = []
			data.forEach(option => {
				this.unselected.push(option)
			})
			this.unselected.sort((a,b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
		},
		handleClickOutside(event) {
			this.open = false
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
	position: relative;
	border-radius: 0.25rem;
	min-height: 2.75rem;
	width: 10rem;
	padding: 0.25rem;
	background: #ECECEC;
	cursor: pointer;
}
.multiselect-toggle {
	position: relative;
	display: inline-block;
	text-align: center;
	top: 0;
	right: 0;
	margin: 0.25rem;
	margin-left: 0rem;
	margin-top: 0.3rem;
	width: 1rem;
}
.multiselect-selected {
	position: relative;
	display: inline-flex;
	border-radius: 0.2rem;
	margin: 0.25rem;
	max-width: 9rem;
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
	cursor: text;
}
.multiselect-dropdown {
	max-height: 10rem;
	width: 10rem;
	overflow: auto;
	position: absolute;
	background: #ECECEC;
	border-top: 1px solid black;
	border-radius: 0.25rem;
	box-shadow: 0rem 0.2rem 1rem 0.2rem black;
	min-height: 1rem;
}
.z1000 {
	z-index: 1000;
}
.z999 {
	z-index: 999;
}
.z998 {
	z-index: 998;
}
.z997 {
	z-index: 997;
}
.z996 {
	z-index: 996;
}
.z995 {
	z-index: 995;
}
.z994 {
	z-index: 994;
}
.z993 {
	z-index: 993;
}
.multiselect-option {
	margin: 0.5rem;
	padding: 0.25rem 0.5rem;
	background:#c4c4c4;
	border-radius: 0.3rem;
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