iuuLoaded = true
client.shard_count = 0

TabularReports.createReport("turret_report", myWindow)
TabularReports.createReport("target_report", myWindow)
TabularReports.createReport("magnetize_report", myWindow)

client.hud_obj = {
	'health': "NA",
    'muscular': "NA",
    'internal': "NA",
    'sensory': "NA",
    'mind': "NA",
    'wetwiring': "NA"
}


magnetize_defaults = {'magnetize': 'shards', 'count': 0}
TabularReports.reports['magnetize_report'].print([magnetize_defaults])


hud_defaults =
[
    {'label': 'target', 'value': 'NONE'},
    {'label': 'health', 'value': 'na'},
    {'label': 'muscular', 'value': 'na'},
    {'label': 'internal', 'value': 'na'},
    {'label': 'sensory', 'value': 'na'},
    {'label': 'mind', 'value': 'na'},
    {'label': 'wetwiring', 'value': 'na'}
]
    	
TabularReports.reports['target_report'].print(hud_defaults)

class IuuSystem {
    
    constructor(){
        this.spam = false
        this.turret = loadTurretProcessor()
       // this.hud = loadHUDProcessor()
        this.hud    = {'properties': {}} 
        this.vitals = {'properties': {}} 
        this.shards = 0
        this.lastMagnotronTime = Date.now()
    }
    
    static commands =
        {
            'qpc':
            {
                'command': 'turret qpcboost',

            },
        
        	'oj':
        	{
            	'command': 'OPERATE PROPSHRINK|OPERATE JUNKJET'    
            },
        
        	'mag':
        	{
            	'command': 'OPERATE PROPSHRINK|OPERATE MAGNETIZE'    
            },
        	
        }

	runCommand(cmd) {
        
        if (cmd == 'spam'){
        	this.spam = true 
            return
        }
        else if (cmd == 'spamoff'){
            this.spam = false
            return
        }
    	
        if (!IuuSystem.commands.hasOwnProperty(cmd)) {
        	this.raiseAlert("Invalid Command")
            return
        }
        
        send_command(IuuSystem.commands[cmd].command)
        
    }

	raiseAlert(alert) {
        
        
    }

	processBlock(current_block){
        this.turret.processIfMatch(current_block)
		//this.hud.processIfMatch(current_block)
    }

	processGMCP(method, args){
        
        if (method == 'Char.Vitals'){
            var vitals = this.vitals.properties
            vitals.health = args.hp
            vitals.health_max = args.maxhp
            vitals.muscular = args.muscular
            vitals.internal = args.internal
            vitals.sensory = args.sensory
            vitals.mind = args.mind
            vitals.wetwiring = args.wetwiring
            vitals.muscular_eff = args.muscular_efficacy
            vitals.internal_eff = args.internal_efficacy
            vitals.sensory_eff = args.sensory_efficacy
            vitals.mind_eff = args.mind_efficacy
            vitals.wetwiring_eff = args.wetwiring_efficacy
            vitals.ww = args.ww
            
            this.printHud()
            
        }
    }

	addShard(){
	    this.shards += 1
        this.printShards()
        
        var shardEmbeddedTime = Date.now()
        
    	setTimeout(function(){  
            					if (shardEmbeddedTime > iuu.lastMagnotronTime) {
                                    iuu.shards -= 1;
                                    iuu.printShards();
                                }     
                              }, 21000);
        
    }

	removeAllShards() {
    	this.shards = 0
        this.lastMagnotronTime = Date.now()
        this.printShards()
    }

	printShards(){
        var magnetize_transposed =
        [
            {'magnetize': 'shards', 'count': this.shards}
        ]

        TabularReports.reports['magnetize_report'].print(magnetize_transposed)
           
	}

	printHud(){
        var hud = this.hud.properties

        var tar_health    = hud.health + "/" + hud.health_max
        var tar_muscular  = hud.muscular + "/" + hud.muscular_eff
        var tar_internal  = hud.internal + "/" + hud.internal_eff
        var tar_sensory   = hud.sensory + "/" + hud.sensory_eff
        var tar_mind      = hud.mind + "/" + hud.mind_eff
        var tar_wetwiring = hud.wetwiring + "/" + hud.wetwiring_eff

        var vitals = this.vitals.properties

        var my_health    = vitals.health + "/" + vitals.health_max
        var my_muscular  = vitals.muscular + "/" + vitals.muscular_eff
        var my_internal  = vitals.internal + "/" + vitals.internal_eff
        var my_sensory   = vitals.sensory + "/" + vitals.sensory_eff
        var my_mind      = vitals.mind + "/" + vitals.mind_eff
        var my_wetwiring = vitals.wetwiring + "/" + vitals.wetwiring_eff

        var hud_transposed =
        [
            {'label': 'target', 'target': get_variable('tar'), 'me': 'ibo'},
            {'label': 'health', 'target': tar_health, 'me': my_health},
            {'label': 'muscular', 'target': tar_muscular, 'me': my_muscular},
            {'label': 'internal', 'target': tar_internal, 'me': my_internal},
            {'label': 'sensory', 'target': tar_sensory, 'me': my_sensory},
            {'label': 'mind', 'target': tar_mind, 'me': my_mind},
            {'label': 'wetwiring', 'target': tar_wetwiring, 'me': my_wetwiring}
        ]

        TabularReports.reports['target_report'].print(hud_transposed)
    }
}

run_function("blockProcessor", null, "Iuu")
run_function("loadTurretProcessor", null, "Iuu")
//run_function("loadHUDProcessor", null, "Iuu")
iuu = new IuuSystem()

TabularReports.reports['turret_report'].print([iuu.turret.default_properties])


window.addEventListener('e_turret_report',
                        function (e)
                        {
    						TabularReports.reports['turret_report'].print([iuu.turret.properties])
                        });

