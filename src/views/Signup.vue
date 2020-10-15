<template>
  <div class="signup">
    <div class="centered">
      <router-link to="/">
        <img class="img-fluid mb-3" src="@/assets/inn-logo.png" />
      </router-link>
      <form v-on:submit.prevent="signup">
        <div class="form-group text-left">
          <label for="email">EMAIL</label>
          <br />
          <input type="text" name="email" v-model="username" />
        </div>
        <div class="form-group text-left">
          <label for="first_name">FIRST NAME</label>
          <br />
          <input type="text" name="first_name" v-model="first_name" />
        </div>
        <div class="form-group text-left">
          <label for="first_name">LAST NAME</label>
          <br />
          <input type="text" name="first_name" v-model="last_name" />
        </div>
        <div class="form-group text-left">
          <label for="password">PASSWORD</label>
          <br />
          <input type="password" v-model="password" />
        </div>
        <div class="form-group text-left">
          <label for="password">RE:PASSWORD</label>
          <br />
          <input type="password" v-model="re_password" />
        </div>
        <button class="btn mx-auto my-4">SIGN UP</button>
        <p>
          Already have an Account?
          <router-link id="link" to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      username: null,
      first_name: null,
      last_name: null,
      password: null,
      re_password: null,
    };
  },
  methods: {
    signup() {
      var postData = {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        re_password: this.re_password,
      };
      if (this.username != null && this.password != null) {
        axios
          .post("https://ayion-app.herokuapp.com/api/users/", postData)
          .then(() => {
            var loginData = {
              username: this.username,
              password: this.password,
            };
            axios
              .post("https://ayion-app.herokuapp.com/auth/", loginData)
              .then((response) => {
                localStorage.setItem("user-token", response.data.token);
                response = null;
                this.$router.push(this.$route.query.redirect || "/");
              })
              .catch((error) => {
                console.log("Authentication failed" + error);
                window.alert("Wrong details please try again");
              });
          })
          .catch((error) => {
            console.log("Signup failed" + error);
            window.alert("Server Error please try again");
          });
      } else {
        window.alert("Put in some details there first my guy");
      }
    },
  },
};
</script>

<style scoped>
.signup {
  background-color: #989898;
  height: 100vh;
}

.centered {
  position: absolute;
  width: 400px;
  height: 500px;
  top: 50%;
  left: 50%;
  margin-top: -380px;
  margin-left: -200px;
}

input {
  border: none;
  border-bottom: 1px black solid;
  text-emphasis: none;
  box-shadow: none;
  width: 100%;
}

label {
  text-align: left;
  font-size: 13px;
  font-weight: 500;
}

form {
  background-color: #ffffff;
  padding: 60px 50px;
}

img {
  height: 120px;
}

button {
  border: 2px #000000 solid;
  border-radius: 37px;
  color: #000000;
  font-weight: 500;
  padding: 5px 20px;
}

button:hover {
  background-color: #000000;
  color: #ffffff;
}

p {
  font-weight: 500;
}

#link {
  color: #cc0000;
  text-decoration: none;
}

::placeholder {
  font-weight: 500;
}
</style>
