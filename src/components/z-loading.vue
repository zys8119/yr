<template>
    <div :class="`z-loading theme-${theme}`" v-if="show">
        <div v-if="type == 'line-scale-pulse-out'" class="line-scale-pulse-out">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p v-if="text" class="text" v-html="text"></p>
        </div>
        <div v-if="type == 'ball-pulse'" class="ball-pulse">
            <div></div>
            <div></div>
            <div></div>
            <p v-if="text" class="text" v-html="text"></p>
        </div>
        <div v-if="type == 'run-loader'" class="run-loader">
        </div>
        <div v-if="type == 'spinner'" class="spinner"></div>
        <div v-if="type == 'line-spin-fade-loader'" class="line-spin-fade-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div v-if="type == 'ball-scale'" class="ball-scale">
            <div></div>
        </div>
        <div v-if="type == 'bg-rotate-loader'" class="bg-rotate-loader"></div>
        <div v-if="type == 'boxLoading'" class="boxLoading"></div>
    </div>
</template>

<script>
    export default {
        name: "z-loading",
        data(){
            return{
            }
        },
        model: {
            prop: 'show',
            event: 'change'
        },
        props:{
            show:{
                type:Boolean,
                default:false,
            },
            text:{
                type:String,
                default:null,
            },
            theme:{
                type:String,
                default:null,
            },
            type:{
                type:String,
                default:'line-scale-pulse-out',
            },
        },
    }
</script>

