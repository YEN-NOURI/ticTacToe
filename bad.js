/*start a game*/

function play(){
          var suquare = document.getElementsByTagName('td');
          for(let i = 0; i < suquare.length; i++)
            suquare[i].innerHTML = "";
            for(let i = 0; i < suquare.length; i++) 
              suquare[i].onclick = function(){
                                   if(this.innerHTML.length === 0){
                                      this.innerHTML = "x";
                                      robot(suquare);
                                      console.log(is_win(tableTomat(suquare)));
                                   }
                                }
}

/*robot move*/
function robot(td){
          var e = 0;
          var c = 0;
          for(let i = 0; i < td.length; i++)
            if(td[i].innerHTML.length === 0){
              e+=1;
              c+=1;
          }
          var board = tableTomat(td);
          board = [[board]];
          e = (e == 6 || e == 4) ? 2 : Math.trunc(e/2+1);
          var moves = mini_max(board,e,"o")
          moves = moves.slice(0,c+1)  
          var bestMove = moves.indexOf(Math.min(...moves));
          for(let i = 0; i < td.length-1;i++){
            if(td[i].innerHTML.length != 0)
              bestMove++;
            if(i == bestMove)
              break  
          }
          if(bestMove == 9)
            bestMove-=1;
          td[bestMove].innerHTML = "o"       
}



   /*html element to JS*/
function tableTomat(table){
          var mat = [[],[],[]];
          var c = 0;
          var i = 0;
          var j = 0;
          while(i < table.length){
            mat[c][j] = table[i].innerHTML;
            if((i+1)%3 == 0){
              c+=1;
              j=-1;
            }
            j+=1;
            i+=1;
          }
          return mat;
}
function toNum(xo){
          if(xo == "x")
            return 1
          if(xo == "o")
            return -1
          return 0;
} 
function is_win(matrice){
          var cols = [0,0,0];
          var rows = [0,0,0];
          var dig1 = [0];
          var dig2 = [0];
          for(let i = 0; i < matrice.length;i++){
            dig1[0]+=toNum(matrice[i][i]); 
            dig2[0]+=toNum(matrice[matrice.length-i-1][i]);   
            for(let j = 0; j < matrice.length;j++){
              cols[i]+=toNum(matrice[j][i]);
              rows[i]+=toNum(matrice[i][j]);     
           }
        } 
          if(cols.indexOf(-3)!=-1)return -3
          if(cols.indexOf(3)!=-1)return  3
          if(rows.indexOf(-3)!=-1)return -3
          if(rows.indexOf(3)!=-1)return  3
          if(dig1.indexOf(-3)!=-1)return -3
          if(dig1.indexOf(3)!=-1)return  3
          if(dig2.indexOf(-3)!=-1)return -3
          if(dig2.indexOf(3)!=-1)return  3
            return 0
}

   /*mini_max a.k.a worst algorithm_i_ever_wrote*/
function mini_max(matrice,e,sym){
          var matx = [[],[],[],[],[],[],[],[],[]];
          var c = 0;
          for(let i = 0; i < matrice.length; i++){
            for(let j = 0; j < matrice[i].length; j++)
               for(let k = 0; k < matrice[i][j].length; k++)
                  for(let l = 0; l < matrice[i][j][k].length; l++)
                      if(matrice[i][j][k][l].length === 0){
                        let m = matrice[i][j].map((arr)=>arr.slice());  
                        m[k][l] = sym; 
                        matx[c].push(m);
                        c+=(matrice.length === 1) ? 1 : 0;
                  }
                  c+=1;
          }
          if(e == 0){
            for(let i = 0; i < matrice.length; i++)
               matrice[i] = matrice[i].reduce(function(acc,cur){
                             return acc + is_win(cur)      
                            },0);    
            return matrice;
          }
          sym = (sym == "o") ? "x" : "o";
          return mini_max(matx,e-1,sym)
}
play();
