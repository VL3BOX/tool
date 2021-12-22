<template>
    <div class="m-single-side">
        <div id="directory" class="m-single-directory"></div>
    </div>
</template>

<script>
export default {
    name: "single_side",
    props: ['id'],
    data: function() {
        return {
        };
    },
    components : {
    }
};
</script>

<style lang="less">
.m-single-side {
    padding: 20px;
}
.m-single-directory {
    .mb(20px);
}
</style>
