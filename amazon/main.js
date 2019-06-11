        //获取画笔
        var canvas = document.getElementById("board-canvas");
        var ctx= canvas.getContext("2d");
        ctx.lineWidth=1;

        //储存所有棋子
        var gridArray= new Array();
        //存储每个棋格的颜色
        var gridArrayColor = new Array();

        //储存游戏信息
        var gameInfo=null;

        //储存所有走法
        var allMoves=new Array();

        //是否轮到我下子
        var myTurn=true;

        //执白还是执黑
        var player='white';

        //每次移动棋子的数组,包含三个坐标，起子坐标，落子坐标，障碍放置坐标
        var previousMove = new Object();
        var move = new Object();

        //存放初始化棋子，按照标准棋谱格式存放
        var whiteArray = [{row:'A',col:4},{row:'D',col:1},{row:'G',col:1},{row:'J',col:4}];
        var blackArray = [{row:'A',col:7},{row:'D',col:10},{row:'G',col:10},{row:'J',col:7}];

        //落子进度,1起子，2落子，3放置障碍
        var step=1;

        //初始化棋盘
        function initBoard(){
            //绘制表格
            drawTable();
            //绘制坐标
            drawCoordinate();
            //填充数组
            fillGridArray();
            //填充颜色
            fillGridColor();
            //绘制初始棋子
            for(let i=0;i<whiteArray.length;i++){
                drawChess(whiteArray[i].row,whiteArray[i].col,'white');
            }
            for(let i=0;i<blackArray.length;i++){
                drawChess(blackArray[i].row,blackArray[i].col,'black');
            }
            //添加事件响应
            addListener();
        }
       
        //先把所有网格线绘制出来，10条横线，10条竖线
        function drawTable(){
            for(var i=0;i<11;i++){
                // let gridObj=new Object();
                //先来绘制横线,30,30
                ctx.moveTo(30,30+55*i);
                ctx.lineTo(580,30+55*i);
                ctx.stroke();
                //再来绘制竖线
                ctx.moveTo(30+55*i,30);
                ctx.lineTo(30+55*i,580);
                ctx.stroke();
            }
        }

        //记录下这100个棋子的坐标
        //从左下角开始
        function fillGridArray(){
            for(var i=0;i<10;i++){
                for(var j=0;j<10;j++){
                    let obj =new Object();
                    obj.row=i;
                    obj.col=j;
                    gridArray.push(obj);
                }
            }
        }

        //填充棋格
        function fillGridColor(){
            for(let i=0;i<10;i++){
                ctx.fillStyle=ctx.fillStyle=="#c0c0c0"?"#8080c0":"#c0c0c0";
                for(let j=0;j<10;j++){
                    ctx.beginPath();
                    ctx.rect(30+55*j,30+55*i,55,55);
                    gridArrayColor.push(ctx.fillStyle);
                    ctx.fill();
                    ctx.fillStyle=ctx.fillStyle=="#c0c0c0"?"#8080c0":"#c0c0c0";
                }
            }
        }

        //绘制棋盘坐标
        //context.fillText(text,x,y,maxWidth);
        function drawCoordinate(){
            for(let i=1;i<11;i++){
                ctx.fillStyle="#c0c0c0";
                ctx.fillText(11-i,10,10+55*i);
                ctx.fillText(11-i,590,10+55*i);
            }
            for(let i=1;i<11;i++){
                ctx.fillStyle="#c0c0c0";
                ctx.fillText(String.fromCharCode(64+i),55*i,20);
                ctx.fillText(String.fromCharCode(64+i),55*i,600);
            }
        }

        //为棋盘添加事件响应
        function addListener(){
            canvas.onclick=function(){
                //标准的获取鼠标点击相对于canvas画布的坐标公式
                let x = event.pageX - canvas.getBoundingClientRect().left;
                let y = event.pageY - canvas.getBoundingClientRect().top;
                let clickCoordinate = getClickCoordinate(x,y);
                let row = clickCoordinate.row;
                let col = clickCoordinate.col;
                console.log("你点击的坐标为：row:"+row+",col:"+col);
               
                //如果是起子阶段
                if(step == 1){
                    abraseRect(row,col);
                    move.fromRow=row;
                    move.fromCol=col;
                    step++;
                } 
                //如果是落子阶段 
                else if(step ==2 ){
                    drawChess(row,col,player);
                    move.toRow=row;
                    move.toCol=col;
                    move.player=player;
                    step++;
                }
                //再如果是放置障碍的阶段
                else if (step ==3){
                    move.arrowRow=row;
                    move.arrowCol=col;
                    drawArraw(row,col);
                    step=1;
                    allMoves.push(move);
                    //发送websocket请求，并且冻结棋盘
                }else{
                    console.log("未绑定相应的点击事件");
                }
                
            };
        }

        //绘制棋子
        //context.drawImage(img,x,y,width,height);  绘制棋子
        //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height); 裁剪棋子
        //context.clearRect(x,y,width,height); 清楚Rect
        function drawChess(row,col,type){
            let image = new Image();
            image.src = type=='white'?'white.jpg':'black.jpg';
            let x=30+(row.charCodeAt()-65)*55;
            let y=30+(10-col)*55;
            image.onload = function(){
                ctx.drawImage(image,x,y,55,55);
            }
        }
        
        //绘制障碍
        function drawArraw(row,col){
            let image = new Image();
            image.src = 'arrow.png';
            let x=30+(row.charCodeAt()-65)*55;
            let y=30+(10-col)*55;
            image.onload = function(){
                ctx.drawImage(image,x,y,55,55);
            }
        }   
             
        //擦除棋子或者障碍物(先clearRect ,再fillRect color)
        function abraseRect(row,col){
            let rowIndex = (row.charCodeAt()-65);//0-9
            let colIndex = 10-col;//0-9
            let colorIndex = rowIndex+colIndex*10;//0-99
            console.log(rowIndex);
            console.log(colIndex);
            console.log(colorIndex);
            ctx.beginPath();
            ctx.rect(30+55*rowIndex,30+55*colIndex,55,55);
            ctx.fillStyle=gridArrayColor[colorIndex];
            ctx.fill();
        }

        //移动棋子(先擦除棋子，再绘制棋子)
        //TODO:这里可以做用户取消落子判断
        function moveChess(fromRow,fromCol,toRow,toCol,type,arrRow,arrCol){
            abraseRect(fromRow,fromCol,toRow,toCol);//先清楚棋子
            drawChess(toRow,toCol,type);//再绘制坐标
            drawArraw(arrRow,arrCol);//再绘制障碍物
        }

        //点击的时候返回点击的坐标对应的行和列数,1~10
        function getClickCoordinate(x,y){
            let row = String.fromCharCode(64+parseInt((x-30)/55)+1);//只保留整数部分的坐标
            let col = 10-parseInt((y-30)/55);
            let obj = new Object();
            obj.row = row;
            obj.col = col;
            return obj;
        }

        //接收远程websocket命令，应用走法，并且释放棋盘
        function getRemoteAction(){

        }
        //初始化整个界面
        initBoard();

