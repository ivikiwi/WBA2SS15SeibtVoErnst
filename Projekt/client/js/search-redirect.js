        $(function() {
            var frm = $('#searchbar');

            $("termInput").keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $(frm).submit();
            }
            });

            frm.on('submit', function(ev) {
                var term = $('#termInput').val();

                if(term == '') {
                    term = "noterm";
                }
                
                term = term.replace(/\s/g, '')
                var url = "search/"+term;

                window.location = url;
                    
                 ev.preventDefault();
            });

         
        });
