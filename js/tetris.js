/**
 * Created with JetBrains WebStorm.
 * User: Rob
 * Date: 4/12/13
 * Time: 7:03 PM
 * To change this template use File | Settings | File Templates.
 */

var rowCount = 28;
var columnCount = 15;
var nextFigureTable=[];
for(var i = 0; i<4; i++){
    nextFigureTable[i]=[];
    for(var j= 0; j<4;j++){
        nextFigureTable[i][j]=0;
    }
}
var table =[];
for(var i = 0; i<rowCount; i++){
    table[i]=[];
    for(var j= 0; j<columnCount;j++){
        table[i][j]=0;
    }
}
var modelingTable=[];
for(var i = 0; i<rowCount; i++){
    modelingTable[i]=[];
    for(var j= 0; j<columnCount;j++){
        modelingTable[i][j]=0;
    }
}
var figure1 = [];
var figure2 = [];
var figure3 = [];
var figure4 = [];
var figure5 = [];
var figure6 = [];
var figure7 = [];
for (var i=0; i<4;i++){
    figure1[i]=[];
    figure2[i]=[];
    figure3[i]=[];
    figure4[i]=[];
    figure5[i]=[];
    figure6[i]=[];
    figure7[i]=[];
    for(var j=0;j<4;j++){
        figure1[i][j]=0;
        figure2[i][j]=0;
        figure3[i][j]=0;
        figure4[i][j]=0;
        figure5[i][j]=0;
        figure6[i][j]=0;
        figure7[i][j]=0;
    }
}
figure1[2][1]=1;
figure1[2][2]=1;
figure1[2][3]=1;
figure1[3][3]=1;
figure2[2][1]=1;
figure2[2][2]=1;
figure2[2][3]=1;
figure2[3][1]=1;
figure3[1][1]=1;
figure3[2][1]=1;
figure3[2][2]=1;
figure3[3][2]=1;
figure4[1][2]=1;
figure4[2][1]=1;
figure4[2][2]=1;
figure4[3][1]=1;
figure5[1][1]=1;
figure5[2][1]=1;
figure5[2][2]=1;
figure5[3][1]=1;
figure6[2][1]=1;
figure6[2][2]=1;
figure6[3][1]=1;
figure6[3][2]=1;
figure7[0][1]=1;
figure7[1][1]=1;
figure7[2][1]=1;
figure7[3][1]=1;
var figures = [figure1,figure2,figure3,figure4,figure5,figure6,figure7]
//Functions*************************************************
function createFigure(){
    console.log(table);
    for (var i=0;i<4;i++){
        for(var j= 5;j<9;j++){
            table[i][j]=figures[x][i][j-5];
        }
    }
    var y=Math.floor(((((Math.random()*7)))));
    for (var i=0;i<4;i++){
        for(var j= 0;j<4;j++){
            nextFigureTable[i][j]=figures[y][i][j];
        }
    }
    for (var i=0;i<4;i++){
        for(var j= 0;j<4;j++){
            if(nextFigureTable[i][j]==1){
                $('#nextFigureBox'+(i*4+j)).css({'backgroundColor':'black'});
            }
            else{
                $('#nextFigureBox'+(i*4+j)).css({'backgroundColor':'white'});
            }
        }
    }
    x=y;
    modeling();
}
//Modeling**************************************************
function modeling(){
    var n=0;
    for(var i = 0; i<rowCount; i++){
        for(var j= 0; j<columnCount;j++){
            modelingTable[i][j]=table[i][j];
            if(modelingTable[i][j]==1 || modelingTable[i][j]==-1){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
            }
            else{
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'white'});
            }
        }
    }
    n=setInterval(function(){
        for(var i = 0; i<rowCount; i++){
            for(var j= 0; j<columnCount;j++){

                if(table[i][j]==1){
                    $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
                }

            }
        }
        var count = 0;
        for(var j=0;j<columnCount;j++){
            for(var i=0;i<rowCount-1;i++){
                if(modelingTable[i][j]==1 && modelingTable[i+1][j]==-1){
                    count++;
                }
            }
        }
        for(var i=rowCount-1;i>=0;i--){
            for(var j=columnCount-1;j>=0;j--){
                if(modelingTable[i][j]==1 && i+1<rowCount && modelingTable[i+1][j]==0 && count==0){
                    modelingTable[i][j]=0;
                    modelingTable[i+1][j]=1;
                }
                if(modelingTable[i][j]==1 && i+1>=rowCount){
                    modelingTable[i][j]=1;
                    return;
                }
            }
        }
        for(var i=rowCount-2;i>=0;i--){
            for(var j=columnCount-1;j>=0;j--) {
                if(modelingTable[i][j]==1 && modelingTable[i+1][j]==-1){
                    for(var k=4;k<rowCount;k++){
                        for(var d=0;d<columnCount;d++){
                            if(modelingTable[k][d]==1){
                                $('#box'+((k*columnCount)+d)).css({'backgroundColor':'red'});
                                modelingTable[k][d]=2;
                            }
                        }
                    }
                }
            }
        }
        for(var j=columnCount-1;j>=0;j--){
            if(modelingTable[rowCount-1][j]==1){
                for(var k=4;k<rowCount;k++){
                    for(var d=0;d<columnCount;d++){
                        if(modelingTable[k][d]==1){
                            $('#box'+((k*columnCount)+d)).css({'backgroundColor':'red'});
                            modelingTable[k][d]=2;
                        }
                    }
                }
            }
        }
    },1)
}
// Automatic Play*******************************************
function automaticPlay(){

}
//MoveDown**************************************************
function moveDown(){
    console.log(downInterval);
    checkGameOver();
    var array=[];
    for(var j=0;j<columnCount;j++){
        for(var i=1;i<rowCount-1;i++){
            if(table[i][j]==1 && table[i+1][j]==-1){
                array.push(table[i][j]);
            }
        }
    }
    for(var i=rowCount-1;i>=0;i--){
        for(var j=columnCount-1;j>=0;j--){
            if(table[i][j]==1 && i+1<rowCount && table[i+1][j]==0 && array.length==0){
                table[i][j]=0;
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'white'});
                table[i+1][j]=1;
            }
            if(table[i][j]==1 && i+1>=rowCount){
                table[i][j]=1;
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
                return;
            }
        }
    }
    for(var i=rowCount-1;i>=0;i--){
        for(var j=columnCount-1;j>=0;j--) {
            if(table[i][j]==1){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
            }
            if(table[i][j]==1 && i+1>rowCount ){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
                return;
            }
            if(table[i][j]==1 && i+1<rowCount ){
                if(table[i+1][j]==-1){
                    for(var k=4;k<rowCount;k++){
                        for(var d=0;d<columnCount;d++){
                            if(table[k][d]==1){
                                $('#box'+((k*columnCount)+d)).css({'backgroundColor':'black'});
                            }
                        }
                    }
                    clearInterval(figureDownInterval);
                    t=setTimeout(function(){
                        var cont=0;
                        for(var i=rowCount-2;i>=0;i--){
                            for(var j=columnCount-1;j>=0;j--) {
                                if(table[i][j]==1 && table[i+1][j]==-1){
                                    cont++;
                                }
                            }
                        }
                        if(cont==0){
                            figureDownInterval=setInterval(moveDown,downInterval);
                        }
                        else{
                            for(var k=4;k<rowCount;k++){
                                for(var d=0;d<columnCount;d++){
                                    if(table[k][d]==1){
                                        table[k][d]=-1;
                                    }
                                }
                            }
                            deleteRow();
                            createFigure();
                            figureDownInterval=setInterval(moveDown,downInterval);
                        }
                    },200)
                        return;
                }
            }

        }
    }
    for(var j=columnCount-1;j>=0;j--){
        if(table[rowCount-1][j]==1){
            clearInterval(figureDownInterval);
            f=setTimeout(function(){
                var cont=0;
                for(var j=columnCount-1;j>=0;j--){
                    if(table[rowCount-1][j]==1){
                            cont++;
                    }
                }
                if(cont==0){
                    figureDownInterval=setInterval(moveDown,downInterval);
                }
                else{
                    for(var k=4;k<rowCount;k++){
                       for(var d=0;d<columnCount;d++){
                          if(table[k][d]==1){
                             $('#box'+((k*columnCount)+d)).css({'backgroundColor':'black'});
                             table[k][d]=-1;
                          }
                       }
                    }
                deleteRow();
                createFigure();
                figureDownInterval=setInterval(moveDown,downInterval);
                }
            },200)
            return;
        }
    }
}
//MoveLeft************************************************************
function moveLeft(){
    var arr=[];
    var array=[];
    for(var k=0;k<rowCount;k++){
        if(table[k][0]==1){
            array.push(table[k][0]);
        }
    }
    if(array.length>0){
        return;
    }
    for(var j=1;j<columnCount;j++){
        for(var i=1;i<rowCount;i++){
            if(table[i][j]==1 && table[i][j-1]==-1){
                arr.push(table[i][j]);
            }
        }
    }
    if(arr.length>0){
        return;
    }
    for(var j=1;j<columnCount;j++){
        for(var i=0;i<rowCount;i++){

            if(table[i][j]==1 && table[i][j-1]==0 && arr.length==0){
                table[i][j]=0;
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'white'});
                table[i][j-1]=1;
            }

        }
    }
    for(var j=0;j<columnCount;j++){
        for(var i=1;i<rowCount;i++){
            if(table[i][j]==1){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
            }
        }
    }
}
//MoveRight************************************************************
function moveRight(){
    var arr=[];
    var array=[];
    for(var k=0;k<rowCount;k++){
        if(table[k][columnCount-1]==1){
            array.push(table[k][0]);
        }
    }
    if(array.length>0){
        return;
    }
    for(var j=0;j<columnCount-1;j++){
        for(var i=1;i<rowCount;i++){
            if(table[i][j]==1 && table[i][j+1]==-1){
                arr.push(table[i][j]);
            }
        }
    }
    if(arr.length>0){
        return;
    }
    for(var j=columnCount-2;j>=0;j--){
        for(var i=0;i<rowCount;i++){
            if(table[i][j]==1 && table[i][j+1]==0 && arr.length==0){
                table[i][j]=0;
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'white'});
                table[i][j+1]=1;
            }

        }
    }
    for(var j=0;j<columnCount;j++){
        for(var i=1;i<rowCount;i++){
            if(table[i][j]==1){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
            }
        }
    }
}
//Draw**************************************************************************
function draw(){
    for(var j=0;j<columnCount;j++){
        for(var i=1;i<rowCount;i++){
            if(table[i][j]==1){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'black'});
            }
            if(table[i][j]==0){
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'white'});
            }
        }
    }
}
//Rotate************************************************************************
function rotate(){
    for(var i=2;i<rowCount-1;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i][j+2]==1 && table[i+1][j+2]==1 && table[i-1][j]==0 && table[i-1][j+1]==0 && table[i-1][j+2]==0 && table[i+1][j]==0 && table[i+1][j+1]==0){
                table[i][j]=0;
                table[i+1][j+1]=1;
                table[i][j+2]=0;
                table[i-1][j+1]=1;
                table[i+1][j+2]=0;
                table[i-1][j+2]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i+1][j]==1 && table[i+2][j]==1 && table[i][j-1]==0 && table[i+1][j-1]==0 && table[i+2][j-1]==0 && table[i+1][j+1]==0 && table[i+2][j+1]==0){
                table[i+2][j]=0;
                table[i+1][j+1]=1;
                table[i][j]=0;
                table[i+1][j-1]=1;
                table[i][j+1]=0;
                table[i][j-1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+1][j+1]==1 && table[i+1][j+2]==1 && table[i][j+1]==0 && table[i][j+2]==0 && table[i+2][j]==0 && table[i+2][j+1]==0 && table[i+2][j+2]==0){
                table[i+1][j]=0;
                table[i+2][j+1]=1;
                table[i][j]=0;
                table[i+2][j]=1;
                table[i+1][j+2]=0;
                table[i][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+2][j]==1 && table[i+2][j-1]==1 && table[i][j-1]==0 && table[i][j+1]==0 && table[i+1][j-1]==0 && table[i+1][j+1]==0 && table[i+2][j+1]==0){
                table[i][j]=0;
                table[i+1][j-1]=1;
                table[i+2][j]=0;
                table[i+1][j+1]=1;
                table[i+2][j-1]=0;
                table[i+2][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-1;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i][j+2]==1 && table[i+1][j]==1 && table[i-1][j]==0 && table[i-1][j+1]==0 && table[i-1][j+2]==0 && table[i+1][j+2]==0 && table[i+1][j+1]==0){
                table[i][j+2]=0;
                table[i-1][j+1]=1;
                table[i+1][j]=0;
                table[i+1][j+2]=1;
                table[i][j]=0;
                table[i+1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+2][j]==1 && table[i+2][j+1]==1 && table[i][j-1]==0 && table[i][j+1]==0 && table[i+1][j-1]==0 && table[i+1][j+1]==0 && table[i+2][j-1]==0){
                table[i][j]=0;
                table[i+1][j-1]=1;
                table[i+2][j+1]=0;
                table[i][j+1]=1;
                table[i+2][j]=0;
                table[i+1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-1;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i][j+2]==1 && table[i-1][j+2]==1 && table[i-1][j]==0 && table[i-1][j+1]==0 && table[i+1][j+2]==0 && table[i+1][j]==0 && table[i+1][j+1]==0){
                table[i][j]=0;
                table[i+1][j+1]=1;
                table[i-1][j+2]=0;
                table[i-1][j]=1;
                table[i][j+2]=0;
                table[i-1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i+1][j+1]==1 && table[i+2][j+1]==1 && table[i+1][j]==0 && table[i+2][j]==0 && table[i][j+2]==0 && table[i+1][j+2]==0 && table[i+2][j+2]==0){
                table[i][j]=0;
                table[i+2][j]=1;
                table[i][j+1]=0;
                table[i+1][j]=1;
                table[i+2][j+1]=0;
                table[i+1][j+2]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j+1]==1 && table[i+1][j]==1 && table[i+2][j]==1 && table[i][j-1]==0 && table[i+1][j-1]==0 && table[i+2][j-1]==0 && table[i][j+1]==0 && table[i+2][j+1]==0){
                table[i][j]=0;
                table[i+1][j-1]=1;
                table[i+1][j+1]=0;
                table[i][j]=1;
                table[i+2][j]=0;
                table[i+1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j-1]==1 && table[i+1][j]==1 && table[i+1][j+1]==1 && table[i][j-1]==0 && table[i][j+1]==0 && table[i+2][j-1]==0 && table[i+2][j+1]==0 && table[i+2][j]==0){
                table[i+1][j-1]=0;
                table[i+2][j]=1;
                table[i][j]=0;
                table[i+1][j-1]=1;
                table[i+1][j+1]=0;
                table[i][j]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+2][j]==1 && table[i+1][j-1]==1 && table[i][j-1]==0 && table[i+1][j+1]==0 && table[i+2][j-1]==0 && table[i+2][j+1]==0 && table[i][j+1]==0){
                table[i+2][j]=0;
                table[i+1][j+1]=1;
                table[i+1][j-1]=0;
                table[i+2][j]=1;
                table[i][j]=0;
                table[i+1][j-1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-1;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i][j+2]==1 && table[i+1][j+1]==1 && table[i-1][j]==0 && table[i-1][j+1]==0 && table[i-1][j+2]==0 && table[i+1][j]==0 && table[i+1][j+2]==0){
                table[i][j+2]=0;
                table[i-1][j+1]=1;
                table[i+1][j+1]=0;
                table[i][j+2]=1;
                table[i][j]=0;
                table[i+1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+1][j+1]==1 && table[i+2][j+1]==1 && table[i][j-1]==0 && table[i][j+1]==0 && table[i+1][j-1]==0 && table[i+2][j]==0 && table[i+2][j-1]==0){
                table[i+2][j+1]=0;
                table[i+2][j-1]=1;
                table[i+1][j+1]=0;
                table[i+2][j]=1;
                table[i][j]=0;
                table[i+1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-1;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i+1][j]==1 && table[i+1][j-1]==1 && table[i-1][j-1]==0 && table[i-1][j+1]==0 && table[i-1][j]==0 && table[i][j-1]==0 && table[i+1][j+1]==0){
                table[i][j+1]=0;
                table[i-1][j]=1;
                table[i+1][j]=0;
                table[i][j+1]=1;
                table[i+1][j-1]=0;
                table[i+1][j+1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=1;j<columnCount-1;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+1][j-1]==1 && table[i+2][j-1]==1 && table[i][j-1]==0 && table[i][j+1]==0 && table[i+1][j+1]==0 && table[i+2][j]==0 && table[i+2][j+1]==0){
                table[i+2][j-1]=0;
                table[i+2][j+1]=1;
                table[i+1][j-1]=0;
                table[i+2][j]=1;
                table[i][j]=0;
                table[i+1][j-1]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-1;i++){
        for(var j=0;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i+1][j+1]==1 && table[i+1][j+2]==1 && table[i][j+2]==0 && table[i+1][j]==0 && table[i-1][j]==0 && table[i-1][j+1]==0 && table[i-1][j+2]==0){
                table[i][j]=0;
                table[i-1][j+1]=1;
                table[i+1][j+1]=0;
                table[i][j]=1;
                table[i+1][j+2]=0;
                table[i+1][j]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-3;i++){
        for(var j=1;j<columnCount-2;j++){
            if(table[i][j]==1 && table[i+1][j]==1 && table[i+2][j]==1 && table[i+3][j]==1 && table[i][j-1]==0 && table[i+1][j-1]==0 && table[i+1][j+1]==0 && table[i+1][j+2]==0 && table[i+2][j+1]==0 && table[i+2][j+2]==0 && table[i+3][j+1]==0 && table[i+3][j+2]==0){
                table[i][j]=0;
                table[i+1][j-1]=1;
                table[i+2][j]=0;
                table[i+1][j+1]=1;
                table[i+3][j]=0;
                table[i+1][j+2]=1;
                draw();
                return;
            }
        }
    }
    for(var i=2;i<rowCount-2;i++){
        for(var j=0;j<columnCount-3;j++){
            if(table[i][j]==1 && table[i][j+1]==1 && table[i][j+2]==1 && table[i][j+3]==1 && table[i-1][j]==0 && table[i-1][j+1]==0 && table[i+1][j+1]==0 && table[i+1][j+2]==0 && table[i+1][j+3]==0 && table[i+2][j+1]==0 && table[i+2][j+2]==0 && table[i+2][j+3]==0){
                table[i][j]=0;
                table[i-1][j+1]=1;
                table[i][j+2]=0;
                table[i+1][j+1]=1;
                table[i][j+3]=0;
                table[i+2][j+1]=1;
                draw();
                return;
            }
        }
    }
}
//game over*********************************************************************
function checkGameOver(){
    for(var d = 0; d<columnCount; d++){
        if(table[4][d]==-1){
            for(var i = 0; i<rowCount; i++){
                for(var j= 0; j<columnCount;j++){
                    table[i][j]=0;
                }
            }
            clearInterval(figureDownInterval);
            clearTimeout(t);
            clearTimeout(f);
            alert("Game Over");

        }
    }
}
//Delete Row********************************************************************
function deleteRow(){
    scoreValue=$("#score").html();
    var countOfDeletedRows=0;
    for(var i = 4; i<rowCount;i++){
        var arrRow=[];
        for(var j=0;j<columnCount;j++){
            if(table[i][j]==-1){
                arrRow.push(table[i][j]);
            }
        }
        if(arrRow.length==columnCount){
            countOfDeletedRows++;
            deletedRowsCount++;
            for(var d=i;d>=4;d--){
                for(var j=0;j<columnCount;j++){
                    table[d][j]=table[d-1][j];
                }
            }
            for(var j=0;j<columnCount;j++){
                for(var m=1;m<rowCount;m++){
                    if(table[m][j]==0){
                        $('#box'+((m*columnCount)+j)).css({'backgroundColor':'white'});
                    }
                    else{
                        $('#box'+((m*columnCount)+j)).css({'backgroundColor':'black'});
                    }
                }
            }
        }
    }
    if(deletedRowsCount>4 && levelvalue<10){
        deletedRowsCount = 0;
        level.selectedIndex = levelvalue;
        levelvalue = level.options[level.selectedIndex].value;
        downInterval=500-((levelvalue-1)*50);
    }
    var score=parseInt(scoreValue)+(countOfDeletedRows*100)+(((countOfDeletedRows*100)*(countOfDeletedRows*10))/100);
    $("#score").html(parseInt(score));
}

