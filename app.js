import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import express from 'express'

const app=express()

const FLIPKART_URL="https://www.flipkart.com/crocs-bayaband-bandana-print-men-blue-sandals/p/itm617eab3dd8908?pid=SNDFHX8YHGBHMSMG&lid=LSTSNDFHX8YHGBHMSMGIKA8VG&marketplace=FLIPKART&q=crocs+bandana+print&store=osp%2Fcil%2Fe83&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_11_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_11_na_na_na&fm=Search&iid=d6e4a131-77e5-477b-ba93-a979c9ec7df0.SNDFHX8YHGBHMSMG.SEARCH&ppt=sp&ppn=sp&ssid=76pzbzbhkg0000001657195781557&qH=a19545816e068fce"
const EXEPECTED_AMOUNT=1500

const checkFlikartPrize=async(url,expectedAmount)=>{
     var getHtml=async(url)=>{
        const headers={
            method:'get',
        headers:{
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36  '
    }

    }
    const res=await fetch(url)
    
    const html=await res.text()
    
    return cheerio.load(html)
    }
    

    const prizeConverter =(amount)=>parseInt(Number(amount.replace(/[^0-9.-]+/g,"")));
    const parsedhtml=await getHtml(url)
    
    const price=parsedhtml('div').find('._16Jk6d').text()
    const name=parsedhtml('div').find('.B_NuCI').text()
    var priceInt=prizeConverter(price)
    // console.log(priceInt)
    // console.log(name)
    
    if(priceInt<EXEPECTED_AMOUNT){
      
        console.log("money decreased")
    }else{
        console.log('no change lets wait')
    }
    let result={}
    result.prize=priceInt;
    result.name=name
    
    return result
    
    

}


const prize= await checkFlikartPrize(FLIPKART_URL,EXEPECTED_AMOUNT)

app.get('/track',async(req,res)=>{
try{
   console.log(prize)
    res.send(JSON.stringify(prize))
    
    
}catch(error){
    console.log(error)
}
     
})

const PORT=process.env.PORT || 3001

app.listen(PORT,()=>console.log(`server running in ${PORT}`))