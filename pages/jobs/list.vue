<template>
  <b-card class="complete-container">
    <b-table striped hover :items="jobs" :fields="fields"></b-table>
    <div class="overflow-auto">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="totalJobs"
        :use-router="false"
        align="right"
      />
    </div>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        'jobTitle',
        'workPlace',
        'jobDescription',
        'salary',
        'start',
        'contact'
      ]
    }
  },
  async asyncData({ $axios, query }) {
    try {
      const { jobs, totalJobs } = await $axios.$get('job/list', {
        params: query
      })
      return { jobs, totalJobs }
    } catch (err) {
      return { jobs: [], totalJobs: 0 }
    }
  },
  methods: {
    linkGen(pageNum) {
      return `/jobs/list?page=${pageNum}`
    }
  }
}
</script>

<style></style>
