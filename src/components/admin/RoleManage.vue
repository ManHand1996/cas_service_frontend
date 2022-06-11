<template>
    RoleManage
</template>

<script>
export default {
    name: "RoleManage",
    beforeRouteUpdate(to, from, next){
        console.log('RoleManage beforeRouteUpdate:', to);

        next();
    },
    beforeRouteEnter(to, from, next){
        console.log('RoleManage beforeRouteEnter:', to);
        next();

    },
    beforeRouteLeave(to, from, next){
        console.log('RoleManage beforeRouteLeave:', to);
        next();

    },
}
</script>

<style scoped>

</style>