const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');

const laptopdata = JSON.parse(json);


const server = http.createServer((req,res)=>{
    


    const pathname = url.parse(req.url,true).pathname;
    const id = url.parse(req.url,true).query.id;
    
    if(pathname ==='/products' || pathname === '/')
    {
    
        res.writeHead(200 , {'content-type':'text.html'});

        fs.readFile(`${__dirname}/templates/overview.html`,'utf-8',(err,data)=>{


            let overviewOutput = data;

            
            

           
            fs.readFile(`${__dirname}/templates/templatecard.htnl`,'utf-8',(err,data)=>{

                const laptopoutput =laptopdata.map(el =>replaceTemplate(data , el)).join('');
                overviewOutput = overviewOutput.replace(/{%CARDS%}/g,laptopoutput);

                
            
            

                res.end(overviewOutput);
    
                
    
    
    
            });

            



        });










    











    }else if(pathname =='/laptop' && id < laptopdata.length){
        res.writeHead(200 , {'content-type':'text.html'});


        fs.readFile(`${__dirname}/templates/laptop.html`,'utf-8',(err,data)=>{
            const laptop = laptopdata[id];

            const output =replaceTemplate(data , laptop);

            res.end(output);

            



        });
        





        
    


    }
    else
    {
        res.writeHead(404 , {'content-type':'text.html'});
    res.end('This is the erroe page');

    }
    




    
});

server.listen(1354,'127.0.0.1',()=>{
    console.log('listening for requests');
});



function replaceTemplate(originalHTML , laptop){
    let output = originalHTML.replace(/{%product%}/g,laptop.productName);
             output = output.replace(/{%img%}/g,laptop.image);
             output = output.replace(/{%price%}/g,laptop.price);
             output = output.replace(/{%screen%}/g,laptop.screen);
             output = output.replace(/{%proccesor%}/g,laptop.cpu);
             output = output.replace(/{%storage%}/g,laptop.storage);
             output = output.replace(/{%ram%}/g,laptop.ram);
             output = output.replace(/{%id%}/g,laptop.id);

             return output;

}