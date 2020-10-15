<template>
  <div class="container-fluid" id="community" v-if="user">
    <div class="row">
      <div class="col-6 mx-auto">
        <form v-on:submit.prevent="addQuestion">
          <h2>Ask a Question</h2>
          <div class="form-group">
            <label for="title">Title</label>
            <br />
            <input type="text" name="title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <br />
            <textarea name cols="30" rows="5" v-model="description"></textarea>
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <select v-model="tags">
              <option value="Technology">Technology</option>
              <option value="Art">Art</option>
              <option value="STEM">STEM</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <button class="btn btn-primary btn-xl mx-auto">ASK</button>
        </form>
      </div>
      <div class="col-6 mx-auto">
        <h2>Community Questions</h2>
        <div
          class="questions"
          v-for="question in questions"
          v-bind:key="question.id"
          @click.prevent="getAnswers(question)"
        >
          <h3>{{ question.title }}</h3>
          <hr />
          <h6>{{ question.author }}</h6>
          <h6>{{ question.tags }}</h6>
          <p>{{ question.description }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <Answers v-bind:answers="answers" v-bind:question="activeQuestion" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Answers from "@/components/Answers.vue";

export default {
  name: "Commmunity",
  props: {
    user: {},
  },
  components: {
    Answers,
  },
  data() {
    return {
      questions: [],
      answers: [],
      activeQuestion: {},
      title: null,
      description: null,
      tags: null,
    };
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    getQuestions(axiosAuth) {
      axios
        .get("https://ayion-app.herokuapp.com/api/questions/", axiosAuth)
        .then((response) => {
          this.questions = response.data;
          this.questions.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addQuestion(axiosAuth) {
      var postData = {
        title: this.title,
        description: this.description,
        tags: this.tags,
        author: this.user.username,
      };
      if (this.token != null) {
        axios
          .post(
            "https://ayion-app.herokuapp.com/api/questions/",
            postData,
            axiosAuth
          )
          .then((response) => {
            let newQuestion = {
              id: response.data.id,
              title: this.title,
              description: this.description,
              tags: this.tags,
              author: this.user.username,
            };

            this.questions.unshift(newQuestion);

            (this.title = null), (this.description = null), (this.tags = null);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        window.alert("Please log in first");
      }
    },
    getAnswers: function (message, axiosAuth) {
      this.activeQuestion = message;
      axios
        .get("https://ayion-app.herokuapp.com/api/answers/", axiosAuth)
        .then((response) => {
          if (message.id != null) {
            var answerlist = {};
            var prelist = [];
            (answerlist = response.data),
              answerlist.forEach((answer) => {
                if (answer.question == message.id) {
                  prelist.push(answer);
                }
              });
            this.answers = prelist;
            response.data = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#community {
  margin-top: 50px;
}
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
