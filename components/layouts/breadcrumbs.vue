<template>
    <div class="breadcrumbs h-30v">
      <ul>
        <li>
          {{$t('home')}}
        </li>
        <li>
          {{$t('shop')}}
        </li>
      </ul>
    </div>
</template>

<style scoped>
.breadcrumbs{
  background-image: url("http://ecommerce.elnozom.com/img/breadcrumb-min.jpg");
  background-position:top  center;
  background-size: cover;
  display: flex;
  align-items: center;
  position: relative;
}
.breadcrumbs::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
  width: 100%;
  height: 100%;
}
ul{
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
  list-style: none;
  color : #fff
}
ul li:not(:first-child)::before{
  content : ">";
  margin: 0 10px;
}
</style>