<template>
    UserGroup
</template>

<script>
export default {
    name: "UserGroup",
    beforeRouteUpdate(to, from, next){


        console.log('UserGroup beforeRouteUpdate:', to);

        next();
    },
    beforeRouteEnter(to, from, next){
        console.log('UserGroup beforeRouteEnter:', to);
        next();

    },
    beforeRouteLeave(to, from, next){
        console.log('UserGroup beforeRouteLeave:', to);
        next();

    },
}
</script>

<style scoped>

</style>