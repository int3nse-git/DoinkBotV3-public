import { Exclude } from 'class-transformer';
import { User } from 'discord.js';

export enum PokerGameType {
    SINGLE = 'Single',
    TOURNAMENT = 'Tournament'
}

export class PokerGamePlayer {
    id: string;
    username: string;
    isReady = false;
    balance: number;
    originalBalance: number;
    
    constructor(user: User | undefined, balance: number | undefined) {
        if (user == undefined || balance == undefined) {
            this.id = '0'
            this.username = '';
            this.balance = 0;
            this.originalBalance = 0;
            return;
        }
        
        this.id = user.id;
        this.username = user.username;
        this.balance = balance;
        this.originalBalance = balance;
    }
    
    ready(): PokerGamePlayer {
        this.isReady = true;
        return this;
    }
}

export class PokerRoundPlayer {
    @Exclude()
    gamePlayer: PokerGamePlayer;
    id: string;
    folded: boolean = false;
    
    constructor(gamePlayer: PokerGamePlayer | undefined) {
        if (gamePlayer == undefined) {
            this.gamePlayer = new PokerGamePlayer(undefined, undefined);
            this.id = '0';
            return;
        }
        
        this.gamePlayer = gamePlayer;
        this.id = this.gamePlayer.id;
    }
}
