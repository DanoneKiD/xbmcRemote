define(["jquery"], function($){
    var player = {
        getActivePlayers : function(){
            $.when($.ajax({
                type : 'POST',
                crossDomain : true,
                url : 'http://XBMC:1060/jsonrpc',
                data : '{"jsonrpc": "2.0", "method": "Player.GetActivePlayers","id": 1}',
//                success : options.success,
//                error : options.error,
                dataType : "json"
            })).then(function(data, status, xhr){
                 alert('status');
            });
        },
        
        getItem : function(playerId, successCallback, errorCallback){
            $.ajax({
                type : 'POST',
                crossDomain : true,
                url : 'http://XBMC:1060/jsonrpc',
                data : '{"jsonrpc": "2.0", "method": "Player.GetProperties","params": {"playerId":'
                    + playerid + '1} "id": 1}',
                success : successCallback,
                error : errorCallback,
                dataType : "json"});
        },
        
        getProperties : function(){
            
        },
        
        goNext : function(){
            
        },
        
        goPrevious : function(){
            
        },
        
        goTo : function(){
            
        },
        
        moveDown : function(){
            
        }
        
        /*    5.6.1 Player.GetActivePlayers

        5.6.8 Player.MoveLeft
        5.6.9 Player.MoveRight
        5.6.10 Player.MoveUp
        5.6.11 Player.Open
        5.6.12 Player.PlayPause
        5.6.13 Player.Repeat
        5.6.14 Player.Rotate
        5.6.15 Player.Seek
        5.6.16 Player.SetAudioStream
        5.6.17 Player.SetSpeed
        5.6.18 Player.SetSubtitle
        5.6.19 Player.Shuffle
        5.6.20 Player.Stop
        5.6.21 Player.UnShuffle
        5.6.22 Player.Zoom
        5.6.23 Player.ZoomIn
        5.6.24 Player.ZoomOut
                    GetActivePlayers : function(){
                    
                }
    */
    };
    
    return player;
});