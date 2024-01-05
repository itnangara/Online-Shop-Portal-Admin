<template>
<div style="margin-bottom:-60px" class="navBar">
    <div class="navBarContent">
        <router-link style="border-color: transparent;" to="/employees">
          <h4>Employee Management System</h4>
        </router-link>

        <div class="linksWrapper">
            <div class="linkButton">
                <router-link to="/employees">All Employees</router-link>
            </div>

            <div class="linkButton">
                <router-link to="/departments">Departments</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import ButtonComponent from '../ui-elements/ButtonComponent.vue';
export default {
    components: {
        // ButtonComponent
    }
}
</script>

<style scoped>
.navBar {
    background-color: #3d008d;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
}
  
.navBarContent {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-top: 15px;  
}

.navBarContent a {
    /* removing underlines on links */
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    
    /* creating space between buttons and removing hovering effects */
    margin: 0 0.5rem;
}
.navBarContent a:hover {
    /* removing underlines on links */
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    border: 1px solid #f391e3;
}

/* removing "find a coach" from showing box when hovered/active */
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
border-color: transparent;
margin: 0 0.5rem;
}

h1 {
    margin: 0;
    font-size: 20pt;
    color: aliceblue;
    margin: 0;
}

/* .linkWrapper{} */
.link {
    margin: 0 0.5rem;
    display: inline-block;
}

li {
    margin: 0 0.5rem;
}

.navBarContent a {
    /* removing underlines on links */
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
}

/* showing a pink box on all header links when hovered/active */
a:active,
a:hover,
a.router-link-active {
    border: 1px solid #f391e3;
}

/* removing "find a coach" from showing box when hovered/active */
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
    border-color: transparent;
}

.navBarContent ul {
    /* list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center; */
}

li {
    margin: 0 0.5rem;
}

/* ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>
