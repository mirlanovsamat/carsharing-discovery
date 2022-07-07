import { HttpException, HttpStatus } from "@nestjs/common"

const utils = {

    tarif_one: parseInt(process.env.TARIFF_ONE),
    tarif_two: parseInt(process.env.TARIFF_TWO),
    tarif_three: parseInt(process.env.TARIFF_THREE),
    tarif_four: parseInt(process.env.TARIFF_FOUR),

    calculatePrice(day){
        let result = 0
        if(day <= 4){
             result = day * this.tarif_one
        }
        if(4 < day && day <= 9){
             result = (4 * this.tarif_one) + ((day-4)*this.tarif_two)
        }
        if(9 < day && day <= 17){
            result = (4 * this.tarif_one) + (5*this.tarif_two) + ((day-9)*this.tarif_three)
        }
        if(17 < day && day <= 30){
            result = (4 * this.tarif_one) + (5*this.tarif_two) + (8*this.tarif_three) + ((day-17)*this.tarif_four)
        }
        if(day > 30){
            throw new HttpException('Максимальный срок аренды 30 дней.', HttpStatus.BAD_REQUEST)
        }
        return result
    },

    weekendCheck(weekDay){
        if(weekDay === 'Sunday' || weekDay === 'Saturday'){
            throw new HttpException('Первый и последний день не должны быть выходными', HttpStatus.BAD_REQUEST)
        } 
    },

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    },

    filter(array, month){
        let stat = 0
        array.forEach(e => {
          const start = new Date(e.start)
          const finish = new Date(e.finish)
          if(start.getMonth() === finish.getMonth() && start.getMonth() == (month - 1)){
            stat += e.rentdays
          }
          else if(start.getMonth() == (month - 1)) {
            stat += utils.daysInMonth(month, start.getFullYear()) - start.getDate() + 1
          }
          else if(finish.getMonth() == (month - 1)) {
            stat += finish.getDate()
          }
        })
        return stat
      }
}

export default utils