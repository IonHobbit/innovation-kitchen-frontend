<template>
  <div class="col-12">
    <div class="col-6 mx-auto">
      <h1 v-if="answers.length > 0">Answers to {{ question.title }}</h1>
      <div class="answers" v-for="answer in answers" v-bind:key="answer.id">
        <h3>{{ answer.answer }}</h3>
        <hr />
        <h6>{{ answer.author }}</h6>
        <p>{{ answer.votes }}</p>
      </div>
    </div>
    <div class="col-6 mx-auto">
      <h1>Your Answer</h1>
      <form v-on:submit.prevent="addAnswer">
        <div class="form-group">
          <textarea name cols="30" rows="5" v-model="answer"></textarea>
        </div>
        <button class="btn btn-primary btn-xl mx-auto">Post Your Answer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { TokenService } from "@/storage/service.js";

export default {
  name: "Answers",
  props: {
    answers: Array,
    question: Object,
  },
  data() {
    return {
      answer: null,
    };
  },
  created() {},
  methods: {
    addAnswer() {
      var postData = {
        answer: this.answer,
        question: this.question.id,
        author: this.$parent.user.username,
      };
      this.token = TokenService.getToken();
      let axiosAuth = {
        headers: {
          Authorization: "Token " + this.token,
        },
      };
      console.log(postData);
      console.log(axiosAuth);
      if (this.$parent.token != null) {
        axios
          .post(
            "https://ayion-app.herokuapp.com/api/answers/",
            postData,
            axiosAuth
          )
          .then((response) => {
            let newAnswer = {
              id: response.data.id,
              answer: this.answer,
              question: this.question,
              votes: 0,
              author: this.$parent.user.username,
            };

            this.answers.unshift(newAnswer);

            this.answer = null;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        window.alert("Please log in first");
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.questions {
  border: black 2px solid;
}
</style>
