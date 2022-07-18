import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";

/**
 * Mediator class that mediates the correct Command to its corresponding CommandHandler
 */
export class Mediator {
    private _handlers: CommandHandler<any, any>[] = [];

    /**
     * Constructor that requires a collection of CommandHandlers to register
     * @param {CommandHandler<any, any>} commandHandlers The collection of CommandHandlers to register 
     */
    public constructor(commandHandlers: CommandHandler<any, any>[]) {
        if (commandHandlers instanceof Array) {
            this._handlers = commandHandlers.filter(x => x instanceof CommandHandler)
        }
    }

    /**
     * Registers a new CommandHandler
     * @param {CommandHandler<any, any>} commandHandler The CommandHandler to register
     */
    public register(commandHandler: CommandHandler<any, any>) {
        this._handlers.push(commandHandler);
    }

    /**
     * Executes a Command and calls the corresponding CommandHandler's handle method
     * @param {Command<TResult>} command The Command to execture 
     * @returns {Promise<TResult>} A Promise of type TResult
     */
    public execute<TResult>(command: Command<TResult>): Promise<TResult> {
        let handler: CommandHandler<Command<TResult>, TResult> = 
            this._handlers.find(x => (x as any)["$name"]) as CommandHandler<Command<TResult>, TResult>;

        if (handler == null) return Promise.reject("CommandHandler not found");

        return handler.handle(command);
    }
}