<style scoped lang="less">
@import "../assets/css/color";
.z-loading{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
    text-align: center;
    background-color: @cor_ffffff;
    background-color: rgba(255,255,255,0.95);
    &.theme-black{
        background-color: @cor_000000;
        background-color: rgba(0,0,0,0.85);
        .text{
            color: @cor_ffffff;
        }
    }
    &.theme-fff{
        background-color: @cor_ffffff;
        background-color: rgba(255,255,255,0.95);
        .text{
            color: @cor_000000;
        }
    }
    &.theme-transparent{
        background-color: transparent;
    }
    .line-scale-pulse-out {
        transform: scale(1);
        position: relative;
        top: 40%;
    }
    .line-scale-pulse-out > div {
        background-color: @theme-color;
        width: 4px;
        height: 35px;
        border-radius: 2px;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        -webkit-animation: line-scale-pulse-out 0.9s -0.60s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
        animation: line-scale-pulse-out 0.9s -0.60s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    }
    .line-scale-pulse-out > div:nth-child(2), .line-scale-pulse-out > div:nth-child(4) {
        -webkit-animation-delay: -0.4s !important;
        animation-delay: -0.4s !important;
    }
    .line-scale-pulse-out > div:nth-child(1), .line-scale-pulse-out > div:nth-child(5) {
        -webkit-animation-delay: -0.2s !important;
        animation-delay: -0.2s !important;
    }

    @-webkit-keyframes line-scale-pulse-out {
        0% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
        50% {
            -webkit-transform: scaley(0.4);
            transform: scaley(0.4);
        }
        100% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
    }
    @keyframes line-scale-pulse-out {
        0% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
        50% {
            -webkit-transform: scaley(0.4);
            transform: scaley(0.4);
        }
        100% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
    }
    .ball-pulse {
        transform: scale(1);
        .line-scale-pulse-out;
    }

    .ball-pulse > div:nth-child(1) {
        -webkit-animation: ball-pulse-scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        animation: ball-pulse-scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div:nth-child(2) {
        -webkit-animation: ball-pulse-scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        animation: ball-pulse-scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div:nth-child(3) {
        -webkit-animation: ball-pulse-scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        animation: ball-pulse-scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .ball-pulse > div {
        background-color: #0FB560;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
    }

    @keyframes ball-pulse-scale {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
        45% {
            -webkit-transform: scale(0.1);
            transform: scale(0.1);
            opacity: 0.7;
        }
        80% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }
    .run-loader {
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        border: 5px solid #4A9EB1;
        border-right-color: transparent;
        border-radius: 50%;
        animation: loader-rotate 1s linear infinite;
        position: relative;
        top: 40%;
        left: 50%;
        margin-left: -25px;
    }

    @keyframes loader-rotate {
        0% {
            transform: rotate(0); }
        100% {
            transform: rotate(360deg); } }

    .spinner {
        width: 50px;
        height: 50px;
        background-color: #561BB9;
        -webkit-animation: rotateplane 1.5s infinite ease-in-out;
        animation: rotateplane 1.5s infinite ease-in-out;
        .line-scale-pulse-out;
        left: 50%;
        margin-left: -25px;
    }

    @-webkit-keyframes rotateplane {
        0% { -webkit-transform: perspective(120px) }
        50% { -webkit-transform: perspective(120px) rotateY(180deg) }
        100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
    }

    @keyframes rotateplane {
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
        } 50% {
              transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
              -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
          } 100% {
                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
                -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            }
    }
    .line-spin-fade-loader {
        position: relative;
        top: -10px;
        transform: scale(1);
        .line-scale-pulse-out;
        left: 50%;
    }

    .line-spin-fade-loader > div:nth-child(1) {
        top: 20px;
        left: 0;
        -webkit-animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(2) {
        top: 13.63636px;
        left: 13.63636px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(3) {
        top: 0;
        left: 20px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        -webkit-animation: line-spin-fade-loader 1.2s -0.60s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.60s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(4) {
        top: -13.63636px;
        left: 13.63636px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(5) {
        top: -20px;
        left: 0;
        -webkit-animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(6) {
        top: -13.63636px;
        left: -13.63636px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(7) {
        top: 0;
        left: -20px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        -webkit-animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
    }

    .line-spin-fade-loader > div:nth-child(8) {
        top: 13.63636px;
        left: -13.63636px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
    }

    .line-spin-fade-loader > div {
        background-color: #1487FF;
        width: 4px;
        height: 35px;
        border-radius: 2px;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        width: 5px;
        height: 15px;
    }

    @-webkit-keyframes line-spin-fade-loader {
        50% {
            opacity: 0.3;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes line-spin-fade-loader {
        50% {
            opacity: 0.3;
        }

        100% {
            opacity: 1;
        }
    }
    .bg-rotate-loader {
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        border: 5px solid #B8D0FA;
        border-top-color: #0052EC;
        border-radius: 50%;
        animation: loader-rotate 1s linear infinite;
        .line-scale-pulse-out;
        left: 50%;
        margin-left: -25px;
    }

    @keyframes bg-loader-rotate {
        0% {
            transform: rotate(0); }
        100% {
            transform: rotate(360deg); } }
    .ball-scale {
        transform: scale(1);
        .line-scale-pulse-out;
    }
    .ball-scale > div {
        background-color: #1487FF;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        height: 60px;
        width: 60px;
        -webkit-animation: ball-scale 1s 0s ease-in-out infinite;
        animation: ball-scale 1s 0s ease-in-out infinite;
    }

    @keyframes ball-scale {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
    .boxLoading {
        width: 50px;
        height: 50px;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .boxLoading:before {
        content: '';
        width: 50px;
        height: 5px;
        background: #000;
        opacity: 0.1;
        position: absolute;
        top: 59px;
        left: 0;
        border-radius: 50%;
        animation: box-loading-shadow 0.5s linear infinite;
    }
    .boxLoading:after {
        content: '';
        width: 50px;
        height: 50px;
        background: #1A6844;
        animation: box-loading-animate 0.5s linear infinite;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 3px;
    }

    @keyframes box-loading-animate {
        17% {
            border-bottom-right-radius: 3px;
        }
        25% {
            transform: translateY(9px) rotate(22.5deg);
        }
        50% {
            transform: translateY(18px) scale(1, .9) rotate(45deg);
            border-bottom-right-radius: 40px;
        }
        75% {
            transform: translateY(9px) rotate(67.5deg);
        }
        100% {
            transform: translateY(0) rotate(90deg);
        }
    }

    @keyframes box-loading-shadow {
        0%, 100% {
            transform: scale(1, 1);
        }
        50% {
            transform: scale(1.2, 1);
        }
    }

}
</style>