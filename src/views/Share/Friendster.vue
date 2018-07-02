<template>
<div class="Friendster">
    <z-friendster-card v-for="i in 3" :key="i"></z-friendster-card>
</div>
</template>

<script>
    import { ZFriendsterCard } from '@/components'
    export default {
        name: "friendster",
        components: { ZFriendsterCard },
    }
</script>
