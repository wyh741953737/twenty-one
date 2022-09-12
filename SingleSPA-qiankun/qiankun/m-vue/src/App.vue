<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    function getResult(arr) {
      let outResult=[]
      let a = arr
      for(let i = 0; i < a.length; i++) {
        if (a.length === 0) {
          outResult =  a[i].flat()
          console.log('--', outResult)
        } else{
            let emptyArray = []
            outResult.forEach(item=>{
              a[i].forEach(value=>{
                 console.log(item, value)
                  if(item !== value) {
                    emptyArray.push(item+value)
                  }
              })
            })
            outResult = emptyArray
        }
      }
      console.log(outResult)
      return outResult
    }
    getResult([["A1", "A2"],["B1", "B2"]])
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
