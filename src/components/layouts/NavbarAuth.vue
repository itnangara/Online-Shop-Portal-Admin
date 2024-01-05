<template>
    <div class="navbar">
        <div class="links">
            <router-link to="/">
                Login                
            </router-link>
            <router-link to="/">
                <base-button style="padding:0.3rem;" class="btn">Sign Up</base-button>                
            </router-link>
        </div>
    </div>
</template>

<script>

</script>

<style>
.navbar{
    height: 30px;
    width: 100%;
    background-color: blueviolet;
    justify-content: space-between;
}
</style>