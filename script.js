const btns = document.querySelectorAll('.btn');
const outputLast = document.querySelector('#outputLast');
const outputCurrent = document.querySelector('#outputCurrent');

let raw =[];
let cleanedData = [];
let pastData =[''];
let showString ='';

outputLast.textContent=pastData[pastData.length-1];

btns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        switch (btn.textContent) {
            
            case 'C':
                del();
                break;
            case 'Back':
                remove();
                break;
            case '=':
                solve();
                break;
        
            default:
                if(raw[raw.length-1]!=btn.textContent || isNum(btn.textContent))raw.push(btn.textContent);
                pressedBtn(btn);
                break;
        }
                
    })
    
});

function pressedBtn() {
    cleanUpRaw();
    outputCurrent.textContent=showString;
}

function del() {
    console.log('del');
    raw =[];
    cleanedData = [];
    pastData =[''];
    showString ='';
    outputCurrent.textContent=showString;
    outputLast.textContent=pastData[pastData.length-1];
    
}
function remove() {
    console.log('remove');
    raw.splice(raw.length-1,1);
    pressedBtn();

}

function solve() {
    console.log('solve');
    let divByZero = false;
    pastData.push(showString);
    outputLast.textContent=pastData[pastData.length-1];
    
    let arrayToWorkWith = cleanedData;
    console.log(arrayToWorkWith);
    let antyFreeze=0;
    do {
        antyFreeze++;
        for (let i = 0; i < arrayToWorkWith.length; i++) {
            const element = arrayToWorkWith[i];
            if (element=='*'){
                arrayToWorkWith.splice(i-1,3,(arrayToWorkWith[i-1] * arrayToWorkWith[i+1]));
            }
    
            if (element=='/'){
                if(arrayToWorkWith[i+1]==0){
                    divByZero=true; 

                }else{
                    arrayToWorkWith.splice(i-1,3,(arrayToWorkWith[i-1] / arrayToWorkWith[i+1]));
                }
                
            }
    
            
            console.log(arrayToWorkWith);
            
        }
        if(divByZero)break;
        for (let i = 0; i < arrayToWorkWith.length; i++) {
            const element = arrayToWorkWith[i];
            
    
            if (element=='+'){
                arrayToWorkWith.splice(i-1,3,(parseFloat(arrayToWorkWith[i-1]) + parseFloat(arrayToWorkWith[i+1])));
            }
    
            if (element=='-'){
                arrayToWorkWith.splice(i-1,3,(arrayToWorkWith[i-1] - arrayToWorkWith[i+1]));
            }
            console.log(arrayToWorkWith);
            
        }
        if(antyFreeze>100)arrayToWorkWith=[];
    } while (arrayToWorkWith.length>1);
    let result=arrayToWorkWith[0];
    result=Math.round(result*100)/100;
    let resultString =result.toString();
    raw =[];
    for (let i = 0; i < resultString.length; i++) {
        const element = resultString.charAt(i);
        raw.push(element)
    }
    outputCurrent.textContent=result;
    if(divByZero) {
        del();
        alert('You broke it!');
    };


}

function isNum(numToTest) {
    return Number.isInteger(parseInt(numToTest));
}

function cleanUpRaw (){
    cleanedData = [];
    let tempData = '';
    showString ='';

    for (let rawIndex = 0; rawIndex < raw.length; rawIndex++) {
        const element = raw[rawIndex];

        if (isNum(element) || element=='.'){
            tempData += element;
            showString +=element;

        }else{
            if (element=='-' && (   raw[rawIndex-1]=='-' ||
                                    raw[rawIndex-1]=='+' ||
                                    raw[rawIndex-1]=='*' ||
                                    raw[rawIndex-1]=='/' ||
                                    raw[rawIndex-1]==undefined)) {
                tempData += element;
                showString +=element;
            } else {
                cleanedData.push(tempData);
                tempData='';
                cleanedData.push(element);
                showString +=' '+element+' '; 
            }
            
        }
        if (rawIndex===raw.length-1) {
            cleanedData.push(tempData);
        }         
       
    }
    pastData.push(showString);

}
