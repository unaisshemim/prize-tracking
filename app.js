import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import express from 'express'

const app=express()

const FLIPKART_URL="https://www.flipkart.com/apple-iphone-11-purple-128-gb/p/itmb7ca0b05522ff?pid=MOBFWQ6BEHFXGXGB&lid=LSTMOBFWQ6BEHFXGXGBMVHGLV&marketplace=FLIPKART&q=apple+iphone&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=4199741f-5a32-4b72-9e7f-fdc94257338b.MOBFWQ6BEHFXGXGB.SEARCH&ppt=hp&ppn=homepage&ssid=zefpppby5s0000001657192376398&qH=443e995752cbe75b"
const EXEPECTED_AMOUNT=40000

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
    res.send(prize)
    
    
}catch(error){
    console.log(error)
}
     
})

const PORT=process.env.PORT || 3001

app.listen(PORT,()=>console.log(`server running in ${PORT}`))