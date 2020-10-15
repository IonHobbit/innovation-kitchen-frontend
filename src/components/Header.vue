<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid px-5">
      <a class="navbar-brand" href="#">
        <img class="img-fluid" src="@/assets/inn-logo.png" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <div class="navbar-nav ml-auto">
          <div v-if="user == null">
            <router-link to="/login">
              <button class="btn mr-3">LOGIN</button>
            </router-link>
            <router-link to="/signup">
              <button class="btn">SIGN UP</button>
            </router-link>
          </div>
          <div v-if="user != null">
            <span class="mr-3">Welcome back {{ user.first_name }}!</span>
            <img
              class="img-fluid"
              id="user-img"
              src="https://img.icons8.com/ios-filled/50/ffffff/user-male.png"
            />
            <div class="dropdown show">
              <a
                href="#"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              <img class="img-fluid" src="https://img.icons8.com/fluent-systems-filled/24/ffffff/menu-2--v1.png"/>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right mt-3"
                aria-labelledby="dropdownMenuLink"
              >
                <a class="dropdown-item" href="#">Profile</a>
                <a class="dropdown-item" href="#">Settings</a>
                <a class="dropdown-item" href="#" @click="logout">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: {
    user: {},
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
img {
  height: 30px;
}

nav {
  height: 80px;
  background-color: #989898;
}

button {
  border: 2px #ffffff solid;
  border-radius: 37px;
  color: #ffffff;
  font-weight: 500;
  padding: 5px 15px;
}

button:hover {
  background-color: #ffffff;
  color: #cc0000;
}

#user-img {
  border-radius: 100%;
  height: 40px;
  width: 40px;
}

span {
  color: #ffffff;
  font-weight: 500;
}

.dropdown {
  display: inline;
}

.dropdown-menu {
  background-color: #989898;
  border: none;
  border-radius: 0;
}

.dropdown-item {
  color: #ffffff;
  background-color: transparent;
  text-align: right;
  margin-top: 10px;
}

.dropdown-item:hover {
  color: #cc0000;
}
</style>
