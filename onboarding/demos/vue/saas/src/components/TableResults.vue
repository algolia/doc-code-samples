<template>
  <div>
    <div
      v-for="{distinctAttribute, results} in distinctResults"
      :key="distinctAttribute"
      class="hit"
    >
      <h2>{{distinctAttribute}}</h2>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th
                v-for="key in Object.keys(results[0])"
                v-if="showKey({key, distinctAttribute})"
                :key="key"
              >
                {{key}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results" :key="result.objectID">
              <td
                v-for="[key, value] in Object.entries(result)"
                v-if="showKey({key, value, distinctAttribute})"
                :key="key"
              >
                <ais-highlight
                  :attribute-name="key"
                  :result="result"
                  v-if="result._highlightResult[key]"
                />
                <span v-else>{{ value }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Component } from 'vue-instantsearch'

export default {
  props: {
    attributeForDistinct: {
      type: String,
      required: true
    }
  },
  mixins: [Component],
  computed: {
    distinctResults() {
      return this.searchStore.results.reduce((acc, curr) => {
        // each result will have a distinct sequence id
        // if it is 0, it means we start a new category
        if (curr._distinctSeqID === 0) {
          // a category is defined by the attribute used for distinct
          acc.push({
            distinctAttribute: curr[this.attributeForDistinct],
            // and will have an array of results to be able to loop over
            results: [curr]
          });
        } else {
          // if it's not the first distinct sequence, we need to add it to the last results
          acc[acc.length - 1].results.push(curr);
        }
        return acc;
      }, []);
    }
  },
  methods: {
    showKey({ key, distinctAttribute }) {
      if (key[0] === '_') {
        return false;
      }
      if (key === 'objectID') {
        return false;
      }
      const shownAttributes = {
        Opportunity: [
          'Name',
          'Account',
          'Owner',
          'CloseDate',
          'StageName',
          'Amount'
        ],
        Account: ['Name', 'Website', 'Owner'],
        Contact: ['Name', 'Account', 'Email'],
        Lead: ['Name', 'Email', 'Owner']
      };
      const attributesToShow = shownAttributes[distinctAttribute];
      return attributesToShow ? attributesToShow.indexOf(key) > -1 : true;
    }
  }
};
</script>

<style>
.hit {
  margin-bottom: 24px;
  overflow: hidden;
}

.hit h2 {
  margin: 16px 16px 8px;
  font-size: inherit;
  font-weight: bolder;
}

.hit .table-responsive {
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
}

.hit .table-responsive th,
.hit .table-responsive td {
  white-space: nowrap;
}

.hit table {
  width: 100%;
  border-collapse: collapse;
}

.hit table em {
  font-style: normal;
  font-weight: bold;
}

.hit table th,
.hit table td {
  padding: 8px 16px;
}

.hit table th {
  color: #999;
  text-align: left;
  font-weight: normal;
}

.hit tbody tr:nth-child(odd) {
  background: #f5f5fa;
}
</style>
