$('#bewertung').rating({'showCaption':true, 'stars':'5', 'min':'0', 'max':'5', 'step':'1', 'size':'xs', 'starCaptions': {0:'Noch keine Bewertung', 1:'Grottenschlecht', 2:'Naja', 3:'Kann man gucken', 4: 'Gut', 5: 'Meisterwerk'}});
			$("#bewertung").on("rating.change", function(event, value, caption) {
				var frm = $('#ratingForm');
				var pathname = window.location.pathname; 
				var frmdataWatching = { 
					"watchedid": $('#watchedId2').val(),
					"bewertung": $('#bewertung').val(),
				};				
				$.ajax({
					type: 'PUT',
					url: '/ratewatchedseries'+pathname,
					data: frmdataWatching,
					//contentType: 'application/json',
					success: function(frmdata) {		
					},
					error: function(xhr, options, e) {
    				console.log(e);
					}
				}).done(function(){
					alert(data.name+' wurde hinzugefuegt.');
				}).fail(function(e){	
					alert(data.name+' konnte nicht hinzugefuegt werden. ('+JSON.stringify(e)+')');
				});
   				$("#bewertung").rating("refresh", {disabled: true, showClear: false});
			});