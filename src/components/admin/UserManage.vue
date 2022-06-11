<template>
    UserManage
</template>

<script>
export default {
    name: "UserManage",
    beforeRouteUpdate(to, from, next){


        console.log('UserManage beforeRouteUpdate:', to);

        next();
    },
    beforeRouteEnter(to, from, next){
        console.log('UserManage beforeRouteEnter:', to);
        next();

    },
    beforeRouteLeave(to, from, next){
        console.log('UserManage beforeRouteLeave:', to);
        next();

    },
}
</script>

<style scoped>

</style>