$(document).ready(function(){
    deletedRowsCount = 0;
    figureDownInterval=0;
    t=0;
    f=0;
    l=0;
    $("#newGame").click(function(){
        clearTimeout(t);
        clearTimeout(f);
        clearTimeout(l);
        clearInterval(figureDownInterval);
        for(var i = 0; i<rowCount; i++){
            for(var j= 0; j<columnCount;j++){
                table[i][j]=0;
                $('#box'+((i*columnCount)+j)).css({'backgroundColor':'white'});
            }
        }
        for (var i=0;i<4;i++){
            for(var j= 0;j<4;j++){
                nextFigureTable[i][j]=0;
                    $('#nextFigureBox'+(i*4+j)).css({'backgroundColor':'white'});

            }
        }
        x=Math.floor((Math.random()*7));
    l=setTimeout(function(){
    level=document.getElementById("level");
    levelvalue = level.options[level.selectedIndex].value;
    downInterval=500-((levelvalue-1)*50);
    console.log(downInterval)
    $("#score").html(0);

    createFigure();
    figureDownInterval=setInterval(moveDown,downInterval);
},1000)

    })
    for(var i=0; i<rowCount*columnCount;i++){
        $("#sheet").append("<div style='width: 20px;height: 20px;border: 1px solid gray;float: left;' id="+'box'+i+"></div>");
    }
    for(var i=0; i<16;i++){
        $("#nextFigure").append("<div style='width: 20px;height: 20px;float: left;' id="+'nextFigureBox'+i+"></div>");
    }
    $(document).keydown( function(e) {
        if (e.keyCode == 37) {

            moveLeft();
            modeling();
        }
    });
    $(document).keydown( function(e) {
        if (e.keyCode == 38) {

            rotate();
            modeling();
        }
    });
    $(document).keydown( function(e) {
        if (e.keyCode == 39) {

            moveRight();
            modeling();
        }
    });
    $(document).keydown( function(e) {
        if (e.keyCode ==40){
        var count=0;
            for(var i=4;i<rowCount-1;i++){
                for(var j=0;j<columnCount;j++){
                    if(table[i][j]==1 && table[i+1][j]==-1){
                        count++
                    }
                }
            }
            if(count==0){
                moveDown();
            }

        }
    });
})
