String.prototype.tpl = function(o) { 
	var r = this ; 
	for (var i in o) { 
		r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  
	} 
	return r 
}

var listItemTpl_1 = `<a class="dropdown-item" href='#' onclick='custom_load_1("$url")'>$label</a>`
var listItemTpl_2 = `<a class="dropdown-item" href='#' onclick='custom_load_2("$url")'>$label</a>`
var listItemTpl_3 = `<a class="dropdown-item" href='#' onclick='custom_load_3("$url")'>$label</a>`

$(document).ready(main);

function main() {
	$.ajax({
		method: 'GET',
		url: './education_filelist.json',
		success: function(d) {
			for (var i=0; i<d.length; i++) {
				$('#list_1').append(listItemTpl_1.tpl({url:d[i].url, label: d[i].label}))
			}
			for (var i=0; i<d.length; i++) {
				$('#list_2').append(listItemTpl_2.tpl({url:d[i].url, label: d[i].label}))
			}
			for (var i=0; i<d.length; i++) {
				$('#list_3').append(listItemTpl_3.tpl({url:d[i].url, label: d[i].label}))
			}
		},
		error: function() {
			alert('No document to show')
		}
	});
	
	$('#see_mention').click(function() {
		if (this.checked) 
			$('#metadata_panes').hide()
		else
			$('#metadata_panes').show()
	});
	
	$('#clear_highlights').click(function() {
		if (this.checked) 
			$('.mention-person').removeClass('text-person')
			$('.mention-place').removeClass('text-place')
			$('.mention-organisation').removeClass('text-organisation')
			$('.mention-concept').removeClass('text-concept')
	});
	
	$('#close_1').click(function() {
		$('#article_1').empty()
	});
	$('#close_2').click(function() {
		$('#article_2').empty()
	});
	$('#close_3').click(function() {
		$('#article_3').empty()
	});
	
}

//custom_load per spazio articolo 1
function custom_load_1(file) {
	$.ajax({
		method: 'GET',
		url: file,
		success: function(d) {
			$('#article_1').html(d)
			$('#title').html($('#article_1 h1'))

			filltabs_1()
		},
		error: function() {
			alert('Could not load file '+file)
		}
	});

	mostra_1();
}

//custom_load per spazio articolo 2
function custom_load_2(file) {
	$.ajax({
		method: 'GET',
		url: file,
		success: function(d) {
			$('#article_2').html(d)
			$('#title').html($('#article_2 h1'))
				
			filltabs_2()
		},
		error: function() {
			alert('Could not load file '+file)
		}
	});

	mostra_2();
}

//custom_load per spazio articolo 3
function custom_load_3(file) {
	$.ajax({
		method: 'GET',
		url: file,
		success: function(d) {
			$('#article_3').html(d)
			$('#title').html($('#article_3 h1'))
				
			filltabs_3()
		},
		error: function() {
			alert('Could not load file '+file)
		}
	});

	mostra_3();
}

function filltabs_1(){
	filltab_1("#article_1 .mention-person","list-person","#person_1")
	filltab_1("#article_1 .mention-place","list-place","#place_1")
	filltab_1("#article_1 .mention-concept","list-concept","#concept_1")
	filltab_1("#article_1 .mention-organisation","list-organisation","#organisation_1")
}

function filltabs_2(){
	filltab_2("#article_2 .mention-person","list-person","#person_2")
	filltab_2("#article_2 .mention-place","list-place","#place_2")
	filltab_2("#article_2 .mention-concept","list-concept","#concept_2")
	filltab_2("#article_2 .mention-organisation","list-organisation","#organisation_2")
}
	
function filltabs_3(){	
	filltab_3("#article_3 .mention-person","list-person","#person_3")
	filltab_3("#article_3 .mention-place","list-place","#place_3")
	filltab_3("#article_3 .mention-concept","list-concept","#concept_3")
	filltab_3("#article_3 .mention-organisation","list-organisation","#organisation_3")
}

function filltab_1(what,style,where) {
	var list = `<li class="list $style"><a href="$place">$content</a></li>`
	var elements = $(what); 
	$(where+' ul').empty(); 
	$.each($(what), function(i, metadataItem){
		$(where+' ul').append(list.tpl({
			style:style, 
			place: '#'+elements[i].id,
			content: elements[i].innerHTML
		}) )
	});
	//highlights
	$('#person-tab_1').click(function(){

		$('#article_1 .mention-place').removeClass('text-place');
		$('#article_1 .mention-organisation').removeClass('text-organisation');
		$('#article_1 .mention-concept').removeClass('text-concept');

		$('#article_1 .mention-person').addClass('text-person');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_1').show();
		$('#place_1').hide();
		$('#organisation_1').hide();
		$('#concept_1').hide();
	});
	
	//highlights
	$('#place-tab_1').click(function(){

		$('#article_1 .mention-person').removeClass('text-person');
		$('#article_1 .mention-organisation').removeClass('text-organisation');
		$('#article_1 .mention-concept').removeClass('text-concept');

		$('#article_1 .mention-place').addClass('text-place');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_1').hide();
		$('#place_1').show();
		$('#organisation_1').hide();
		$('#concept_1').hide();
	});
		
	//highlights
	$('#organisation-tab_1').click(function(){

		$('#article_1 .mention-person').removeClass('text-person');
		$('#article_1 .mention-place').removeClass('text-place');
		$('#article_1 .mention-concept').removeClass('text-concept');

		$('#article_1 .mention-organisation').addClass('text-organisation');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_1').hide();
		$('#place_1').hide();
		$('#organisation_1').show();
		$('#concept_1').hide();
	});
	
	//highlights
	$('#concept-tab_1').click(function(){

		$('#article_1 .mention-person').removeClass('text-person');
		$('#article_1 .mention-place').removeClass('text-place');
		$('#article_1 .mention-organisation').removeClass('text-organisation');

		$('#article_1 .mention-concept').addClass('text-concept');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_1').hide();
		$('#place_1').hide();
		$('#organisation_1').hide();
		$('#concept_1').show();
	});
}

