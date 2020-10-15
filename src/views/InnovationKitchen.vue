<template>
  <div>
    <Header :user="user" v-on:logout="logout" />
    <Community :user="user" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Community from '@/components/Community.vue'
import axios from "axios";
import { TokenService } from "@/storage/service.js";

export default {
  name: 'InnovationKitchen',
  components: {
    Header,
    Community
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.token = TokenService.getToken();
    let axiosAuth = {
      headers: {
        Authorization: "Token " + this.token,
      },
    };
    if (this.token != null) {
      this.verifyUser(axiosAuth);
    }
  },
  methods: {
    verifyUser(axiosAuth) {
      axios
        .get("https://ayion-app.herokuapp.com/api/users/me", axiosAuth)
        .then((response) => {
          this.user = response.data;
          return true;
        })
        .catch((error) => {
          error;
        });
    },
    logout() {
      axios({
        method: "post",
        url: "https://ayion-app.herokuapp.com/api/token/logout/",
        headers: {
          Authorization: "Token " + this.token,
        },
      })
        .then(() => {
          localStorage.removeItem("user-token");
          this.user = null;
        })
        .catch((error) => {
          error
        });
    },
  },
}
</script>