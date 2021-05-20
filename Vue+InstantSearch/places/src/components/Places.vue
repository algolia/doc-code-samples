<template>
  <!-- container for places.js -->
  <div class="search">
    <h1>Where did you forget it?</h1>
  </div>
</template>

<script>
import places from "places.js";

export default {
  props: {
    apiKey: {
      type: String,
      required: false
    },
    appId: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  data() {
    return { instance: null };
  },
  mounted() {
    // make sure Vue does not know about the input
    // this way it can properly unmount
    this.input = document.createElement("input");
    this.$el.appendChild(this.input);

    this.instance = places({
      apiKey: this.apiKey,
      appId: this.appId,
      type: this.type,
      container: this.input
    });

    this.instance.on("change", e => {
      this.$emit("change", e);
    });
  },
  beforeDestroy() {
    this.instance.off("change");
    this.instance.destroy();
  },
  watch: {
    type(newVal) {
      this.instance.configure({
        type: newVal
      });
    }
  }
};
</script>
<style scoped>
.search {
  position: absolute;
  margin-left: 450px;
  width: 500px;
  height: 50px;
  top: 270px;
  font-size: 20px;
  border-radius: 10px;
}

.search h1 {
  color: black;
  margin-left: 100px;
  top: 200px;
  font-size: 30px;
}
</style>
