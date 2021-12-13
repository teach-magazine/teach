		String.prototype.tpl = function(o) { 
			var r = this ; 
			for (var i in o) { 
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  
			} 
			return r 
		}
		
		var listItemTpl_1 = `<li><a class="dropdown-item" href='#' onclick='custom_load_1("$url")'>$label</a></li>`
		var listItemTpl_2 = `<li><a class="dropdown-item" href='#' onclick='custom_load_2("$url")'>$label</a></li>`
		var listItemTpl_3 = `<li><a class="dropdown-item" href='#' onclick='custom_load_3("$url")'>$label</a></li>`
		
		$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: 'education_filelist.json',
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
					$('.show').prop("checked", false)
					filltabs_a()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		//custom_load per spazio articolo 2
		function custom_load_2(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_2').html(d)
					$('#title').html($('#article_2 h1'))
					$('.show').prop("checked", false)
					filltabs_b()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		//custom_load per spazio articolo 3
		function custom_load_3(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_3').html(d)
					$('#title').html($('#article_3 h1'))
					$('.show').prop("checked", false)
					filltabs_c()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		function filltabs_1(){
			filltab_a("#article_1 .mention-person","list-person","#person_1")
			filltab_a("#article_1 .mention-place","list-place","#place_2")
			filltab_a("#article_1 .mention-concept","list-concept","#concept_3")
			filltab_a("#article_1 .mention-organisation","list-organisation","#organisation_1")
		}
		
		function filltabs_2(){
			filltab_b("#article_2 .mention-person","list-person","#person_2")
			filltab_b("#article_2 .mention-place","list-place","#place_2")
			filltab_b("#article_2 .mention-concept","list-concept","#concept_2")
			filltab_b("#article_2 .mention-organisation","list-organisation","#organisation_2")
		}
			
		function filltabs_3(){	
			filltab_c("#article_3 .mention-person","list-person","#person_3")
			filltab_c("#article_3 .mention-place","list-place","#place_3")
			filltab_c("#article_3 .mention-concept","list-concept","#concept_3")
			filltab_c("#article_3 .mention-organisation","list-organisation","#organisation_3")
		}
		
		
		function filltab_1(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_1('$place')">$content</a></li>`
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
				$('#article_1 .mention-person').addClass('text-person');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
			
			//highlights
			$('#place-tab_1').click(function(){
				$('#article_1 .mention-place').addClass('text-place');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
				
			//highlights
			$('#organisation-tab_1').click(function(){
				$('#article_1 .mention-organisation').addClass('text-organisation');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
			
			//highlights
			$('#concept-tab_1').click(function(){
				$('#article_1 .mention-concept').addClass('text-concept');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
		}
		
		function goto_2(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_b = $('#article_1')
			container_b.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		
		function filltab_2(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_2('$place')">$content</a></li>`
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
			$('#person-tab_b').click(function(){
				$('#article_2 .mention-person').addClass('text-person');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
			
			//highlights
			$('#place-tab_2').click(function(){
				$('#article_2 .mention-place').addClass('text-place');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
				
			//highlights
			$('#organisation-tab_2').click(function(){
				$('#article_2 .mention-organisation').addClass('text-organisation');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
			
			//highlights
			$('#concept-tab_2').click(function(){
				$('#article_2 .mention-concept').addClass('text-concept');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
		}
		
		function goto_2(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_b = $('#article_2')
			container_b.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		
		function filltab_3(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_3('$place')">$content</a></li>`
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
				$('#article_3 .mention-person').addClass('text-person');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
			
			//highlights
			$('#place-tab_3').click(function(){
				$('#article_3 .mention-place').addClass('text-place');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
				
			//highlights
			$('#organisation-tab_3').click(function(){
				$('#article_3 .mention-organisation').addClass('text-organisation');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
			
			//highlights
			$('#concept-tab_3').click(function(){
				$('#article_3 .mention-concept').addClass('text-concept');
				$("#clear_highlights").prop("checked", false);
				$("#see_mention").prop("checked", false);
				$('#metadata_panes').show();
			});
		}
		
		function goto_3(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_c = $('#article_3')
			container_c.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		