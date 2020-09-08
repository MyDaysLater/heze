<template>
  <div id="userLayout-wrapper">
    <div class="container">
      <div class="top">LogIn</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
#userLayout-wrapper{
  height:100%;
  .clientControl{
    position: fixed;
    top: 20px;
    left: 20px;
  }
  .container{
    min-height:100%;
    padding: 140px 0;
    background-color: #021529;
    box-sizing: border-box;
    .top{
      color:#fff;
      font-size: 50px;
      letter-spacing: 10px;
      text-align: center;
      margin-bottom:40px;
      font-weight: bolder;
    }
  }
}
</style>
