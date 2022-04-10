<template>
  <div>
    <div id="theater-header">
      <button>&laquo; &laquo;Previous</button>

      <h2>Be A Programmer</h2>
      <button>Next &raquo; &raquo;</button>
    </div>
    <div class="theater">
      <div id="theater-body">
        <Nuxt />
      </div>
      <div class="videolist">
        <ChaptersList />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.theater {
  display: flex;
}

#theater-body {
  background-color: black;
  color: white;
  width: 80vw;
  height: 80vh;
  background: rgb(156, 156, 168);
}
#theater-header {
  background-color: #292928;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  position: -webkit-sticky;
  position: sticky;
}
button {
  color: white;
  border: 2px solid;
  border-radius: 30px;
  padding: 5px;
  margin: 5px;
  font-size: 30px;
}

button:hover {
  opacity: 0.7;
}
.videolist {
  background: grey;
  width: 20vw;
  height: 80vh;
}
</style>
<script>
</script>
