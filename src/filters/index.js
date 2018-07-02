import { dateFormat, ChinaAddressV4Data } from  "vux"
import { HousingPayinfo } from  "@/data/index.json"
module.exports = {
    dateFormat(val,str,bool){
        if(bool){
            var d = new Date();
            d.setTime(val);
            return dateFormat(d,str);
        }
        return dateFormat(d,str);
    },
    HousingCard_price(val,type = ''){
        if(val){
            return val + type;
        }
        return '--'
    },
    HousingCard_lable(val){
        switch (val){
            case "合租":
                return 'color1';
                break;
            case '整租':
                return 'color2';
                break;
            default:
                return 'default';
                break;
        }
    },
    HousingMode(val){
        switch (val){
            case "1":
                return '合租';
                break;
            case '0':
                return '整租';
                break;
        }
    },
    payinfo(val){
        const Payinfo = _.find(HousingPayinfo,{value:val});
        if(Payinfo && Payinfo.name){
            return Payinfo.name
        }
        return "---";
    },
    RHW(val){
        if(val){
            return val
        }
        return "0";
    },
    location(val){
        try {
            if(val.citycode){
                const citycode = _.find(ChinaAddressV4Data,{value:val.citycode}).name;
                const areacode = _.find(ChinaAddressV4Data,{value:val.areacode}).name;
                const district = _.find(ChinaAddressV4Data,{value:val.district}).name;
                return `${citycode}、${ areacode}、${ district}，${ val.address}`;
            }
        }catch (e){}
        return "--";
    },
    dialog_checker(val){
        if(val < 10){
            return '0'+val;
        };
        return val;
    },
    rentStatus(val){
        switch (val){
            case '0':
                return '未发布';
                break;
            case '1':
                return '已出租';
                break;
            case '2':
                return '已发布';
                break;
            default:
                return '即将到期';
                break;

        }
    },
    MessageType(val){
        //1.催收，2.提醒，3.续约，4.系统，
        if(val == '1'){
            return '催收';
        }
        if(val == '2'){
            return '预约';
        }
        if(val == '3'){
            return '续约';
        }
        if(val == '4'){
            return '系统';
        }else {
            return '消息';
        }
    },
    term(val){
        var termIndex = parseInt(val);
        if(termIndex > 1){
            return "1-"+termIndex;
        }
        return "1-1";
    },
    rate(val,index = 100){
        if(isNaN(val)){
            return 0;
        }else {
            if(typeof parseFloat(val) == 'number'){
                return val / index;
            }
            return 0;
        }
    },
    vipState(val){
        if(val){
            return "已开通";
        }
        return "未开通";
    },
    member_wallet(val){
        if(val){
            return val;
        }
        return "0.00";
    },
    walletAll(item){
        if(item.loan_wallet && item.member_wallet){
            return item.loan_wallet + item.member_wallet;
        }
        return "0.00";
    },
    WithdrawalRecord(val){
        if(val && val == "2"){
            return '贷款提现';
        }
        return '余额提现';
    },
    push_reg(val){
        if(val){
            return val;
        }
        return 0;
    }
}