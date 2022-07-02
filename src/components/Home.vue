<template>
  <main class="h-screen border-box p-5">

    <div class="grid grid-cols-2 gap-10 h-full">
      <div class="w-full">
        <div class="grid-rows-1 w-full my-3">
          <label for="biggest_salary_value">First salary</label>
          <div class="grid grid-cols-3 gap-4 my-3">
            <div><input tabindex="1" v-model="first_salary.name" class="py-2 px-3 rounded w-full text-gray-900"
                placeholder="Person's name" type="text" /></div>
            <div class="col-span-2"><input @keypress="isNumber($event)" tabindex="3" v-model="first_salary.value"
                class="py-2 px-3 rounded w-full text-gray-900" placeholder="Value" /></div>
          </div>
        </div>

        <div class="grid-rows-1 w-full my-3">
          <label for="biggest_salary_value">Second salary</label>
          <div class="grid grid-cols-3 gap-4 my-3">
            <div><input tabindex="2" v-model="second_salary.name" class="py-2 px-3 rounded w-full text-gray-900"
                placeholder="Person's name" type="text" /></div>
            <div class="col-span-2"><input @keypress="isNumber($event)" tabindex="4" v-model="second_salary.value"
                class="py-2 px-3 rounded w-full text-gray-900" placeholder="Value" /></div>
          </div>
        </div>

        <div class="grid-rows-1 w-full mt-8">
          <label for="biggest_salary_value">Outflows</label>
          <div class="grid grid-cols-1 gap-4 my-3" v-for="outflowc in outflows_count">
            <div class="grid-row w-full">
              <div class="grid grid-cols-10 gap-4">
                <div class="col-span-7">
                  <input class="py-2 px-3 rounded w-full text-gray-900" placeholder="name"
                    v-model="outflows[outflowc - 1].name" />
                </div>
                <div class="col-span-2">
                  <input class="py-2 px-3 rounded w-full text-gray-900" placeholder="value"
                    v-model="outflows[outflowc - 1].value" />
                </div>
                <div class="flex justify-center items-center">
                  <button @click="removeOutflow(outflowc - 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="#963838" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end w-full my-8">
          <button class="rounded p-3 bg-gray-700" @click="increment_outflows()">Add</button>
        </div>
      </div>

      <div class="w-full border-dotted border-2 border-gray-800 p-5 rounded h-full overflow-auto">
        <div class="w-full mb-5 text-center">
          <h1>Results</h1>
        </div>
        <div>Higher salary: {{ reais(higher_salary.value) }} <span
            v-if="(higher_salary.name && higher_salary.value)">({{
                higher_salary.name
            }})</span></div>
        <div>Lower salary: {{ reais(lower_salary.value) }} <span v-if="(lower_salary.name && higher_salary.value)">({{
            lower_salary.name
        }})</span></div>

        <div class="my-4">Salaries sum: {{ reais(parseFloat(lower_salary.value) + parseFloat(higher_salary.value)) }}
        </div>

        <div v-if="higher_salary.value && higher_salary.name && lower_salary.value && lower_salary.name">
          Difference: {{ higher_salary.name }}'s salary is {{ higher_multiplier * 100 }}% bigger than
          {{ lower_salary.name }}'s
        </div>

        <div class="mt-10">
          <div class="grid-row">
            <div class="grid grid-cols-4">
              <div>Outflow name</div>
              <div class="text-right">Total</div>
              <div class="text-right">{{ higher_salary.name }}</div>
              <div class="text-right">{{ lower_salary.name }}</div>
            </div>
          </div>
          <div class="my-5 border-t border-gray-700 border-solid"></div>
          <div class="grid-row" v-for="outflow in outflows">
            <div class="grid grid-cols-4 mb-3" v-if="outflow.value && outflow.name">
              <div>{{ outflow.name }}</div>
              <div class="text-right">{{ reais(outflow.value) }}</div>
              <div class="text-right">{{ reais((parseFloat(outflow.value) / (1 + (parseFloat(higher_multiplier)) +
                  parseFloat(lower_multiplier))) * (1 + parseFloat(higher_multiplier)))
              }}</div>
              <div class="text-right">{{ reais((parseFloat(outflow.value) / (1 + (parseFloat(higher_multiplier)) +
                  parseFloat(lower_multiplier))) * parseFloat(lower_multiplier))
              }}</div>
            </div>
          </div>
          <div class="my-5 border-t border-gray-700 border-solid"></div>
          <div class="grid grid-cols-4">
            <div class="col-span-2 text-right">Total: </div>
            <div class="text-right">{{ higher_total ? reais(higher_total) : '' }}</div>
            <div class="text-right">{{ lower_total ? reais(lower_total) : '' }}</div>
          </div>
          <div class="grid grid-cols-4">
            <div class="col-span-2 text-right">Still remains: </div>
            <div class="text-right">{{ higher_remains ? reais(higher_remains) : '' }}</div>
            <div class="text-right">{{ lower_remains ? reais(lower_remains) : '' }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      higher_salary: {
        value: 0,
        name: null
      },
      lower_salary: {
        value: 0,
        name: null
      },
      first_salary: {
        value: 0,
        name: null
      },
      second_salary: {
        value: 0,
        name: null
      },
      outflows_count: 1,
      outflows: [
        {
          name: '',
          value: '',
        }
      ],
      lower_multiplier: 1,
      higher_multiplier: 1,
      higher_total: 0,
      lower_total: 0,
      higher_remains: 0,
      lower_remains: 0,
    }
  },
  methods: {
    increment_outflows() {
      this.outflows_count++;
    },
    calculateHigherAndLowerSalaries() {
      this.higher_salary = parseFloat(this.first_salary.value) > parseFloat(this.second_salary.value) ? this.first_salary : this.second_salary;
      this.lower_salary = parseFloat(this.first_salary.value) > parseFloat(this.second_salary.value) ? this.second_salary : this.first_salary;

      this.higher_multiplier = ((this.higher_salary.value / this.lower_salary.value) - 1).toFixed(4);
    },
    isNumber: function (evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    buildOutflows: function () {
      for (let index = 0; index < this.outflows_count; index++) {
        this.outflows.push({
          name: '',
          value: ''
        });
      }
    },
    reais(n) {
      n = parseFloat(n);
      return n.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },
    removeOutflow(index){
      if(index != 0){
        this.outflows.splice(index, 1)
      }
    }
  },
  watch: {
    first_salary: {
      handler() {
        this.calculateHigherAndLowerSalaries();
      },
      deep: true
    },
    second_salary: {
      handler() {
        this.calculateHigherAndLowerSalaries();
      },
      deep: true
    },
    outflows_count() {
      this.buildOutflows();
    },
    outflows: {
      handler(outflows) {
        let sum = 0;
        outflows.forEach(outflow => {
          if (parseFloat(outflow.value)) {
            sum += parseFloat(outflow.value);
          }
        })

        this.higher_total = (parseFloat(sum) / (1 + (parseFloat(this.higher_multiplier)) + parseFloat(this.lower_multiplier))) * (1 + parseFloat(this.higher_multiplier))

        this.lower_total = (parseFloat(sum) / (1 + (parseFloat(this.higher_multiplier)) + parseFloat(this.lower_multiplier))) * parseFloat(this.lower_multiplier)

        this.higher_remains = parseFloat(this.higher_salary.value) - this.higher_total;
        this.lower_remains = parseFloat(this.lower_salary.value) - this.lower_total;
      },
      deep: true
    }
  },
}
</script>

<style scoped>
input:focus {
  outline: none;
}

body {
  overflow: hidden;
}

header h1 {
  font-size: 2rem;
}

main {
  font-size: 1rem;
}
</style>
