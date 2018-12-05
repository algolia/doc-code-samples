<template>
  <ais-menu :attribute="attribute">
    <select
      slot-scope="{ items, canRefine, refine }"
      @change="refine($event.currentTarget.value)"
      :disabled="!canRefine"
    >
      <option value=""> All </option>
      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :selected="item.isRefined"
      >
        {{ item.label }}
      </option>
    </select>
  </ais-menu>
</template>

<script>
export default {
  props: {
    attribute: {
      type: String,
      required: true,
    },
  },
};
</script>
