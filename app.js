const express=require("express")
const https=require("https")
const body=require("body-parser");
const request=require("request");
const app=express();
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})


app.post("/",function(req,res){
    var first=req.body.first;
    var last=req.body.last;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:first,
                    LNAME:last,
                }
            }
        ]
    }
    const options={
        method:"POST",
        auth:"aniket1:77e5c301e9cddb49ee05816b97790891-us21"
        
    }
    var jsondata=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/bcb69b20d2"

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.send("Succesfully subscribed");
        }
        else
        {
            res.send("Some failed ")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    });


    request.write(jsondata);
    request.end();

})

//api key
//77e5c301e9cddb49ee05816b97790891-us21

//audience id
//bcb69b20d2.

app.listen(3000,function(){
    console.log("Sever is running on port 3000");
});