function filltab_2(what,style,where) {
	var list = `<li class="list $style"><a href="$place">$content</a></li>`
	var elements = $(what); 
	$(where+' ul').empty(); 
	$.each($(what), function(i, metadataItem){
		$(where+' ul').append(list.tpl({
			style:style, 
			place: '#'+elements[i].id,
			content: elements[i].innerHTML
		}) )
	});
	//highlights
	$('#person-tab_2').click(function(){

		$('#article_2 .mention-place').removeClass('text-place');
		$('#article_2 .mention-organisation').removeClass('text-organisation');
		$('#article_2 .mention-concept').removeClass('text-concept');

		$('#article_2 .mention-person').addClass('text-person');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_2').show();
		$('#place_2').hide();
		$('#organisation_2').hide();
		$('#concept_2').hide();
	});
	
	//highlights
	$('#place-tab_2').click(function(){

		$('#article_2 .mention-person').removeClass('text-person');
		$('#article_2 .mention-organisation').removeClass('text-organisation');
		$('#article_2 .mention-concept').removeClass('text-concept');

		$('#article_2 .mention-place').addClass('text-place');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_2').hide();
		$('#place_2').show();
		$('#organisation_2').hide();
		$('#concept_2').hide();
	});
		
	//highlights
	$('#organisation-tab_2').click(function(){

		$('#article_2 .mention-person').removeClass('text-person');
		$('#article_2 .mention-place').removeClass('text-place');
		$('#article_2 .mention-concept').removeClass('text-concept');

		$('#article_2 .mention-organisation').addClass('text-organisation');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_2').hide();
		$('#place_2').hide();
		$('#organisation_2').show();
		$('#concept_2').hide();
	});
	
	//highlights
	$('#concept-tab_2').click(function(){

		$('#article_2 .mention-person').removeClass('text-person');
		$('#article_2 .mention-place').removeClass('text-place');
		$('#article_2 .mention-organisation').removeClass('text-organisation');

		$('#article_2 .mention-concept').addClass('text-concept');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_2').hide();
		$('#place_2').hide();
		$('#organisation_2').hide();
		$('#concept_2').show();
	});
}

function filltab_3(what,style,where) {
	var list = `<li class="list $style"><a href="$place">$content</a></li>`
	var elements = $(what); 
	$(where+' ul').empty(); 
	$.each($(what), function(i, metadataItem){
		$(where+' ul').append(list.tpl({
			style:style, 
			place: '#'+elements[i].id,
			content: elements[i].innerHTML
		}) )
	});
	//highlights
	$('#person-tab_3').click(function(){

		$('#article_3 .mention-place').removeClass('text-place');
		$('#article_3 .mention-organisation').removeClass('text-organisation');
		$('#article_3 .mention-concept').removeClass('text-concept');

		$('#article_3 .mention-person').addClass('text-person');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_3').show();
		$('#place_3').hide();
		$('#organisation_3').hide();
		$('#concept_3').hide();
	});
	
	//highlights
	$('#place-tab_3').click(function(){

		$('#article_3 .mention-person').removeClass('text-person');
		$('#article_3 .mention-organisation').removeClass('text-organisation');
		$('#article_3 .mention-concept').removeClass('text-concept');

		$('#article_3 .mention-place').addClass('text-place');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_3').hide();
		$('#place_3').show();
		$('#organisation_3').hide();
		$('#concept_3').hide();
	});
		
	//highlights
	$('#organisation-tab_3').click(function(){

		$('#article_3 .mention-person').removeClass('text-person');
		$('#article_3 .mention-place').removeClass('text-place');
		$('#article_3 .mention-concept').removeClass('text-concept');

		$('#article_3 .mention-organisation').addClass('text-organisation');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_3').hide();
		$('#place_3').hide();
		$('#organisation_3').show();
		$('#concept_3').hide();
	});
	
	//highlights
	$('#concept-tab_3').click(function(){

		$('#article_3 .mention-person').removeClass('text-person');
		$('#article_3 .mention-place').removeClass('text-place');
		$('#article_3 .mention-organisation').removeClass('text-organisation');

		$('#article_3 .mention-concept').addClass('text-concept');
			
		$("#see_mention").prop("checked", false);
		$('#metadata_panes').show();

		$('#person_3').hide();
		$('#place_3').hide();
		$('#organisation_3').hide();
		$('#concept_3').show();
	});
}
		
var toggleMostra_1 = false;
function mostra_1(){

	if (!toggleMostra_1){
		$('#list_1').show();
		toggleMostra_1 = !toggleMostra_1;
	}
	else{
		document.getElementById('list_1').style.display = 'none';
		toggleMostra_1 = !toggleMostra_1;
	}
		
}

var toggleMostra_2 = false;
function mostra_2(){

	if (!toggleMostra_2){
		$('#list_2').show();
		toggleMostra_2 = !toggleMostra_2;
	}
	else{
		document.getElementById('list_2').style.display = 'none';
		toggleMostra_2 = !toggleMostra_2;
	}
		
}

var toggleMostra_3 = false;
function mostra_3(){

	if (!toggleMostra_3){
		$('#list_3').show();
		toggleMostra_3 = !toggleMostra_3;
	}
	else{
		document.getElementById('list_3').style.display = 'none';
		toggleMostra_3 = !toggleMostra_3;
	}
		
}