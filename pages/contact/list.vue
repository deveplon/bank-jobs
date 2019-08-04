<template>
  <b-card class="complete-container">
    <b-table striped hover :items="contacts" :fields="fields"></b-table>
    <div class="overflow-auto">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="totalContacts"
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
      fields: ['name', 'email', 'phone']
    }
  },
  async asyncData({ $axios, query }) {
    try {
      const { contacts, totalContacts } = await $axios.$get('contact', {
        params: query
      })
      return { contacts, totalContacts }
    } catch (err) {
      return { contacts: [], totalContacts: 0 }
    }
  },
  beforeMount() {
    if (window.innerWidth <= 500) {
      this.fields = ['email']
    }
  },
  methods: {
    linkGen(pageNum) {
      return `/contact/list?page=${pageNum}`
    }
  }
}
</script>

<style></style>
