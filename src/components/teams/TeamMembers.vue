<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <!-- router link disini ga lebaca karena URL membaca namun route nya gagal memanggil komponen -->
    <!-- solusinya kita bisa gunakan watch untuk otomatisasi pembaharuan route -->
    <router-link to="/teams/t2">Go to t2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  // props disini namanya sesuai dengan :valueDynamicRoute
  props: ['teamId'],
  inject: ['teams', 'users'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    teamMember(teamId) {
      // const teamId = this.$route.params.teamId;
      // const teamId = route.params.teamId;
      const selectTeam = this.teams.find((team) => team.id === teamId);
      const members = selectTeam.members;
      const selectAllTeam = [];
      for (const member of members) {
        const selectUser = this.users.find((user) => user.id === member);
        selectAllTeam.push(selectUser);
      }
      this.members = selectAllTeam;
      this.teamName = selectTeam.name;
    },
  },
  created() {
    this.teamMember(this.teamId);
  },
  // beforeRouteUpdate(to, from, next) {
  //   // disini kita panggil method teamMember lalu mengupdate route sesuai yang akan dituju berdasarkan teamId
  //   this.teamMember(to.params.teamId);
  //   next();
  // },
  watch: {
    // Watch disini berfungsi apabila masuk request route terbaru untuk disimpan secara otomatis apabila $route mengalami perubahan
    teamId(newRoute) {
      this.teamMember(newRoute);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>