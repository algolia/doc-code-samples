<template>
  <div class="hello">
    <h1>What did you forget?</h1>
    <form>
      <input type="text">
    </form>
  </div>
</template>



<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello h1 {
  color: black;
  margin-left: 540px;
  margin-top: 100px;
}
.hello form input {
  margin-left: 450px;
  width: 500px;
  height: 50px;
  margin-top: 10px;
  font-size: 20px;
  border-radius: 10px;
  background-color: whitesmoke;
}
</style>
