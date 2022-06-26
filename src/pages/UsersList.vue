<template>
  <button @click="setTeams">Click this</button>
  <button @click="setLeave">Click this</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      statusLeave: false
    };
  },
  inject: ['users'],
  methods: {
    setTeams() {
      this.$router.push('/teams');
      // this.$router.back('/teams');
      // this.$router.forward('/teams');
    },
    setLeave() {
      this.statusLeave = true
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log('Userlist Cmp beforeRouteLeave');
    console.log(to, from);

    if(this.statusLeave) {
      next();
    } else {
      const confirmStatus = confirm('Lu bener mau pegi? blm diklik blok!');
      next(confirmStatus);
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('Users List before each');
    console.log(to, from);
    next();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>