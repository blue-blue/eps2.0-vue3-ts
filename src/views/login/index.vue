<template>
  <div></div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import server from '../../api/index'
export default {
  setup () {
    const state = reactive({
      count: 0
    })

    return {
      ...toRefs(state)
    }
  },
  onMounted (() => {
    server.login.sildes()
  })
}
</script>

<style lang="scss" scoped></style>
