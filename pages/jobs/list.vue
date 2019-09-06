<template>
  <div>
    <toast />
    <b-card class="complete-container">
      <b-table striped hover :items="jobs" :fields="fields">
        <template slot="uiJobId" slot-scope="data">
          <a :href="`/jobs/${data.item._id}`">{{ data.value }}</a>
        </template>

        <template slot="jobTitle" slot-scope="data">
          <a :href="`/jobs/${data.item._id}`">{{ data.value }}</a>
        </template>

        <template slot="_id" slot-scope="data">
          <b-button variant="danger" @click.prevent="deleteJob(data.value)">delete</b-button>
        </template>
      </b-table>
      <div class="overflow-auto">
        <b-pagination-nav
          :link-gen="linkGen"
          :number-of-pages="totalJobs"
          :use-router="false"
          align="right"
        />
      </div>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

export default {
  components: {
    Toast
  },
  data() {
    return {
      fields: [
        {
          uiJobId: {
            sortable: true
          }
        },
        'jobTitle',
        {
          cvDeadline: {
            sortable: true
          }
        },
        'contact',
        {
          key: '_id',
          label: ''
        }
      ]
    }
  },
  async asyncData({ $axios, query }) {
    try {
      const { jobs, totalJobs } = await $axios.$get('job', {
        params: query
      })
      return { jobs, totalJobs }
    } catch (err) {
      return { jobs: [], totalJobs: 0 }
    }
  },
  beforeMount() {
    if (window.innerWidth <= 500) {
      this.fields = ['jobTitle']
    }
  },
  methods: {
    linkGen(pageNum) {
      return `/jobs/list?page=${pageNum}`
    },
    async deleteJob(id) {
      try {
        await this.$store.dispatch('job/delete', id)
        window.location.reload()
      } catch (err) {
        this.$store.dispatch('toast/showToast', { message: err.message })
      }
    }
  }
}
</script>

<style></style>
