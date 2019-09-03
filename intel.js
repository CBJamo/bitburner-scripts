import {ports, spider} from "functions.js";

class Player
{
    constructor( ns )
    {
        this.money = ns.getServerMoneyAvailable( "home" );
        this.hacking = ns.getHackingLevel();
        //this.mults = ns.getBitNodeMultiplers();
        this.ports = ports( ns );
    }
    update( ns )
    { 
        this.money = ns.getServerMoneyAvailable( "home" );
        this.hacking = ns.getHackingLevel();
        this.ports = ports( ns );
    }
    
}

class Host
{
    constructor( ns, hostname )
    {
        this.hostname = hostname;
        this.hackPercent = ns.hackAnalyzePercent( hostname );
        this.hackChance = ns.hackChance( hostname );
        
        this.hackTime = ns.getHackTime( hostname );
        this.growTime = ns.getGrowTime( hostname );
        this.weakenTime = ns.getWeakenTime( hostname );
        
        this.root = ns.hasRootAccess( hostname );
        let ram = ns.getServerRam( hostname );
        this.totalRam = ram[0];
        this.usedRam = ram[1];
        this.freeRam = this.totalRam - this.usedRam;
        
        this.money = ns.getServerMoneyAvailable( hostname );
        this.maxMoney = ns.getServerMaxMoney( hostname );
        this.growth = ns.getServerGrowth( hostname );
        
        this.security = ns.getServerSecurityLevel( hostname );
        this.minSecurity = ns.getServerMinSecurityLevel( hostname );
        this.baseSecurity = ns.getServerBaseSecurityLevel( hostname );
        this.hackingLevel = ns.getServerRequiredHackingLevel( hostname );
        
        this.weakensToMin = Math.ceil( ( this.security - this.minSecurity ) / 1.05 );
        
        let growMult = (this.maxMoney / this.money);
        if( growMult < 1 || isNaN(growMult) )
            growMult = 1;
        this.growsToMax = Math.ceil( ns.growthAnalyze( this.hostname, growMult ) );
        
        let hackAmount = this.maxMoney - ( this.maxMoney * 0.9 );
        this.hacksTo90 = Math.ceil( ns.hackAnalyzeThreads( this.hostname, hackAmount ) );
    }
    update( ns )
    {
        this.hackPercent = ns.hackAnalyzePercent( this.hostname );
        this.hackChance = ns.hackChance( this.hostname );
        
        this.hackTime = ns.getHackTime( this.hostname );
        this.growTime = ns.getGrowTime( this.hostname );
        this.weakenTime = ns.getWeakenTime( this.hostname );
        
        let ram = ns.getServerRam( this.hostname );
        this.usedRam = ram[1];
        this.freeRam = this.totalRam - this.usedRam;
        
        this.money = ns.getServerMoneyAvailable( this.hostname );
        
        this.security = ns.getServerSecurityLevel( this.hostname );
        
        this.weakensToMin = Math.ceil( ( this.security - this.minSecurity ) / 0.05 );
        
        let growMult = (this.maxMoney / this.money);
        if( growMult < 1 || isNaN(growMult) )
            growMult = 1;
        this.growsToMax = Math.ceil( ns.growthAnalyze( this.hostname, growMult ) );
        
        let hackAmount = this.maxMoney - ( this.maxMoney * 0.9 );
        this.hacksTo90 = Math.ceil( ns.hackAnalyzeThreads( this.hostname, hackAmount ) );
    }
    
}

export async function main( ns ) {
    let player = new Player( ns );
    
    let servers = spider( ns );
    
    let hosts = [];
    
    let playerPort = ns.getPortHandle( 1 );
    let hostsPort = ns.getPortHandle( 2 );
    
    playerPort.clear();
    hostsPort.clear();
    
    for( let server of servers )
    {
        let host = new Host( ns, server );
        hosts.push( host );
    }
    
    while( true )
    {
        player.update( ns );
        playerPort.data[0] = JSON.stringify(player);
        
        for( let host of hosts )
        {
            host.update( ns );
        }
        hostsPort.data[0] = JSON.stringify(hosts);
        
        await ns.sleep( 100 );
    }
}
