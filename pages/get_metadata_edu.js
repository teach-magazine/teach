		String.prototype.tpl = function(o) { 
			var r = this ; 
			for (var i in o) { 
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  
			} 
			return r 
		}
		
		var listItemTpl_a = `<li><a href='#' onclick='custom_load_a("$url")'>$label</a></li>`
		var listItemTpl_b = `<li><a href='#' onclick='custom_load_b("$url")'>$label</a></li>`
		var listItemTpl_c = `<li><a href='#' onclick='custom_load_c("$url")'>$label</a></li>`
		
		$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: 'education_filelist.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#list_a').append(listItemTpl_a.tpl({url:d[i].url, label: d[i].label}))
					}
					for (var i=0; i<d.length; i++) {
						$('#list_b').append(listItemTpl_b.tpl({url:d[i].url, label: d[i].label}))
					}
					for (var i=0; i<d.length; i++) {
						$('#list_c').append(listItemTpl_c.tpl({url:d[i].url, label: d[i].label}))
					}		
				},
				error: function() {
					alert('No document to show')
				}
			});
			
			$('#showperson').click(function() {
				console.log("show person");
				if (this.checked) 
					$('.mention-person').addClass('text-person')
				else
					$('.mention-person').removeClass('text-person')
			})
			$('#showplace').click(function() {
				console.log("show place");
				console.log(this.checked);
				if (this.checked) 
					$('.mention-place').addClass('text-place')
				else
					$('.mention-place').removeClass('text-place')
			})
			$('#showconcept').change(function() {
				console.log("show concept");
				if (this.checked) 
					$('.mention-concept').addClass('text-concept')
				else
					$('.mention-concept').removeClass('text-concept')
			})
			$('#showorganisation').change(function() {
				if (this.checked) 
					$('.mention-organisation').addClass('text-organisation')
				else
					$('.mention-organisation').removeClass('text-organisation')
			})
			$('#showtool').change(function() {
				if (this.checked) 
					$('.mention-tool').addClass('text-tool')
				else
					$('.mention-tool').removeClass('text-tool')
			})
		}
		
		//custom_load per spazio articolo 1
		function custom_load_a(file) {
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
		function custom_load_b(file) {
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
		function custom_load_c(file) {
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
		
		function filltabs_a(){
			filltab("#article_1 .mention-person","list-person","#person")
			filltab("#article_1 .mention-place","list-place","#place")
			filltab("#article_1 .mention-concept","list-concept","#concept")
			filltab("#article_1 .mention-organisation","list-organisation","#organisation")
			filltab("#article_1 .mention-tool","list-tool","#tool")
		}
		
		function filltabs_b(){
			filltab("#article_2 .mention-person","list-person","#person")
			filltab("#article_2 .mention-place","list-place","#place")
			filltab("#article_2 .mention-concept","list-concept","#concept")
			filltab("#article_2 .mention-organisation","list-organisation","#organisation")
			filltab("#article_2 .mention-tool","list-tool","#tool")
		}
			
		function filltabs_c(){	
			filltab("#article_3 .mention-person","list-person","#person")
			filltab("#article_3 .mention-place","list-place","#place")
			filltab("#article_3 .mention-concept","list-concept","#concept")
			filltab("#article_3 .mention-organisation","list-organisation","#organisation")
			filltab("#article_3 .mention-tool","list-tool","#tool")
		}
		
		function filltab(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			})
		}
		
		function goto(id) {
			var t = $(id)[0].offsetTop;
			$('body').animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		