import {config} from "dotenv";

config()
export class Config {

    constructor() {

    }

    env(){
        if(process.env.NODE_ENV !== undefined) {
            if (process.env.NODE_ENV === "dev") {
                return "dev"
            }
            else if (process.env.NODE_ENV === "prod") {
                return "prod"
            } else{
                throw new Error("Incorrect Environment Set. Please either set 'prod' or 'dev'.")
            }
        } else {
            throw new Error("Incorrect Environment Set. Please either set 'prod' or 'dev'.")
        }
    }

    token(){
        if(process.env.BOT_TOKEN !== undefined){
            return process.env.BOT_TOKEN
        }else {
            throw new Error("You must provide a Bot Token with BOT_TOKEN set in .env file")
        }


    }

    clientId(){
        if(process.env.CLIENT_ID !== undefined){
            return process.env.CLIENT_ID
        }else {
            throw new Error("You must provide a Client Id with CLIENT_ID set in .env file")
        }
    }

    guild(){
        if(process.env.NODE_ENV !== undefined) {
            if (this.env() === "dev") {
                return "1148307481085358190"
            } else if (this.env() === "prod") {
                return "830201397974663229"
            }
        } else {
            throw new Error("Incorrect Environment Set. Please either set 'prod' or 'dev'.")
        }
    }

    tpcGuild(){
        return "830201397974663229"
    }

    aboutAndSop(){
        if(this.env() === "dev"){
            return "1148307482557554759"
        }
        if (this.env() === "prod"){
            return "833198809701679124"
        }

    }

    giveawayMessage(){
        if(this.env() === "dev"){
            return null
        }
        else if (this.env() === "prod"){
            return "848245312815497237"
        } else {
            return null
        }

    }

    commuterRole(){

        if(this.env() === "dev"){
            return "1148307481290866803"
        }
        else if (this.env() === "prod"){
            return "930863426224410684"
        } else {
            return null
        }
    }

    ffRole(){
        if(this.env() === "dev"){
            return "1148307481290866804"
        }
        else if (this.env() === "prod"){
            return "855253377209204750"
        } else {
            return null
        }
    }

    vipRole(){
        if(this.env() === "dev"){
            return "1148307481290866805"
        }
        else if (this.env() === "prod"){
            return "930863007372836876"
        } else {
            return null
        }
    }

    // may be used later but right now this is there as a backup
    // boosterRole(){
    //     if(this.env() === "dev"){
    //         return "1148311697480753235"
    //     }
    //     else if (this.env() === "prod"){
    //         return "838504056358961164"
    //     } else {
    //         return null
    //     }
    // }

    chartersRole(){
        if(this.env() === "dev"){
            return "1148307481290866801"
        }
        else if (this.env() === "prod"){
            return "897118707988451339"
        } else {
            return null
        }
    }

    giveawayRole(){
        if(this.env() === "dev"){
            return "1148307481227964436"
        }
        else if (this.env() === "prod"){
            return "860938566426558505"
        } else {
            return null
        }
    }

    ninjaApiKey(){
        if(process.env.NINJA_API_KEY !== undefined){
            return process.env.NINJA_API_KEY
        } else {
            throw new Error("You must provide a Ninja API Key")
        }
    }

    questionsApiUrl(){
        if(process.env.API_URL !== undefined){
            return process.env.API_URL
        } else {
            throw new Error("You must provide an API URL for the Quiz Function")
        }
    }

    newQuestionURL(){
        if(process.env.NEW_QUESTION_URL !== undefined){
            return process.env.NEW_QUESTION_URL
        } else {
            throw new Error("You must provide an API URL for the new question function")
        }
    }

    sentryDsn(){
        if(process.env.SENTRY_DSN !== undefined){
            return process.env.SENTRY_DSN
        } else {
            throw new Error("You must provide a Sentry DSN")
        }
    }

    chartersManagersRole(){
        if(this.env() === "dev"){
            return "1148307481328623736"
        }
        else if (this.env() === "prod"){
            return "910012872246046730"
        } else {
            return null
        }
    }

    flightInsRole(){
        if(this.env() === "dev"){
            return "1148307481328623745"
        }
        else if (this.env() === "prod"){
            return "945775006175076492"
        } else {
            return null
        }
    }





}