import { PokerGame } from '$commands/poker/modules/pokerGame';
import { XSelectMenuInteraction, XOptions } from '$core/coreTypes';

export const options: XOptions = {
    isUpdate: true
}

export { validate } from './isCurrentActionPlayer';

export async function execute(interaction: XSelectMenuInteraction, gameID: string) {
    if (!interaction.values[0])
        throw 'Interaction with select menu had no value';
    
    const amount = parseInt(interaction.values[0], 10);
    
    const pokerGame = await PokerGame.getFromDatabase(gameID);
    
    if (!pokerGame)
        throw `pokerGame wasn't valid`;
    
    const gamePlayer = pokerGame.getRound().currentActionPlayer.gamePlayer;
    
    let bettingRound = pokerGame.getRound().bettingRound;
    let currentBet = bettingRound.getPlayer(gamePlayer.id).bet;
    
    if (currentBet + amount > pokerGame.maxBet || gamePlayer.balance + currentBet < amount + bettingRound.currentHighBet)
        throw 'Impossible bet'; // Should be impossible at runtime, select menu generation should prevent this from occurring -- can actually happen if select menu is submitted after error
    
    pokerGame.doBet(amount);
    
    await pokerGame.saveToDatabase();
    
    await interaction.editReply(await pokerGame.generateInteractionUpdate());
}