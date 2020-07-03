<template>
  <div class="second">
    <!--<h1>Where did you forget it?</h1>
    <form>
      <input type="text">
    </form>-->
    <p>
      <b>Made with love ❤️</b>
    </p>
    <button type="button" class="btn btn-danger btn-lg btn-block">Check if item is found</button>
  </div>
</template>


<script>
export default {
  name: "Box"
};
</script>

<style scoped>
.second h1 {
  color: black;
  margin-left: 520px;
  margin-top: 100px;
}

.second p {
  top: 10px;
  position: absolute;
  color: black;
  font-size: 22px;
}

.second button {
  margin-left: 450px;
  width: 500px;
  margin-top: 230px;
  padding: 0.3em;
  font-size: 22px;
  color: white;
  background-color: indianred;
  border-radius: 9px;
  height: 40px;
}
</style>