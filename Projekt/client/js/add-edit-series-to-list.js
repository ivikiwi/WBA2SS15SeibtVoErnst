$(function() {
			var frm = $('#addToWatch');
			var pathname = window.location.pathname; 

			
			frm.on('submit', function(ev){
				//var frmdata = {"name":"test"};
				var maxSeasons = +($( 'p.maxSeasons:visible' ).text());
				var selectedEpisodes = +($('#episode').val());
				var currentStatus = $('#status').val();
				var selectedSeason = $('#season').val();
				var watchStatus = $('#watchStatus').val();

				if(selectedSeason == "Staffelauswahl" && currentStatus == "Watching") {
					$( 'p.noSeasonAlert' ).show();
					ev.preventDefault();
				} else {
						//	check if inserted episode is a number, if it is not or it is 0, then preventDefault
						if(selectedEpisodes > maxSeasons || isNaN(selectedEpisodes) || selectedEpisodes == "0" && currentStatus == "Watching") {
							$( 'p.noSeasonAlert' ).hide();
							$( 'p.maxSeasonsAlert' ).fadeOut();
							$( 'p.maxSeasonsAlert' ).fadeIn();
							ev.preventDefault();
						} else {

							if (currentStatus == "Watching") {
								currentStatus = "Schaue ich gerade";
							}

							if (currentStatus == "Werde ich schauen") {
								selectedSeason = "0";
								selectedEpisodes = "0";
							}

							if(watchStatus == "notWatching" ) {
							
							var frmdata = { "seriesid": $('#seriesID').val(),
											"status": currentStatus,
											"season": selectedSeason,
											"episode": selectedEpisodes,

							};
							$.ajax({
							type: 'POST',
							url: '/postwatchedseries'+pathname,
							data: frmdata,
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
							$(function () {
								$('#basicModal').modal('hide');
								$('#hinzufuegenButton').hide();
							});
						}

						if(watchStatus == "Watching") {
								
								var frmdataWatching = { 
											"watchedid": $('#watchedId').val(),
											"status": currentStatus,
											"season": selectedSeason,
											"episode": selectedEpisodes,

								};
								
								$.ajax({
								type: 'PUT',
								url: '/putwatchedseries'+pathname,
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
								$(function () {
									$('#basicModal').modal('hide')
								});

							} 
					}
				}
			ev.preventDefault();
			});
			
		});