<template>
   <input :value="value" type="text" @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
   name: "comp-4",
   props: {
      value: String
   },
   mounted() {
      
   }
}
</script>