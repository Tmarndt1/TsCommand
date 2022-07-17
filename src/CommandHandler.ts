import { Command } from "Command";

/**
 * CommandHandler that is responsible for executing the corresponding Command
 */
export abstract class CommandHandler<TCommand extends Command<TResult>, TResult> {
    private $name: string;

    /**
     * Constructor that requires the Command
     * @param command 
     */
    public constructor(command: { new(): TCommand }) {
        this.$name = new command().constructor.name;
    }

    /**
     * Handles the Command and returns a promise of type TResult
     * @param {TCommand} command The Command to hanlde
     * @returns {Promise<TResult>} A Promise of type TResult  
     */
    public abstract handle(command: TCommand): Promise<TResult>;
}