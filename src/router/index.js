import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/utils.js'
Vue.use(Router)
export default new Router({
    routes: [
        // { path: '/', redirect: 'Register'},
        // todo Dome
        utils.importVueInit('Dome/Dome','/Dome','Dome'),
        // todo 登陆
        utils.importVueInit('Login/Login','/Login','登录',{
            meta:{
                footerShow:false,
                headerShow:false,
                menuName:'Login'
            }
        }),
        utils.importVueInit({
            name: 'Layout/Layout',
            path: '/',
            component: require("@/views/Layout/Layout.vue").default,
            redirect: '/Home',
            children: [
                //todo 引导页
                utils.importVueInit('GuidePage/GuidePage','/GuidePage','引导页',{
                    meta:{
                        headerShow:false,
                        footerShow:false,
                        right:'',
                        left:'',
                        bodyColor:"#fff",
                        menuName:"GuidePage"
                    }
                }),
                // todo 注册
                utils.importVueInit('Login/Register','/Register','注册',{
                    meta:{
                        type:'3',
                        footerShow:false,
                    }
                }),
                // todo 忘记密码
                utils.importVueInit('Login/ForgetPwd','/ForgetPwd','重置密码',{
                    meta:{
                        type:'3',
                        footerShow:false,
                    }
                }),
                // todo 账号申诉
                utils.importVueInit('Login/AccountAppeal','/AccountAppeal','账号申诉',{
                    meta:{
                        type:'3',
                        footerShow:false,
                    }
                }),
                // todo 首页
                utils.importVueInit('Home/Home','/Home','首页',{
                    meta:{
                        type:'5',
                        left:'&#xe7bb;',
                        menuName:'Home'
                    }
                }),
                // todo 分享
                utils.importVueInit('Share/index','/Share','分享',{
                    meta:{
                        left:'',
                        right:'',
                        menuName:'Share'
                    }
                }),
                // todo 分享二维码图片
                utils.importVueInit('Share/qrCode','/qrCode','分享二维吗',{
                    meta:{
                        right:'保存',
                        footerShow:false,
                    }
                }),
                // todo 朋友圈
                utils.importVueInit('Share/Friendster','/Friendster','朋友圈',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 消息列表
                utils.importVueInit('Message/Message','/Message','消息列表',{
                    meta:{
                        left:'',
                        right:'',
                        menuName:'Message',
                    }
                }),
                //todo 消息详情
                utils.importVueInit('Message/MessageDetails','/MessageDetails','消息详情',{
                    meta:{
                        footerShow:false,
                        right:'',
                    }
                }),
                //todo 个人中心
                utils.importVueInit('User/User','/User','个人中心',{
                    meta:{
                        left:'',
                        right:'&#xe6d6;',
                        menuName:'User'
                    }
                }),
                //todo 设置
                utils.importVueInit('User/Sz','/Sz','设置',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 修改密码
                utils.importVueInit('User/Xgmm','/Xgmm','修改密码',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 关于
                utils.importVueInit('User/About','/About','关于',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 我的资料
                utils.importVueInit('User/Xgzl','/Xgzl','我的资料',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 我的钱包
                utils.importVueInit('User/MyWallet','/MyWallet','我的钱包',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 提现
                utils.importVueInit('User/Withdraw','/Withdraw','提现',{
                    meta:{
                        right:'&#xe60b;',
                        footerShow:false,
                    }
                }),
                //todo 收款绑定账号
                utils.importVueInit('User/BindAccount','/BindAccount','收款绑定账号',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 代理升级
                utils.importVueInit('User/AgentUpgrade','/AgentUpgrade','订购产品',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 我的通讯录
                utils.importVueInit('User/MyContacts','/MyContacts','我的通讯录',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 提现记录
                utils.importVueInit('User/WithdrawalRecord','/WithdrawalRecord','提现记录',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 收入明细
                utils.importVueInit('User/IncomeDetailsList','/IncomeDetailsList','收入明细',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 收入明细详情
                utils.importVueInit('User/IncomeDetails','/IncomeDetails','收入明细详情',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 蚂蚁地推
                utils.importVueInit('User/AntPush','/AntPush','蚂蚁地推',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 推广详情页
                utils.importVueInit('User/AntPushDetails','/AntPushDetails','推广详情页',{
                    meta:{
                        right:'',
                        footerShow:false,
                    }
                }),
                //todo 推广二维码
                utils.importVueInit('User/pushQrCode','/pushQrCode','推广二维码',{
                    meta:{
                        right:'保存',
                        footerShow:false,
                    }
                }),
                //todo 贷款超市
                utils.importVueInit('User/AntPushShop','/AntPushShop','贷款超市',{
                    meta:{
                        right:'',
                        footerShow:false,
                        left:'',
                        menuName:'AntPushShop'
                    }
                }),
                //todo 文档详情
                utils.importVueInit('Message/DocDetails','/DocDetails','文档详情',{
                    meta:{
                        footerShow:false,
                        right:'',
                    }
                }),
                //todo 申请详情
                utils.importVueInit('ApplicationDetails/index','/ApplicationDetails','申请详情',{
                    meta:{
                        headerShow:false,
                        footerShow:false,
                        right:'',
                        left:'',
                        bodyColor:"#fff"
                    }
                }),

                // //todo 房源管理
                // utils.importVueInit('Housing/HousingResource','/HousingResource','房源管理',{
                //     meta:{
                //         right:'新增房源',
                //         rightSpan:'100',
                //         leftSpan:'100',
                //         footerShow:false,
                //         menuName:'HousingResource',
                //     }
                // }),
                // //todo 房源搜索
                // utils.importVueInit('Housing/HousingSearch','/HousingSearch','房源搜索',{
                //     meta:{
                //         menuName:'HousingSearch',
                //         type:'4',
                //         left:''
                //     }
                // }),
                // //todo 房源详情
                // utils.importVueInit('Housing/HousingDetails','/HousingDetails','房源详情',{
                //     meta:{
                //         type:'2',
                //         footerShow:false,
                //         titleShowType:true,
                //         menuName:'HousingDetails',
                //     }
                // }),
                // //todo 房源修改
                // utils.importVueInit('Housing/HousingEditor','/HousingEditor','房源修改',{
                //     meta:{
                //         footerShow:false,
                //         right:'',
                //     }
                // }),
                // //todo 申请入驻
                // utils.importVueInit('Housing/ApplyEntering','/ApplyEntering','申请入驻',{
                //     meta:{
                //         footerShow:false,
                //         right:''
                //     }
                // }),
                // //todo 新增房源
                // utils.importVueInit('Housing/HousingAddFocus','/HousingAddFocus','新增房源',{
                //     meta:{
                //         footerShow:false,
                //         right:'',
                //     }
                // }),
                // //todo 新增独立房源
                // utils.importVueInit('Housing/HousingAddScatter','/HousingAddScatter','新增独立房源',{
                //     meta:{
                //         footerShow:false,
                //         right:'',
                //     }
                // }),
                // //todo 预约详情
                // utils.importVueInit('Message/BookingDetails','/BookingDetails','预约查看',{
                //     meta:{
                //         footerShow:false,
                //         type:'2',
                //         right:''
                //     }
                // }),
                // //收租
                // utils.importVueInit('Rents/Rents','/Rents','收租',{
                //     meta:{
                //         menuName:'Rents',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('Rents/Wdzj','/Wdzj','我的租金',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('Rents/Tx','/Tx','提现',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Wxxq','/Wxxq','维修详情',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Wxsq','/Wxsq','维修申请',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Jsgl','/Jsgl','角色管理',{
                //     meta:{
                //         right:'&#xe6b9;',
                //         rightFontSize:20,
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Addjs','/Addjs','添加角色',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Zhgl','/Zhgl','租户管理',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Wxgl','/Wxgl','维修管理',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //         menuName:"Wxgl"
                //     }
                // }),
                // utils.importVueInit('User/Wdyy','/Wdyy','我的预约',{
                //     meta:{
                //         right:"&#xe60f;",
                //         rightFontSize:20,
                //         footerShow:false,
                //         menuName:"Wdyy"
                //     }
                // }),
                // utils.importVueInit('User/Yysq','/Yysq','预约申请',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Yyxq','/Yyxq','预约详情',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Wdyhk','/Wdyhk','我的银行卡',{
                //     meta:{
                //         right:'&#xe6b9;',
                //         rightFontSize:20,
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Addyhk','/Addyhk','添加银行卡',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Wdsc','/Wdsc','我的收藏',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Jd','/Jd','租房借贷',{
                //     meta:{
                //         right:'&#xe61f;',
                //         rightFontSize:20,
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Edsz','/Edsz','额度设置',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
                // utils.importVueInit('User/Jq','/Jq','借钱',{
                //     meta:{
                //         right:'',
                //         footerShow:false,
                //     }
                // }),
            ]
        }),
    ]
})
