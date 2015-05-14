/*  Warning v1.0.0 | (c) 2015 Junior Lisboa | //License */

/*
	//VARIABLES DEFAULT
	defaultdays => Quantidade de dias que balão irá aparecer a partir da data
	msgdefault => Mensagem padrão do balão
	
	//CLASS
	new_element_page => Classe necessária para encontrar o elemento na página
	elementtask => Classe que da estilo a janela de mensagem
	closepop => Classe que da estilo ao botão de fechar
	
	//ATRIBUTES
	nw-date 		 => Elemento com a data inicial do elemento
	nw-countdays	 => Quantidade de dias que o objeto irá aparecer
	nw-msg	 => Mensagem que irá aparecer no balão
	nw-legend	 => Legenda do balão
	nw-style => Váriavel para passar estilo do balão (red,blue,green)

	//FUNCTIONS
	closeNowWindows => Função para fechar popUp
	dateAdd  => Somar dias a uma data
	returnAtualDate => Retorna a data atual
	dateNowlook  => Verifica se uma Data é maior que a data atual
*/

$(document).ready(function() {

	var defaultdays = 7; //ONE WEEK
 	var msgdefault = 'Esta é a mais nova funcionalidade do painel! Leia o manual e aprenda rapidinho.';
 	//ERROR ARRAY
 	var error = [];
 	error[0] = 'Um dos campos não funcionará pois não possui um id único';
	error[1] = 'Um dos campos não funcionará pois já passou sua data limite';
	
	$(".new_element_page").each(function(){
	 	
	 	var id = $(this).attr('id');

		if(typeof id == 'undefined'){
	 		console.log('Error: '+error[0]);
	 	}else{
	 		
	 		var datebegin = $(this).attr('nw-date');
			var days 	  = $(this).attr('nw-countdays');
			var msg 	  = $(this).attr('nw-msg');
			var legend 	  = $(this).attr('nw-legend');
			var newstyle 	  = $(this).attr('nw-style');
			
			if(typeof datebegin == 'undefined' || datebegin == ''){
				datebegin = returnAtualDate();
			}

			if(typeof days == 'undefined' || days == ''){
				days = 0;
			}

	      	var dateEnd = dateAdd(datebegin,days); 

	      	if(!dateNowlook(dateEnd)){
	      		console.log('Error: '+error[1]);
	      	}else{
				if(typeof msg =='undefined' || msg == ''){
					msg = msgdefault;
				}
				if(typeof newstyle =='undefined' || msg == ''){
					newstyle = '';
				}
				var idwindows = 'nwmsg_'+id;
		 		var text = '<p class="elementtask '+newstyle+'" id="'+idwindows+'"><br><b>';
		 		
		 		if(typeof legend !='undefined' && legend != ''){
					text += '<legend>'+legend+'</legend>';
				}

		 		text += msg;
		 		text += '</b><br><br>';
		 		text += '<span class="closepop" onclick=\'closeNowWindows("'+idwindows+'");\'>x</span>';
		 		text += '</p>';
		 		$(this).after(text);
	 		}

	 	}

	});

});

function closeNowWindows (x){		
	$("#"+x).fadeOut( "slow" );
};

function dateAdd(dat,days){

   if(dat == '') return;

   dateI = dat.split('-');

   var date = new Date();
   date.setFullYear(dateI[0]);
   date.setMonth((dateI[1]-1));
   date.setDate(dateI[2]);
   var f = date.getDate() + parseInt(days);
   date.setDate(f);

   return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+date.getDate();

}
function returnAtualDate(){

   var date = new Date();
   return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+date.getDate();

}

function dateNowlook(data){

      var objDate = new Date();
      objDate.setYear(data.split("-")[0]);
      objDate.setMonth(data.split("-")[1]  - 1);
      objDate.setDate(data.split("-")[2]);

      if(objDate.getTime() < new Date().getTime()){
        return false;
      }    
      return true;
}